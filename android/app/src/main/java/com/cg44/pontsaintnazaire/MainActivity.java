package com.cg44.pontsaintnazaire;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.getcapacitor.plugin.http.Http;
import com.getcapacitor.community.firebaseanalytics.FirebaseAnalytics;
import com.getcapacitor.community.firebaserc.FirebaseRemoteConfig;
import com.getcapacitor.community.fcm.FCMPlugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(FirebaseAnalytics.class);
      add(FirebaseRemoteConfig.class);
      add(FCMPlugin.class);
      add(Http.class);
    }});
  }
}
