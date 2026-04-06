"use client"
import Image from "next/image";
import React from "react";
import Cookies from "js-cookie";
// import { useQuesAnswer } from "@/app/providers/ContextProvider";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function AscendFitnessDownload() {
  // const { isSubmit } = useQuesAnswer();
  const router = useRouter();
  const [isWebView, setIsWebView] = React.useState(false);
  const [devicePlatform, setDevicePlatform] = React.useState<'ios' | 'android' | 'unknown'>('unknown');

  // Detect WebView and Device Platform
  /* eslint-disable @typescript-eslint/no-explicit-any */
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const isRNWebView = !!(window as any).ReactNativeWebView;
      setIsWebView(isRNWebView);

      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      
      if (/android/i.test(userAgent)) {
        setDevicePlatform('android');
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
        setDevicePlatform('ios');
      }

      console.log('WebView:', isRNWebView, 'Platform:', devicePlatform);
    }
  }, []);

  // React.useEffect(() => {
  //   if (!isSubmit) {
  //     router.push("/my-plan");
  //   }
  // }, [isSubmit]);

  // React.useEffect(() => {
  //   if (isSubmit) {
  //     setTimeout(() => {
  //       Cookies.remove("ascend_token");
  //     }, 9000);
  //   }
  // }, [isSubmit]);

  // ✅ Main handler
  const handleAppDownload = (buttonPlatform: 'ios' | 'android') => {
    if (isWebView) {
      // ========== IN-APP WEBVIEW ==========
      if (buttonPlatform === devicePlatform) {
        // Same platform - Navigate to LoginScreen
        navigateToLoginScreen();
      } else {
        // Different platform - Open store in external browser
        openInExternalBrowser(buttonPlatform);
      }
    } else {
      // ========== CHROME BROWSER ==========
      if (buttonPlatform === devicePlatform) {
        // ✅ Same platform - Try to open app, fallback to store
        tryOpenApp(buttonPlatform);
      } else {
        // ✅ Different platform - Directly redirect to store
        console.log('Different platform clicked, redirecting to store');
        redirectToStore(buttonPlatform);
      }
    }
  };

  // Navigate to LoginScreen in WebView
  const navigateToLoginScreen = () => {
    if ((window as any).ReactNativeWebView) {
      console.log('Navigating to LoginScreen');
      (window as any).ReactNativeWebView.postMessage(JSON.stringify({
        type: 'NAVIGATE_TO_LOGIN'
      }));
    }
  };

  // Open store in external browser (for cross-platform clicks in WebView)
  const openInExternalBrowser = (platform: 'ios' | 'android') => {
    const storeUrl = platform === 'ios' 
      ? 'https://apps.apple.com/us/app/ascend-fitness-ai/id6757586421'
      : 'https://play.google.com/store/apps/details?id=com.ascend.android&hl=en_IN';
    
    console.log('Opening store in external browser:', storeUrl);
    
    if ((window as any).ReactNativeWebView) {
      (window as any).ReactNativeWebView.postMessage(JSON.stringify({
        type: 'OPEN_EXTERNAL_LINK',
        url: storeUrl
      }));
    }
  };

  // Try to open app in browser (deep link)
  const tryOpenApp = (platform: 'ios' | 'android') => {
    const appUrl = 'ascendfitness://open';
    
    console.log('Trying to open app (same platform)');
    
    // Try to open app
    window.location.href = appUrl;
    
    // Fallback to store after 2.5 seconds if app didn't open
    const fallbackTimer = setTimeout(() => {
      console.log('App did not open, redirecting to store');
      redirectToStore(platform);
    }, 2500);

    // Clear timer if app opened (page loses focus)
    window.addEventListener('blur', () => {
      clearTimeout(fallbackTimer);
    }, { once: true });
  };

  // Redirect to store
  const redirectToStore = (platform: 'ios' | 'android') => {
    if (platform === 'ios') {
      window.location.href = 'https://apps.apple.com/us/app/ascend-fitness-ai/id6757586421';
    } else {
      window.location.href = 'https://play.google.com/store/apps/details?id=com.ascend.android&hl=en_IN';
    }
  };

  return (
    <div className="h-screen pt-10 md:pt-[200px] bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      <div className="w-full container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
          {/* Left Content Section */}
          <div className="flex flex-col items-start justify-center mt-4 space-y-6">
            <h1 className="text-2xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Download the Ascend Fitness App Now
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Start your fitness journey with Ascend! Download the Ascend app
              today to unlock your personalized workout and wellness experience.
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-row gap-2 pt-4 flex-wrap lg:items-start items-center justify-center lg:justify-start">
              <Button variant="outline" onClick={() => handleAppDownload('ios')}>
                <Image
                  src="/AppStore.png"
                  alt="App Store"
                  width={300}
                  height={90}
                  className="w-38 sm:w-48 h-auto"
                />
              </Button>
              <Button variant="outline" onClick={() => handleAppDownload('android')}>
                <Image
                  src="/GooglePlay.png"
                  alt="Google Play"
                  width={300}
                  height={90}
                  className="w-38 sm:w-48 h-auto"
                />
              </Button>
            </div>

            {/* Debug Info */}
            {/* {process.env.NODE_ENV === 'development' && (
              <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded mt-2">
                <p>Envirodddddndment: {isWebView ? '📱 WebView' : '🌐 Browser'}</p>
                <p>Device: {devicePlatform === 'ios' ? '🍎 iOS' : devicePlatform === 'android' ? '🤖 Android' : '❓ Unknown'}</p>
              </div>
            )} */}
          </div>

          {/* Right QR Code Section */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <Image
              src="/Qr.png"
              alt="QR Code"
              width={300}
              height={300}
              className="w-[250px] sm:w-[300px] h-auto object-contain"
            />
            <p className="text-sm sm:text-base text-gray-600 text-center max-w-xs">
              Scan this code to download the app directly from the mobile
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}