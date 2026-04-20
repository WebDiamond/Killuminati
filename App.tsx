import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Svg, { Defs, Pattern, Polygon, Rect } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dragon, Fireball, Pyramid, Caduc, ScarabSpr, BombSpr, ShurikenSpr, Boom } from "./src/Sprites";
import { GameState, mkLevel, tick, PLAYER_X } from "./src/engine";

const { width: SW, height: SHH } = Dimensions.get("window");
const GW = Math.min(SW, 420);
const SVG_H = SHH - 180;
const ADMOB_ID = "";
const AD_PROB = 0.3;

type Screen = "menu" | "play" | "over" | "info";

function MenuSprites({ frame }: { frame: number }) {
  return (
    <Svg width={400} height={115} viewBox="-140 -40 280 80" style={{ marginBottom: 20, alignSelf: "center" }}>
      <Pyramid x={-80} y={0} frame={frame} variant={0} />
      <Caduc x={0} y={0} t={frame * 0.05} />
      <ScarabSpr x={80} y={0} t={frame * 0.05} variant={0} />
    </Svg>
  );
}

export default function App() {
  const [scr, setScr] = useState<Screen>("menu");
  const [score, setScore] = useState(0);
  const [hi, setHi] = useState(0);
  const [last, setLast] = useState(0);
  const [boff, setBoff] = useState(-3);
  const [ad, setAd] = useState(false);
  const [, setTk] = useState(0);
  const [mf, setMf] = useState(0);
  const gr = useRef<GameState | null>(null);
  const sn = useRef<any>({ fr: 0 });
  const lastFire = useRef<number>(0);

  useEffect(() => {
    AsyncStorage.getItem("ki_hi").then(v => { if (v) setHi(parseInt(v)); });
  }, []);

  useEffect(() => {
    if (scr !== "menu") return;
    const id = setInterval(() => setMf(f => f + 1), 50);
    return () => clearInterval(id);
  }, [scr]);

  const saveHi = async (s: number) => {
    const n = Math.max(s, hi);
    setHi(n);
    await AsyncStorage.setItem("ki_hi", n.toString());
  };

  const startGame = useCallback(() => {
    setScore(0); setAd(false); setBoff(-3);
    gr.current = mkLevel(GW, SVG_H);
    setScr("play");
  }, []);

  const nxt = useCallback(() => { gr.current = mkLevel(GW, SVG_H); }, []);

  useEffect(() => {
    if (scr !== "play") return;
    let lt = Date.now();
    let overFired = false;
    const id = setInterval(() => {
      const g = gr.current;
      if (!g || !g.alive) { if (g) sn.current = { ...g }; setTk(t => t + 1); return; }
      const now = Date.now();
      const dt = Math.min((now - lt) / 1000, 0.08);
      lt = now;
      const res = tick(g, dt, GW, SVG_H);
      if (res.levelDone) { setScore(p => { nxt(); return p + 1; }); }
      if (res.dead && !overFired) {
        overFired = true;
        setScore(p => { setLast(p); saveHi(p); return p; });
        setTimeout(() => {
          if (ADMOB_ID && Math.random() < AD_PROB) setAd(true);
          setScr("over");
        }, 800);
      }
      sn.current = { ...g };
      setTk(t => t + 1);
    }, 45);
    return () => clearInterval(id);
  }, [scr, nxt]);

  const doFire = useCallback(() => {
    const now = Date.now();
    if (now - lastFire.current < 500) return;
    lastFire.current = now;
    const g = gr.current;
    if (g?.alive) g.bul.push({ x: g.sx + PLAYER_X + 20, y: g.py });
  }, []);
  const doUp = useCallback(() => { const g = gr.current; if (g) g.ty = Math.max(25, g.ty - 45); }, []);
  const doDown = useCallback(() => { const g = gr.current; if (g) g.ty = Math.min(SVG_H - 40, g.ty + 45); }, []);
  const doBU = useCallback(() => setBoff(p => Math.max(-5, p - 1)), []);
  const doBD = useCallback(() => setBoff(p => Math.min(1, p + 1)), []);

  const g = sn.current;
  const bBot = -boff * 50;

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SafeAreaView style={st.root}>

        {scr === "menu" && (
          <View style={st.center}>
            <MenuSprites frame={mf} />
            <Text style={st.title}>KILLUMINATI</Text>
            <Text style={st.sub}>▲ THE DRAGON STRIKES BACK ▲</Text>
            <TouchableOpacity style={st.mbtn} onPress={startGame}><Text style={st.mbtxt}>▶  GIOCA</Text></TouchableOpacity>
            <TouchableOpacity style={st.mbtn} onPress={() => setScr("info")}><Text style={st.mbtxt}>ℹ  INFO</Text></TouchableOpacity>
            {hi > 0 && <Text style={st.rec}>RECORD: {hi}</Text>}
          </View>
        )}

        {scr === "info" && (
          <View style={st.center}>
            <Text style={st.infoTitle}>INFO</Text>
            {["Guida il draghetto attraverso i livelli!", "", "▲ Loominadi = -1 kill", "⚕ Cadooceadis = -3 kills", "◉ Scarab = -5 sec timer", "", "Evita bombe e shuriken!", "", "↑ Su · ↓ Giu · 🔥 Spara", "◀▶ Sposta barra comandi"].map((l, i) => (
              <Text key={i} style={[st.infoLine, l && "▲⚕◉".includes(l[0]) && st.infoGold]}>{l || " "}</Text>
            ))}
            <TouchableOpacity style={st.mbtn} onPress={() => setScr("menu")}><Text style={st.mbtxt}>← MENU</Text></TouchableOpacity>
          </View>
        )}

        {scr === "over" && (
          <View style={st.center}>
            <Text style={st.overTitle}>GAME OVER</Text>
            <Text style={st.overScore}>Punteggio: <Text style={{ color: "#60c050", fontWeight: "700" }}>{last}</Text></Text>
            <Text style={st.overHi}>Record: {hi}</Text>
            {ad && (
              <View style={st.adBox}>
                <Text style={st.adLabel}>SPONSORED</Text>
                <View style={st.adInner}><Text style={st.adText}>📹 Video Ad{"\n"}Google AdMob SDK</Text></View>
                <TouchableOpacity onPress={() => setAd(false)}><Text style={st.adClose}>✕ chiudi</Text></TouchableOpacity>
              </View>
            )}
            <TouchableOpacity style={st.mbtn} onPress={() => { setAd(false); setScr("menu"); }}><Text style={st.mbtxt}>↺  RIPROVA</Text></TouchableOpacity>
          </View>
        )}

        {scr === "play" && g && (
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={st.hud}>
              <Text style={st.hudTxt}>◈ {g.req ?? 0}</Text>
              <Text style={[st.hudTxt, Math.max(0, Math.floor((g.tl ?? 0) - (g.el ?? 0))) <= 3 && { color: "#e84040" }]}>⏱ {Math.max(0, Math.floor((g.tl ?? 0) - (g.el ?? 0)))}s</Text>
              <Text style={st.hudTxt}>★ {score}</Text>
            </View>

            <Svg width={GW} height={SVG_H} viewBox={`0 0 ${GW} ${SVG_H}`} style={{ backgroundColor: "#0a0e08" }}>
              <Defs><Pattern id="bp" x="0" y="0" width="40" height="35" patternUnits="userSpaceOnUse"><Polygon points="20,0 0,35 40,35" fill="none" stroke="#141a10" strokeWidth="0.5" /><Polygon points="0,0 40,0 20,35" fill="none" stroke="#0e140a" strokeWidth="0.3" /></Pattern></Defs>
              <Rect width="100%" height="100%" fill="url(#bp)" />

              {(g.bul || []).map((b: any, i: number) => {
                const bx = b.x - (g.sx ?? 0);
                if (bx < -20 || bx > GW + 20) return null;
                return <Fireball key={`b${i}`} x={bx} y={b.y} frame={g.fr ?? 0} />;
              })}
              {(g.en || []).filter((e: any) => e.alive).map((e: any, i: number) => {
                const sx = e.x - (g.sx ?? 0);
                if (sx < -30 || sx > GW + 30) return null;
                if (e.type === "loominadi") return <Pyramid key={`e${i}`} x={sx} y={e.y} frame={g.fr ?? 0} variant={e.variant} />;
                if (e.type === "cadooceadis") return <Caduc key={`e${i}`} x={sx} y={e.y} t={(g.fr ?? 0) * 0.08} />;
                return <ScarabSpr key={`e${i}`} x={sx} y={e.y} t={(g.fr ?? 0) * 0.05} variant={e.variant} />;
              })}
              {(g.hz || []).filter((h: any) => h.alive).map((h: any, i: number) => {
                const sx = h.x - (g.sx ?? 0);
                if (sx < -20 || sx > GW + 20) return null;
                if (h.kind === "bomb") return <BombSpr key={`h${i}`} x={sx} y={h.y} t={(g.fr ?? 0) * 0.04} />;
                return <ShurikenSpr key={`h${i}`} x={sx} y={h.y} angle={h.angle} />;
              })}
              {g.alive !== false && <Dragon x={PLAYER_X} y={(g.py ?? 250) + (g.bob ?? 0)} glow={0.5 + Math.sin((g.fr ?? 0) * 0.08) * 0.3} frame={g.fr ?? 0} />}
              {(g.ex || []).map((e: any, i: number) => <Boom key={`x${i}`} x={e.x} y={e.y} progress={e.progress} />)}
            </Svg>

            <View style={[st.ctrlBar, { bottom: bBot }]}>
              <View style={{ gap: 4 }}>
                <TouchableOpacity style={st.miniBtn} onPress={doBU}><Text style={st.miniBtnTxt}>▲</Text></TouchableOpacity>
                <TouchableOpacity style={st.miniBtn} onPress={doBD}><Text style={st.miniBtnTxt}>▼</Text></TouchableOpacity>
              </View>
              <View style={st.sep} />
              <TouchableOpacity style={st.gBtn} onPress={doUp}><Text style={st.gBtnTxt}>↑</Text></TouchableOpacity>
              <TouchableOpacity style={st.gBtn} onPress={doDown}><Text style={st.gBtnTxt}>↓</Text></TouchableOpacity>
              <TouchableOpacity style={st.fBtn} onPress={doFire}><Text style={st.fBtnTxt}>🔥</Text></TouchableOpacity>
            </View>
          </View>
        )}

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const st = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#060804" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 32, fontWeight: "700", color: "#40c050", letterSpacing: 4, marginBottom: 6 },
  sub: { color: "#3a5a2a", fontSize: 10, letterSpacing: 3, marginBottom: 50 },
  mbtn: { marginVertical: 6, paddingVertical: 13, width: 200, borderWidth: 1, borderColor: "#1a3a15", borderRadius: 3, backgroundColor: "rgba(10,30,10,0.6)", alignItems: "center" },
  mbtxt: { color: "#60c050", fontSize: 14, letterSpacing: 3, fontWeight: "600" },
  rec: { color: "#2a4a20", fontSize: 12, marginTop: 30 },
  infoTitle: { fontSize: 20, color: "#60c050", marginBottom: 20, letterSpacing: 4 },
  infoLine: { fontSize: 13, lineHeight: 24, color: "#7a8a60", textAlign: "center" },
  infoGold: { color: "#60c050" },
  overTitle: { fontSize: 28, fontWeight: "700", color: "#8a2a1a", letterSpacing: 4, marginBottom: 14 },
  overScore: { color: "#7a8a60", fontSize: 15, marginBottom: 5 },
  overHi: { color: "#4a5a3a", fontSize: 13, marginBottom: 30 },
  adBox: { marginBottom: 20, padding: 18, maxWidth: 320, backgroundColor: "rgba(20,15,10,0.9)", borderWidth: 1, borderColor: "#3a3020", borderRadius: 4, alignItems: "center" },
  adLabel: { color: "#8a7a50", fontSize: 9, letterSpacing: 2, marginBottom: 6 },
  adInner: { width: "100%", height: 160, borderRadius: 3, borderWidth: 1, borderColor: "#3a3a4a", borderStyle: "dashed", backgroundColor: "#1a1a2a", alignItems: "center", justifyContent: "center" },
  adText: { color: "#5a5a7a", fontSize: 11, lineHeight: 18, textAlign: "center" },
  adClose: { color: "#6a5a3a", fontSize: 10, marginTop: 8 },
  hud: { flexDirection: "row", justifyContent: "space-between", width: "100%", paddingHorizontal: 14, paddingVertical: 6, backgroundColor: "rgba(6,12,4,0.92)", borderBottomWidth: 1, borderBottomColor: "#1a2a15" },
  hudTxt: { color: "#80b060", fontSize: 12, letterSpacing: 1 },
  ctrlBar: { position: "absolute", alignSelf: "center", flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 14, paddingVertical: 9, backgroundColor: "rgba(6,12,4,0.95)", borderWidth: 1, borderColor: "#1a2a15", borderRadius: 8 },
  sep: { width: 1, height: 36, backgroundColor: "#1a2a15" },
  miniBtn: { paddingHorizontal: 10, paddingVertical: 4, backgroundColor: "rgba(10,25,10,0.9)", borderWidth: 1, borderColor: "#1a3a15", borderRadius: 3 },
  miniBtnTxt: { color: "#3a6a30", fontSize: 11 },
  gBtn: { paddingHorizontal: 22, paddingVertical: 12, backgroundColor: "rgba(10,25,10,0.8)", borderWidth: 1, borderColor: "#1a3a15", borderRadius: 5 },
  gBtnTxt: { color: "#5a8a40", fontSize: 17, fontWeight: "600", letterSpacing: 2 },
  fBtn: { paddingHorizontal: 30, paddingVertical: 12, backgroundColor: "rgba(60,140,40,0.2)", borderWidth: 1, borderColor: "#3a7a30", borderRadius: 5 },
  fBtnTxt: { color: "#80e050", fontSize: 17, fontWeight: "700", letterSpacing: 2 },
});
