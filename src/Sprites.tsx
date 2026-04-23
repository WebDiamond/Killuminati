import React, { memo } from "react";
import { G, Ellipse, Circle, Line, Path, Polygon, Text as SvgText } from "react-native-svg";

export const Dragon = memo(function Dragon({ x, y, glow, frame }: { x: number; y: number; glow: number; frame: number }) {
  const wa = Math.sin(frame * 0.15) * 18;
  const tw = Math.sin(frame * 0.08) * 6;
  const br = 0.3 + Math.sin(frame * 0.1) * 0.2;
  const eo = Math.abs(Math.sin(frame * 0.02)) > 0.05;
  return (
    <G transform={`translate(${x},${y})`}>
      <Ellipse cx="22" cy="-2" rx={8 + glow * 4} ry={3 + glow * 2} fill={`rgba(255,140,20,${br})`} />
      <Ellipse cx="18" cy="-2" rx={5 + glow * 2} ry={2 + glow} fill={`rgba(255,220,60,${br * 0.6})`} />
      <Path d={`M-8,2 Q-16,${2 + tw} -22,${tw} Q-26,${tw - 3} -24,${tw - 6}`} fill="none" stroke="#2a8a3a" strokeWidth="2.5" strokeLinecap="round" />
      <Path d={`M-24,${tw - 6} L-28,${tw - 10} L-22,${tw - 7} L-26,${tw - 4}`} fill="#1a6a2a" />
      <G transform={`rotate(${-wa},-2,-6)`}><Path d="M-2,-6 Q-12,-22 -6,-24 Q0,-20 2,-14 Q-4,-18 -2,-6" fill="#3aaa4a" opacity="0.7" stroke="#2a8a3a" strokeWidth="0.5" /></G>
      <G transform={`rotate(${wa * 0.7},-2,-6) scale(1,-1) translate(0,12)`}><Path d="M-2,-6 Q-10,-18 -5,-20 Q0,-16 2,-12 Q-3,-15 -2,-6" fill="#3aaa4a" opacity="0.5" stroke="#2a8a3a" strokeWidth="0.5" /></G>
      <Ellipse cx="0" cy="2" rx="10" ry="7" fill="#2d9940" />
      <Ellipse cx="0" cy="4" rx="8" ry="4" fill="#3ab84e" />
      <Ellipse cx="2" cy="5" rx="5" ry="3" fill="#5cd46a" opacity="0.5" />
      <Ellipse cx="10" cy="-3" rx="7" ry="5.5" fill="#2d9940" />
      <Ellipse cx="16" cy="-2" rx="3.5" ry="2.5" fill="#34a545" />
      <Circle cx="18" cy="-3" r="0.6" fill="#1a5a1a" />
      <Circle cx="18" cy="-1" r="0.6" fill="#1a5a1a" />
      {eo ? (<>
        <Ellipse cx="11" cy="-5" rx="2.8" ry="2.2" fill="#ffffcc" />
        <Ellipse cx="11.5" cy="-5" rx="1.5" ry="2" fill="#cc3300" />
        <Circle cx="11.5" cy="-5" r="0.8" fill="#1a0000" />
        <Ellipse cx="11" cy="-5.5" rx="0.5" ry="0.3" fill="rgba(255,255,255,0.8)" />
      </>) : (<Line x1="9" y1="-5" x2="13" y2="-5" stroke="#1a5a1a" strokeWidth="0.8" />)}
      <Line x1="8" y1="-7" x2="6" y2="-13" stroke="#8a6a20" strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="11" y1="-8" x2="10" y2="-14" stroke="#8a6a20" strokeWidth="1.3" strokeLinecap="round" />
      <Line x1="-4" y1="8" x2="-6" y2="13" stroke="#2a8a3a" strokeWidth="2" strokeLinecap="round" />
      <Line x1="4" y1="8" x2="6" y2="13" stroke="#2a8a3a" strokeWidth="2" strokeLinecap="round" />
      <Path d="M-8,13 L-6,13 L-5,11" fill="none" stroke="#8a6a20" strokeWidth="0.8" />
      <Path d="M4,13 L6,13 L7,11" fill="none" stroke="#8a6a20" strokeWidth="0.8" />
      {[-6, -2, 2].map((s, i) => (
        <Polygon key={i} points={`${s},-6 ${s - 1.5},-${10 + i} ${s + 1.5},-${10 + i}`} fill="#1a7a2a" opacity="0.8" />
      ))}
    </G>
  );
});

export const Fireball = memo(function Fireball({ x, y, frame }: { x: number; y: number; frame: number }) {
  const f = Math.sin(frame * 0.5) * 1.5;
  return (
    <G transform={`translate(${x},${y})`}>
      <Ellipse rx={7 + f} ry={3 + f * 0.4} fill="rgba(255,100,0,0.7)" />
      <Ellipse rx="5" ry="2.2" fill="rgba(255,180,30,0.9)" />
      <Ellipse rx="3" ry="1.3" fill="rgba(255,240,150,1)" />
      <Circle cx={-8 - f} cy={f * 0.5} r="1.5" fill="rgba(255,80,0,0.4)" />
    </G>
  );
});

export const Pyramid = memo(function Pyramid({ x, y, frame, variant }: { x: number; y: number; frame: number; variant: number }) {
  const c = ["#5a7a3a", "#7a6a2a", "#4a6a4a", "#6a5a3a", "#3a7a5a"][variant % 5];
  const ey = -2 + Math.sin(frame * 0.3) * 2;
  const px = Math.cos(frame * 0.2) * 2;
  return (
    <G transform={`translate(${x},${y})`}>
      <Polygon points="0,-16 -14,12 14,12" fill={c} stroke="#2a3a1a" strokeWidth="1.5" />
      <Polygon points="0,-10 -9,8 9,8" fill="#8a9a6a" opacity="0.4" />
      <Ellipse cx="0" cy={ey + 2} rx="5" ry="3.5" fill="#fffff0" />
      <Circle cx={px} cy={ey + 2} r="2" fill="#1a1a0a" />
      <Ellipse cx={px} cy={ey + 1.5} rx="0.7" ry="0.5" fill="rgba(255,255,240,0.9)" />
    </G>
  );
});

export const Caduc = memo(function Caduc({ x, y, t }: { x: number; y: number; t: number }) {
  const w = Math.sin(t * 2) * 3;
  const s = 1 + Math.sin(t * 1.5) * 0.05;
  const sh1 = 0.15 + Math.sin(t * 4) * 0.15;
  const sh2 = 0.15 + Math.sin(t * 5 + 1) * 0.15;
  const sh3 = 0.15 + Math.sin(t * 3.5 + 2) * 0.15;
  const p1x = Math.cos(t * 2.5) * 14, p1y = Math.sin(t * 3) * 12;
  const p2x = Math.cos(t * 1.8 + 2) * 16, p2y = Math.sin(t * 2.2 + 1) * 10;
  const p3x = Math.cos(t * 3.2 + 4) * 12, p3y = Math.sin(t * 2.7 + 3) * 14;
  return (
    <G transform={`translate(${x},${y})`}>
      <Circle cx={p1x} cy={p1y} r="1.5" fill={`rgba(180,180,220,${sh1})`} />
      <Circle cx={p2x} cy={p2y} r="1" fill={`rgba(200,200,240,${sh2})`} />
      <Circle cx={p3x} cy={p3y} r="1.2" fill={`rgba(170,170,210,${sh3})`} />
      <Circle cx={-p2x * 0.7} cy={-p1y * 0.8} r="0.8" fill={`rgba(190,190,230,${sh1 * 0.7})`} />
      <Ellipse cx="0" cy="0" rx={18 + Math.sin(t * 2) * 2} ry={16 + Math.sin(t * 3) * 2} fill="none" stroke={`rgba(160,160,200,${sh2 * 0.4})`} strokeWidth="0.5" />
      <G transform={`rotate(${w}) scale(${s})`}>
        <Line x1="0" y1="-14" x2="0" y2="14" stroke="#8a8a9a" strokeWidth="2" />
        <Circle cx="0" cy="-14" r="3" fill="none" stroke="#8a8a9a" strokeWidth="1.5" />
        <Path d="M-6,-8 Q0,-4 6,-8 Q0,-1 -6,3 Q0,7 6,3 Q0,10 -6,10" fill="none" stroke="#9a9aaa" strokeWidth="1.2" />
        <Path d="M6,-8 Q0,-4 -6,-8 Q0,-1 6,3 Q0,7 -6,3 Q0,10 6,10" fill="none" stroke="#7a7a8a" strokeWidth="1.2" />
      </G>
    </G>
  );
});

export const ScarabSpr = memo(function ScarabSpr({ x, y, t, variant }: { x: number; y: number; t: number; variant: number }) {
  const c = ["#e8c820", "#d4a810", "#f0d030"][variant % 3];
  const wf = Math.sin(t * 12) * 3;
  return (
    <G transform={`translate(${x},${y})`}>
      <Ellipse cx="0" cy="0" rx={8 + wf} ry="6" fill={c} opacity="0.6" />
      <Ellipse cx="0" cy="2" rx="5" ry="7" fill={c} stroke="#8a6a00" strokeWidth="1" />
      <Circle cx="0" cy="-5" r="3.5" fill={c} stroke="#8a6a00" strokeWidth="0.8" />
      <Circle cx="-1.5" cy="-6" r="0.8" fill="#1a1a0a" />
      <Circle cx="1.5" cy="-6" r="0.8" fill="#1a1a0a" />
    </G>
  );
});

export const BombSpr = memo(function BombSpr({ x, y, t }: { x: number; y: number; t: number }) {
  const p = 0.7 + Math.sin(t * 3) * 0.3;
  return (
    <G transform={`translate(${x},${y})`}>
      <Circle r="8" fill={`rgba(180,40,30,${p})`} stroke="#4a1a10" strokeWidth="1.5" />
      <Line x1="2" y1="-8" x2="5" y2="-13" stroke="#6a4a2a" strokeWidth="1.5" />
      <Circle cx="5" cy="-14" r="2" fill={`rgba(255,200,50,${p})`} />
      <SvgText x="0" y="3" textAnchor="middle" fontSize="9" fill="#1a0a00" fontWeight="bold">!</SvgText>
    </G>
  );
});

export const ShurikenSpr = memo(function ShurikenSpr({ x, y, angle }: { x: number; y: number; angle: number }) {
  return (
    <G transform={`translate(${x},${y}) rotate(${angle})`}>
      <Polygon points="0,-12 3,-3 12,0 3,3 0,12 -3,3 -12,0 -3,-3" fill="#3a3a3a" stroke="#1a1a1a" strokeWidth="1" />
      <Circle r="2.5" fill="#5a5a5a" />
    </G>
  );
});

export const Boom = memo(function Boom({ x, y, progress }: { x: number; y: number; progress: number }) {
  const r = 5 + progress * 25;
  const o = 1 - progress;
  return (
    <G transform={`translate(${x},${y})`}>
      <Circle r={r} fill={`rgba(255,200,50,${o * 0.6})`} />
      <Circle r={r * 0.6} fill={`rgba(255,120,20,${o * 0.8})`} />
      <Circle r={r * 0.3} fill={`rgba(255,255,200,${o})`} />
    </G>
  );
});
