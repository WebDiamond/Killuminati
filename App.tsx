import React, { useRef, useEffect } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { GAME_HTML } from "./src/gameHTML";

// ── AdMob / AsyncStorage (commentato) ────────────────────────
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   InterstitialAd,
//   RewardedAd,
//   AdEventType,
//   TestIds,
// } from "react-native-google-mobile-ads";
//
// const DAILY_REWARD_AD_ID = __DEV__ ? TestIds.REWARDED : "ca-app-pub-XXXXXXXX/XXXXXXXX";
// const GAME_OVER_INTERSTITIAL_ID = __DEV__ ? TestIds.INTERSTITIAL : "ca-app-pub-XXXXXXXX/XXXXXXXX";
//
// const rewardedAd = RewardedAd.createForAdRequest(DAILY_REWARD_AD_ID, {
//   requestNonPersonalizedAdsOnly: true,
// });
// const interstitialAd = InterstitialAd.createForAdRequest(GAME_OVER_INTERSTITIAL_ID, {
//   requestNonPersonalizedAdsOnly: true,
// });
//
// ──────────────────────────────────────────────────────────────
// ── A-Ads fallback (commentato) ─────────────────────────────
// // Se vuoi usare a-ads, non esiste un SDK React Native ufficiale.
// // In Expo devi caricarlo come pagina web in una WebView o aprire
// // un URL esterno, quindi gestire la ricompensa BTC a ritorno.
// // Questo significa che il reward va gestito manualmente nell'app.
// ──────────────────────────────────────────────────────────────

export default function App() {
  const webRef = useRef<WebView>(null);

  // const hasShownDailyAd = useRef(false);
  // const hasLoadedDailyAd = useRef(false);
  // const hasLoadedGameOverAd = useRef(false);

  // ── AdMob useEffect (commentato) ──────────────────────────────
  // useEffect(() => {
  //   async function loadDailyAd() {
  //     const today = new Date().toISOString().slice(0, 10);
  //     const lastDate = await AsyncStorage.getItem("@lastDailyAdDate");
  //     if (lastDate !== today) {
  //       rewardedAd.load();
  //     }
  //   }
  //
  //   const dailyLoadListener = rewardedAd.addAdEventListener(AdEventType.LOADED, () => {
  //     hasLoadedDailyAd.current = true;
  //     if (!hasShownDailyAd.current) {
  //       hasShownDailyAd.current = true;
  //       rewardedAd.show();
  //     }
  //   });
  //   const dailyEarnedListener = rewardedAd.addAdEventListener(AdEventType.EARNED_REWARD, async () => {
  //     await AsyncStorage.setItem("@lastDailyAdDate", new Date().toISOString().slice(0, 10));
  //   });
  //   const dailyClosedListener = rewardedAd.addAdEventListener(AdEventType.CLOSED, () => {
  //     rewardedAd.load();
  //   });
  //
  //   const gameOverLoadListener = interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
  //     hasLoadedGameOverAd.current = true;
  //   });
  //   const gameOverClosedListener = interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
  //     interstitialAd.load();
  //   });
  //
  //   loadDailyAd();
  //   interstitialAd.load();
  //
  //   return () => {
  //     dailyLoadListener();
  //     dailyEarnedListener();
  //     dailyClosedListener();
  //     gameOverLoadListener();
  //     gameOverClosedListener();
  //   };
  // }, []);
  // ─────────────────────────────────────────────────────────────

  function handleMessage(e: WebViewMessageEvent) {
    try {
      const msg = JSON.parse(e.nativeEvent.data);
      if (msg.type === "exit") {
        BackHandler.exitApp();
      }
      // ── AdMob: interstitial al game over (commentato) ─────────
      // else if (msg.type === "gameOver") {
      //   if (hasLoadedGameOverAd.current) {
      //     interstitialAd.show();
      //   }
      // }
      // ── A-Ads banner 30% chance sul game over (commentato) ─────
      // else if (msg.type === "gameOver") {
      //   if (Math.random() <= 0.30) {
      //     // mostra qui un banner A-Ads o una WebView A-Ads per il game over
      //     // esempio: apri una pagina WebView con l'annuncio A-Ads
      //     // oppure carica il banner in overlay sulla schermata di game over
      //   }
      // }
      // ──────────────────────────────────────────────────────────
    } catch (_) { }
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SafeAreaView style={styles.root}>
        <View style={styles.game}>
          <WebView
            ref={webRef}
            source={{ html: GAME_HTML, baseUrl: "https://localhost" }}
            style={styles.web}
            onMessage={handleMessage}
            javaScriptEnabled
            domStorageEnabled
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            originWhitelist={["*"]}
            mixedContentMode="always"
            renderToHardwareTextureAndroid
            androidHardwareAccelerationDisabled={false}
          />
        </View>
        {/* ── AdMob Banner (commentato) ──────────────────────────
        <BannerAd
          unitId={BANNER_ID}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        />
        ─────────────────────────────────────────────────────── */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#060804" },
  game: { flex: 1 },
  web:  { flex: 1, backgroundColor: "#060804" },
});
