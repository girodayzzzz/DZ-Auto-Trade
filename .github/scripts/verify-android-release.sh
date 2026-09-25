#!/usr/bin/env bash
set -euo pipefail

if (($# != 4)); then
  echo "Usage: $0 APK AAPT APKSIGNER EXPECTED_CERT_SHA256" >&2
  exit 2
fi

apk=$1
aapt=$2
apksigner=$3

normalize_cert_sha256() {
  local fingerprint=${1^^}

  fingerprint=${fingerprint//[[:space:]]/}
  fingerprint=${fingerprint#SHA256:}
  fingerprint=${fingerprint#SHA-256:}
  fingerprint=${fingerprint//:/}
  printf '%s' "$fingerprint"
}

expected_cert="$(normalize_cert_sha256 "$4")"
if [[ ! "$expected_cert" =~ ^[0-9A-F]{64}$ ]]; then
  echo 'ANDROID_SIGNING_CERT_SHA256 must contain exactly 64 hexadecimal characters (separators and whitespace are allowed).' >&2
  exit 1
fi

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
actual_cert="$(sed -nE 's/^[[:space:]]*Signer #1 certificate SHA-?256 digest:[[:space:]]*(.*[^[:space:]])[[:space:]]*$/\1/p' <<<"$verification" | head -1)"
if [[ -z "$actual_cert" ]]; then
  echo 'Could not extract the signer certificate SHA-256 digest from apksigner output.' >&2
  exit 1
fi
actual_cert="$(normalize_cert_sha256 "$actual_cert")"
if [[ ! "$actual_cert" =~ ^[0-9A-F]{64}$ ]]; then
  echo 'apksigner returned an invalid signer certificate SHA-256 digest.' >&2
  exit 1
fi
test "$actual_cert" = "$expected_cert" || {
  echo 'APK signing certificate does not match ANDROID_SIGNING_CERT_SHA256.' >&2
  exit 1
}

echo "Verified signed release package si.dzautotrade.app, versionCode $version_code."
