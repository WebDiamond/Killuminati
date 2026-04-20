const BULLET_SPEED = 8;
const SCROLL_SPEED = 1.2;
const PLAYER_X = 60;
const ENEMY_COUNT = 22;
const BOMB_COUNT = 8;
const SHURIKEN_COUNT = 6;

export { PLAYER_X, SCROLL_SPEED, BULLET_SPEED };

export interface Enemy { type: string; x: number; y: number; vx: number; vy: number; variant: number; alive: boolean; }
export interface Hazard { kind: string; x: number; y: number; vy: number; angle: number; alive: boolean; }
export interface Explosion { x: number; y: number; progress: number; }
export interface GameState {
  py: number; ty: number; sx: number;
  bul: { x: number; y: number }[];
  en: Enemy[]; hz: Hazard[]; ex: Explosion[];
  req: number; tl: number; el: number; fr: number;
  alive: boolean; bob: number;
}

export function mkE(type: string, sx: number, svgH: number): Enemy {
  const baseVx = 0.3 + Math.random() * 1.0;
  return {
    type,
    x: sx + 250 + Math.random() * 350,
    y: 50 + Math.random() * (svgH - 100),
    vx: type === "loominadi" ? baseVx * 1.2 : baseVx,
    vy: (Math.random() - 0.5) * 0.8,
    variant: Math.floor(Math.random() * 5),
    alive: true,
  };
}

export function mkH(kind: string, sx: number, svgH: number): Hazard {
  return {
    kind,
    x: sx + 350 + Math.random() * 450,
    y: 50 + Math.random() * (svgH - 100),
    vy: kind === "shuriken" ? 4.5 + Math.random() * 3.5 : 0,
    angle: 0, alive: true,
  };
}

export function mkLevel(gw: number, svgH: number): GameState {
  const en: Enemy[] = [];
  for (let i = 0; i < ENEMY_COUNT; i++)
    en.push(mkE(i < 18 ? "loominadi" : i < 20 ? "cadooceadis" : "scarab", 0, svgH));
  const hz: Hazard[] = [];
  for (let i = 0; i < BOMB_COUNT; i++) hz.push(mkH("bomb", 0, svgH));
  for (let i = 0; i < SHURIKEN_COUNT; i++) hz.push(mkH("shuriken", 0, svgH));
  return {
    py: svgH / 2 - 20, ty: svgH / 2 - 20, sx: 0,
    bul: [], en, hz, ex: [],
    req: (6 + Math.floor(Math.random() * 4)) * 4,
    tl: 30 + Math.floor(Math.random() * 11),
    el: 0, fr: 0, alive: true, bob: 0,
  };
}

export function pickType(): string {
  const r = Math.random();
  return r < 0.85 ? "loominadi" : r < 0.95 ? "cadooceadis" : "scarab";
}

export function tick(g: GameState, dt: number, gw: number, svgH: number): { levelDone: boolean; dead: boolean } {
  g.fr++;
  g.el += dt;
  g.sx += SCROLL_SPEED;
  g.py += (g.ty - g.py) * 0.12;
  g.bob = Math.sin(g.fr * 0.06) * 3;

  const pWX = g.sx + PLAYER_X;
  const pWY = g.py + g.bob;

  g.bul = g.bul.filter(b => { b.x += BULLET_SPEED; return b.x < g.sx + gw + 50 && b.x > 0; });
  g.en.forEach(e => { if (!e.alive) return; e.x += e.vx; e.y += e.vy; if (e.y < 35 || e.y > svgH - 35) e.vy *= -1; });
  g.hz.forEach(h => { if (!h.alive) return; if (h.kind === "shuriken") { h.x -= 4; h.y += h.vy; h.angle = (h.angle + 4) % 360; if (h.y < 25 || h.y > svgH - 25) h.vy *= -1; } else { h.angle = (h.angle + 0.5) % 360; } });
  g.ex = g.ex.filter(e => { e.progress += dt * 3; return e.progress < 1; });

  const kills: number[] = [];
  const usedB = new Set<number>();
  for (let bi = 0; bi < g.bul.length; bi++) {
    if (usedB.has(bi)) continue;
    const b = g.bul[bi];
    for (let ei = 0; ei < g.en.length; ei++) {
      const e = g.en[ei];
      if (!e.alive) continue;
      const hitR = e.type === "scarab" ? 8 : e.type === "cadooceadis" ? 10 : 14;
      if (Math.abs(b.x - e.x) < hitR && Math.abs(b.y - e.y) < hitR) {
        kills.push(ei); usedB.add(bi);
        g.ex.push({ x: e.x - g.sx, y: e.y, progress: 0 });
        break;
      }
    }
  }
  kills.forEach(ei => {
    const e = g.en[ei];
    if (e.type === "loominadi") g.req = Math.max(0, g.req - 1);
    else if (e.type === "cadooceadis") g.req = Math.max(0, g.req - 3);
    else if (e.type === "scarab") g.el = Math.max(0, g.el - 5);
    e.alive = false; e.x = -99999; e.y = -99999;
  });
  if (usedB.size > 0) g.bul = g.bul.filter((_, i) => !usedB.has(i));

  if (g.alive) {
    for (const e of g.en) {
      if (!e.alive) continue;
      const hitR = e.type === "scarab" ? 8 : e.type === "cadooceadis" ? 10 : 14;
      if (Math.abs(pWX - e.x) < hitR && Math.abs(pWY - e.y) < hitR) {
        e.alive = false; g.alive = false;
        g.ex.push({ x: PLAYER_X, y: g.py, progress: 0 });
        break;
      }
    }
  }

  if (g.alive) {
    for (const h of g.hz) {
      if (!h.alive) continue;
      const hitR = h.kind === "bomb" ? 13 : 12;
      if (Math.abs(pWX - h.x) < hitR && Math.abs(pWY - h.y) < hitR) {
        h.alive = false; g.alive = false;
        g.ex.push({ x: PLAYER_X, y: g.py, progress: 0 });
        break;
      }
    }
  }

  g.en.forEach((e, i) => { if (!e.alive && g.req > 0) g.en[i] = mkE(pickType(), g.sx, svgH); });
  g.hz.forEach((h, i) => { if (h.x - g.sx < -100) g.hz[i] = mkH(h.kind, g.sx, svgH); });

  const levelDone = g.req <= 0;
  const dead = g.el >= g.tl || !g.alive;
  if (dead) g.alive = false;
  return { levelDone, dead };
}
