package si.dzautotrade.app;

import android.app.Activity;
import android.net.Uri;
import android.os.Bundle;

import androidx.browser.customtabs.CustomTabsIntent;

/** Opens the existing production PWA in the user's secure browser session. */
public final class MainActivity extends Activity {
    private static final Uri APP_URI = Uri.parse("https://dzautotrade.si/dz-app.html");

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        openApplication();
        finish();
    }

    private void openApplication() {
        new CustomTabsIntent.Builder()
                .setShowTitle(true)
                .setShareState(CustomTabsIntent.SHARE_STATE_OFF)
                .build()
                .launchUrl(this, APP_URI);
    }
}
