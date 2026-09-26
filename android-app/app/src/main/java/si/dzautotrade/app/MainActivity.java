package si.dzautotrade.app;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.graphics.Color;
import android.graphics.Typeface;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
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

/** Keeps DZ Auto Trade and its email-code login in one WebView. */
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
    private View introView;
    private TextView introMessage;
    private ProgressBar introSpinner;
    private Button retryButton;
    private boolean accessLoginActive;
    private boolean loadFailed;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        FrameLayout root = new FrameLayout(this);
        webView = new WebView(this);
        root.addView(webView, new FrameLayout.LayoutParams(-1, -1));
        introView = createIntro();
        root.addView(introView, new FrameLayout.LayoutParams(-1, -1));
        setContentView(root);
        if (savedInstanceState != null) accessLoginActive = savedInstanceState.getBoolean("accessLoginActive", false);

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
            public void onPageStarted(WebView view, String url, android.graphics.Bitmap favicon) {
                loadFailed = false;
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return routeUrl(request.getUrl());
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return routeUrl(Uri.parse(url));
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                Uri finished = Uri.parse(url);
                if ("dzautotrade.si".equalsIgnoreCase(finished.getHost())
                        && ("/dz-app.html".equals(finished.getPath())
                        || "/admin-panel.html".equals(finished.getPath()))) accessLoginActive = false;
                if (!loadFailed && introView.getVisibility() == View.VISIBLE) introView.setVisibility(View.GONE);
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request,
                    android.webkit.WebResourceError error) {
                if (request.isForMainFrame()) showLoadError();
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

    private int dp(int value) {
        return Math.round(getResources().getDisplayMetrics().density * value);
    }

    private View createIntro() {
        LinearLayout layout = new LinearLayout(this);
        layout.setOrientation(LinearLayout.VERTICAL);
        layout.setGravity(Gravity.CENTER);
        layout.setPadding(dp(28), dp(28), dp(28), dp(28));
        layout.setBackgroundColor(Color.rgb(8, 13, 24));
        ImageView logo = new ImageView(this);
        logo.setImageResource(R.drawable.dz_logo_source);
        logo.setScaleType(ImageView.ScaleType.FIT_CENTER);
        layout.addView(logo, new LinearLayout.LayoutParams(dp(132), dp(132)));
        TextView title = new TextView(this);
        title.setText("DZ AUTO TRADE");
        title.setTextSize(23);
        title.setTypeface(null, Typeface.BOLD);
        title.setTextColor(Color.WHITE);
        title.setGravity(Gravity.CENTER);
        LinearLayout.LayoutParams titleParams = new LinearLayout.LayoutParams(-1, -2);
        titleParams.topMargin = dp(22);
        layout.addView(title, titleParams);
        introMessage = new TextView(this);
        introMessage.setText("Trgovina, vozila in delo ekipe");
        introMessage.setTextSize(14);
        introMessage.setTextColor(Color.rgb(190, 199, 215));
        introMessage.setGravity(Gravity.CENTER);
        LinearLayout.LayoutParams messageParams = new LinearLayout.LayoutParams(-1, -2);
        messageParams.topMargin = dp(8);
        layout.addView(introMessage, messageParams);
        introSpinner = new ProgressBar(this);
        LinearLayout.LayoutParams spinnerParams = new LinearLayout.LayoutParams(dp(36), dp(36));
        spinnerParams.gravity = Gravity.CENTER_HORIZONTAL;
        spinnerParams.topMargin = dp(28);
        layout.addView(introSpinner, spinnerParams);
        retryButton = new Button(this);
        retryButton.setText("Poskusi znova");
        retryButton.setVisibility(View.GONE);
        retryButton.setOnClickListener(view -> {
            retryButton.setVisibility(View.GONE);
            introSpinner.setVisibility(View.VISIBLE);
            introMessage.setText("Povezujem …");
            webView.loadUrl(APP_URL);
        });
        layout.addView(retryButton);
        return layout;
    }

    private void showLoadError() {
        loadFailed = true;
        introView.setVisibility(View.VISIBLE);
        introMessage.setText("Povezave ni mogoče vzpostaviti.");
        introSpinner.setVisibility(View.GONE);
        retryButton.setVisibility(View.VISIBLE);
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
                && "dzautotrade.si".equalsIgnoreCase(uri.getHost())) {
            String path = uri.getPath();
            if ("/api/team/login".equals(path) || "/api/team/logout".equals(path)
                    || "/admin-panel.html".equals(path)) accessLoginActive = true;
            return false;
        }
        // Access sends an email PIN on its team domain. Keep the challenge and
        // its return redirect in this WebView so its authorization cookie is
        // available to protected API calls from the same app session.
        if (accessLoginActive && "https".equalsIgnoreCase(uri.getScheme())
                && isCloudflareAccessHost(uri.getHost())
                && uri.getPath() != null && uri.getPath().startsWith("/cdn-cgi/access/")) return false;
        String scheme = uri.getScheme();
        if ("https".equalsIgnoreCase(scheme) || "http".equalsIgnoreCase(scheme)
                || "mailto".equalsIgnoreCase(scheme) || "tel".equalsIgnoreCase(scheme)) openExternal(uri);
        return true;
    }

    private static boolean isCloudflareAccessHost(String host) {
        return host != null && host.toLowerCase(java.util.Locale.ROOT).endsWith(".cloudflareaccess.com")
                && host.length() > ".cloudflareaccess.com".length();
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
        outState.putBoolean("accessLoginActive", accessLoginActive);
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
