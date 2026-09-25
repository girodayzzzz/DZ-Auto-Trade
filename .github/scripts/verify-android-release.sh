#!/usr/bin/env bash
set -euo pipefail

if (($# != 4)); then
  echo "Usage: $0 APK AAPT APKSIGNER EXPECTED_CERT_SHA256" >&2
  exit 2
fi

apk=$1
aapt=$2
apksigner=$3
expected_cert=${4//:/}
expected_cert=${expected_cert// /}
expected_cert=${expected_cert^^}

test -s "$apk"
test -x "$aapt"
test -x "$apksigner"
unzip -t "$apk" >/dev/null
zipinfo -1 "$apk" | grep -Fxq AndroidManifest.xml
zipinfo -1 "$apk" | grep -Fxq classes.dex

badging="$($aapt dump badging "$apk")"
grep -Fq "package: name='si.dzautotrade.app'" <<<"$badging"
version_code="$(sed -n "s/.*versionCode='\([0-9]*\)'.*/\1/p" <<<"$badging" | head -1)"
[[ "$version_code" =~ ^[1-9][0-9]*$ ]]

verification="$($apksigner verify --verbose --print-certs "$apk")"
grep -Fq 'Verified using v2 scheme (APK Signature Scheme v2): true' <<<"$verification"
actual_cert="$(sed -n 's/^Signer #1 certificate SHA-256 digest: //p' <<<"$verification" | head -1)"
actual_cert=${actual_cert//:/}
actual_cert=${actual_cert// /}
actual_cert=${actual_cert^^}
test -n "$expected_cert"
test "$actual_cert" = "$expected_cert" || {
  echo 'APK signing certificate does not match ANDROID_SIGNING_CERT_SHA256.' >&2
  exit 1
}

echo "Verified signed release package si.dzautotrade.app, versionCode $version_code."
