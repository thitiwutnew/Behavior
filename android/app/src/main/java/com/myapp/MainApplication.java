package com.myapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import fr.snapp.imagebase64.RNImgToBase64Package;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.rnfs.RNFSPackage;
import com.imagepicker.ImagePickerPackage;
import com.staltz.reactnativenode.RNNodePackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;
import org.reactnative.camera.RNCameraPackage;
import com.reactnativecommunity.cameraroll.CameraRollPackage;
import com.imagepicker.ImagePickerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNImgToBase64Package(),
            new ReactNativeConfigPackage(),
            new RNFSPackage(),
            new ImagePickerPackage(),
            new RNNodePackage(),
            new AsyncStoragePackage(),
            new RNGestureHandlerPackage(),
            new RNCameraPackage(),
            new RNFetchBlobPackage(),
            new CameraRollPackage(),
            new SplashScreenReactPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
