package si.dzautotrade.app;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.webkit.CookieManager;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/** Keeps DZ Auto Trade inside the app while external services use the browser. */
public final class MainActivity extends Activity {
    private static final String APP_URL = "https://dzautotrade.si/dz-app.html";
    private static final int FILE_CHOOSER_REQUEST = 1001;
    private static final String RELEASE_API =
            "https://api.github.com/repos/girodayzzzz/DZ-Auto-Trade/releases/latest";
    private static final String APK_URL =
            "https://github.com/girodayzzzz/DZ-Auto-Trade/releases/latest/download/DZ-Auto-Trade.apk";
    private static final long CHECK_INTERVAL_MS = 12L * 60 * 60 * 1000;
    private static final long REMIND_INTERVAL_MS = 24L * 60 * 60 * 1000;
    private static final Pattern VERSION = Pattern.compile("^(?:android-v)?(\\d{1,6})\\.(\\d{1,6})\\.(\\d{1,6})$");

    private WebView webView;
    private ValueCallback<Uri[]> pendingFiles;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowFileAccessFromFileURLs(false);
        settings.setAllowUniversalAccessFromFileURLs(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setJavaScriptCanOpenWindowsAutomatically(false);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) settings.setSafeBrowsingEnabled(true);
        CookieManager.getInstance().setAcceptCookie(true);
        CookieManager.getInstance().setAcceptThirdPartyCookies(webView, false);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return routeUrl(request.getUrl());
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return routeUrl(Uri.parse(url));
            }
        });
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback,
                    FileChooserParams params) {
                if (pendingFiles != null) pendingFiles.onReceiveValue(null);
                pendingFiles = callback;
                try {
                    startActivityForResult(params.createIntent(), FILE_CHOOSER_REQUEST);
                } catch (ActivityNotFoundException exception) {
                    pendingFiles = null;
                    callback.onReceiveValue(null);
                    Toast.makeText(MainActivity.this, "Izbira datotek ni na voljo.", Toast.LENGTH_SHORT).show();
                }
                return true;
            }
        });
        webView.setDownloadListener((url, userAgent, contentDisposition, mimeType, contentLength) -> {
            Uri uri = Uri.parse(url);
            if ("https".equalsIgnoreCase(uri.getScheme())) openExternal(uri);
        });

        if (savedInstanceState == null || webView.restoreState(savedInstanceState) == null) {
            webView.loadUrl(APP_URL);
        }
        new Thread(this::checkForUpdates, "dz-apk-update-check").start();
    }

    private void checkForUpdates() {
        android.content.SharedPreferences prefs = getSharedPreferences("apk_updates", MODE_PRIVATE);
        long now = System.currentTimeMillis();
        if (now - prefs.getLong("last_check", 0) < CHECK_INTERVAL_MS) return;
        HttpURLConnection connection = null;
        try {
            connection = (HttpURLConnection) new URL(RELEASE_API).openConnection();
            connection.setConnectTimeout(5000);
            connection.setReadTimeout(5000);
            connection.setRequestProperty("Accept", "application/vnd.github+json");
            connection.setRequestProperty("User-Agent", "DZ-Auto-Trade-Android");
            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) return;
            ByteArrayOutputStream bytes = new ByteArrayOutputStream();
            try (InputStream input = connection.getInputStream()) {
                byte[] buffer = new byte[4096];
                int count;
                while ((count = input.read(buffer)) != -1 && bytes.size() < 65536) {
                    bytes.write(buffer, 0, count);
                }
            }
            if (bytes.size() >= 65536) return;
            JSONObject release = new JSONObject(new String(bytes.toByteArray(), StandardCharsets.UTF_8));
            if (release.optBoolean("draft") || release.optBoolean("prerelease")) return;
            String tag = release.optString("tag_name");
            if (!tag.startsWith("android-v") || release.optJSONArray("assets") == null) return;
            int[] available = parseVersion(tag);
            String installed = getPackageManager().getPackageInfo(getPackageName(), 0).versionName;
            int[] current = parseVersion(installed);
            if (available == null || current == null) return;
            boolean hasApk = false;
            for (int i = 0; i < release.optJSONArray("assets").length(); i++) {
                if ("DZ-Auto-Trade.apk".equals(release.getJSONArray("assets")
                        .getJSONObject(i).optString("name"))) hasApk = true;
            }
            if (!hasApk) return;
            prefs.edit().putLong("last_check", now).apply();
            for (int i = 0; i < 3; i++) {
                if (available[i] < current[i]) return;
                if (available[i] > current[i]) {
                    if (tag.equals(prefs.getString("last_prompt_tag", ""))
                            && now - prefs.getLong("last_prompt", 0) < REMIND_INTERVAL_MS) return;
                    runOnUiThread(() -> showUpdate(tag, prefs));
                    return;
                }
            }
        } catch (Exception ignored) {
            // A failed check must never prevent the app from opening.
        } finally {
            if (connection != null) connection.disconnect();
        }
    }

    private static int[] parseVersion(String version) {
        Matcher matcher = VERSION.matcher(version);
        if (!matcher.matches()) return null;
        return new int[] {
                Integer.parseInt(matcher.group(1)),
                Integer.parseInt(matcher.group(2)),
                Integer.parseInt(matcher.group(3))
        };
    }

    private void showUpdate(String tag, android.content.SharedPreferences prefs) {
        if (isFinishing() || isDestroyed()) return;
        prefs.edit().putString("last_prompt_tag", tag)
                .putLong("last_prompt", System.currentTimeMillis()).apply();
        new AlertDialog.Builder(this)
                .setTitle("Na voljo je nova različica")
                .setMessage("DZ Auto Trade " + tag.substring("android-v".length())
                        + " je pripravljen za prenos. Po prenosu namesti APK čez obstoječo aplikacijo.")
                .setPositiveButton("Prenesi", (dialog, which) -> openExternal(Uri.parse(APK_URL)))
                .setNegativeButton("Pozneje", null)
                .show();
    }

    private boolean routeUrl(Uri uri) {
        if ("https".equalsIgnoreCase(uri.getScheme())
                && "dzautotrade.si".equalsIgnoreCase(uri.getHost())) return false;
        String scheme = uri.getScheme();
        if ("https".equalsIgnoreCase(scheme) || "http".equalsIgnoreCase(scheme)
                || "mailto".equalsIgnoreCase(scheme) || "tel".equalsIgnoreCase(scheme)) openExternal(uri);
        return true;
    }

    private void openExternal(Uri uri) {
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, uri));
        } catch (ActivityNotFoundException exception) {
            Toast.makeText(this, "Povezave ni mogoče odpreti.", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == FILE_CHOOSER_REQUEST && pendingFiles != null) {
            pendingFiles.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(resultCode, data));
            pendingFiles = null;
        }
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        webView.saveState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    protected void onDestroy() {
        if (pendingFiles != null) pendingFiles.onReceiveValue(null);
        webView.setWebChromeClient(null);
        webView.setWebViewClient(null);
        webView.destroy();
        super.onDestroy();
    }
}
