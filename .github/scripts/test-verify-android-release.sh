#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
verifier="$script_dir/verify-android-release.sh"
tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT

mkdir -p "$tmpdir/bin" "$tmpdir/apk"
touch "$tmpdir/apk/AndroidManifest.xml" "$tmpdir/apk/classes.dex"
(cd "$tmpdir/apk" && zip -q "$tmpdir/app.apk" AndroidManifest.xml classes.dex)

cat >"$tmpdir/bin/aapt" <<'EOF'
#!/usr/bin/env bash
printf "%s\n" "package: name='si.dzautotrade.app' versionCode='1' versionName='1.0.0'"
EOF

cat >"$tmpdir/bin/apksigner" <<'EOF'
#!/usr/bin/env bash
printf '%s\n' 'Verified using v2 scheme (APK Signature Scheme v2): true'
printf '%b\n' "${MOCK_CERT_LINE:-}"
EOF
chmod +x "$tmpdir/bin/aapt" "$tmpdir/bin/apksigner"

hex='0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF'
colon_hex='01:23:45:67:89:AB:CD:EF:01:23:45:67:89:AB:CD:EF:01:23:45:67:89:AB:CD:EF:01:23:45:67:89:AB:CD:EF'

verify() {
  local expected=$1
  local line=$2
  MOCK_CERT_LINE="$line" "$verifier" \
    "$tmpdir/app.apk" "$tmpdir/bin/aapt" "$tmpdir/bin/apksigner" "$expected"
}

expect_failure() {
  local message=$1
  shift
  local output

  if output="$("$@" 2>&1)"; then
    echo "Expected verification to fail: $message" >&2
    exit 1
  fi
  grep -Fq "$message" <<<"$output"
}

verify "$colon_hex" "Signer #1 certificate SHA-256 digest: ${hex,,}"
verify "${hex,,}" "Signer #1 certificate SHA-256 digest: $colon_hex"
verify $' \tSHA256:'"$colon_hex"$'\r\n ' $'  Signer #1 certificate SHA256 digest: \t'"$hex"$'\r'

# apksigner labels certificates by SDK range when v3.1 signing is present.
verify "$hex" "Signer (minSdkVersion=33, maxSdkVersion=2147483647) certificate SHA-256 digest: ${hex,,}"
verify "$hex" "Signer (minSdkVersion=33 (dev release=true), maxSdkVersion=2147483647) certificate SHA-256 digest: ${hex,,}"
verify "$hex" "Source Stamp Signer certificate SHA-256 digest: deadbeef\nSigner #1 public key SHA-256 digest: deadbeef\nSigner #1 certificate SHA-256 digest: $hex"
expect_failure \
  'APK signing certificate does not match ANDROID_SIGNING_CERT_SHA256.' \
  verify "$hex" "Signer (minSdkVersion=33, maxSdkVersion=2147483647) certificate SHA-256 digest: $hex\nSigner (minSdkVersion=21, maxSdkVersion=32) certificate SHA-256 digest: 0000000000000000000000000000000000000000000000000000000000000000"

expect_failure \
  'Could not extract the signer certificate SHA-256 digest from apksigner output.' \
  verify "$hex" 'Signer certificate digest unavailable'
expect_failure \
  'ANDROID_SIGNING_CERT_SHA256 must contain exactly 64 hexadecimal characters' \
  verify 'not-a-fingerprint' "Signer #1 certificate SHA-256 digest: $hex"
expect_failure \
  'APK signing certificate does not match ANDROID_SIGNING_CERT_SHA256.' \
  verify "${hex%?}0" "Signer #1 certificate SHA-256 digest: $hex"

echo 'Android release verifier tests passed.'
