package com.soundsense;

import androidx.appcompat.app.AppCompatActivity;

import android.graphics.Bitmap;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.webkit.ConsoleMessage;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;


public class MainActivity extends AppCompatActivity {

    private WebView mywebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mywebView=findViewById(R.id.webview);

        mywebView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                Log.d("MyApplication", consoleMessage.message() + " -- From line " +
                        consoleMessage.lineNumber() + " of " + consoleMessage.sourceId());
                return true;
            }
        });
        mywebView.setWebViewClient(new WebViewClient());
        mywebView.loadUrl("http://192.168.72.101:3000");
        mywebView.addJavascriptInterface(new Object() {
            @JavascriptInterface
            public void onConnect() {
                System.out.println("abc");
            }

            @JavascriptInterface
            public void onDisconnect() {
                // Handle Socket.io disconnect event
            }

            @JavascriptInterface
            public void onMessage(String message) {
                // Handle Socket.io message event
            }
        }, "socket");
        mywebView.getSettings().setJavaScriptEnabled(true);
        mywebView.getSettings().setAllowContentAccess(true);
        mywebView.getSettings().setDomStorageEnabled(true);
        mywebView.getSettings().setDatabaseEnabled(true);
        mywebView.getSettings().setCacheMode(WebSettings.LOAD_DEFAULT);
        mywebView.getSettings().setAllowFileAccess(true);

    }
    public class mywebClient extends WebViewClient {
        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            super.onPageStarted(view,url,favicon);
        }
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            view.loadUrl(url);
            return true;
        }
    }
    @Override
    public void onBackPressed() {
        if (mywebView.canGoBack()) {
            mywebView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}