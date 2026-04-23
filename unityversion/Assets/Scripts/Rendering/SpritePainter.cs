using UnityEngine;

namespace Killuminati
{
    /// <summary>
    /// Static helper: draws all game sprites using Unity GL immediate mode.
    /// Attach GameRenderer to the Camera; it calls SpritePainter from OnPostRender.
    /// Coordinate space: pixel units, origin top-left (matches original SVG).
    /// </summary>
    public static class SpritePainter
    {
        static Material _mat;

        public static Material GetMat()
        {
            if (_mat == null)
            {
                _mat = new Material(Shader.Find("Hidden/Internal-Colored"));
                _mat.hideFlags = HideFlags.HideAndDontSave;
                _mat.SetInt("_SrcBlend", (int)UnityEngine.Rendering.BlendMode.SrcAlpha);
                _mat.SetInt("_DstBlend", (int)UnityEngine.Rendering.BlendMode.OneMinusSrcAlpha);
                _mat.SetInt("_Cull",     (int)UnityEngine.Rendering.CullMode.Off);
                _mat.SetInt("_ZWrite", 0);
            }
            return _mat;
        }

        // ── Primitives ────────────────────────────────────────────────────────

        public static void DrawCircle(float cx, float cy, float r, Color c, int segs = 20)
        {
            GL.Begin(GL.TRIANGLES);
            GL.Color(c);
            for (int i = 0; i < segs; i++)
            {
                float a0 = i * Mathf.PI * 2 / segs, a1 = (i+1) * Mathf.PI * 2 / segs;
                GL.Vertex3(cx, cy, 0);
                GL.Vertex3(cx + Mathf.Cos(a0)*r, cy + Mathf.Sin(a0)*r, 0);
                GL.Vertex3(cx + Mathf.Cos(a1)*r, cy + Mathf.Sin(a1)*r, 0);
            }
            GL.End();
        }

        public static void DrawEllipse(float cx, float cy, float rx, float ry, Color c, int segs = 20)
        {
            GL.Begin(GL.TRIANGLES);
            GL.Color(c);
            for (int i = 0; i < segs; i++)
            {
                float a0 = i * Mathf.PI * 2 / segs, a1 = (i+1) * Mathf.PI * 2 / segs;
                GL.Vertex3(cx, cy, 0);
                GL.Vertex3(cx + Mathf.Cos(a0)*rx, cy + Mathf.Sin(a0)*ry, 0);
                GL.Vertex3(cx + Mathf.Cos(a1)*rx, cy + Mathf.Sin(a1)*ry, 0);
            }
            GL.End();
        }

        public static void DrawTriangle(float x0,float y0,float x1,float y1,float x2,float y2, Color c)
        {
            GL.Begin(GL.TRIANGLES); GL.Color(c);
            GL.Vertex3(x0,y0,0); GL.Vertex3(x1,y1,0); GL.Vertex3(x2,y2,0);
            GL.End();
        }

        public static void DrawLine(float x0,float y0,float x1,float y1, Color c, float w=1)
        {
            // Approximate thick line with a quad
            Vector2 d = new Vector2(x1-x0,y1-y0).normalized * (w*0.5f);
            float nx=-d.y, ny=d.x;
            GL.Begin(GL.QUADS); GL.Color(c);
            GL.Vertex3(x0+nx, y0+ny, 0); GL.Vertex3(x1+nx, y1+ny, 0);
            GL.Vertex3(x1-nx, y1-ny, 0); GL.Vertex3(x0-nx, y0-ny, 0);
            GL.End();
        }

        // ── Background grid ───────────────────────────────────────────────────

        public static void DrawBackground(float gw, float gh)
        {
            // Dark fill
            GL.Begin(GL.QUADS); GL.Color(new Color(0.04f,0.055f,0.03f,1));
            GL.Vertex3(0,0,0); GL.Vertex3(gw,0,0); GL.Vertex3(gw,gh,0); GL.Vertex3(0,gh,0);
            GL.End();
            // Triangle grid lines
            Color lc = new Color(0.08f,0.10f,0.06f,1);
            float cw=40, ch=35;
            for(float x=0;x<gw;x+=cw) for(float y=0;y<gh;y+=ch)
            {
                DrawLine(x+20,y, x,    y+ch, lc, 0.5f);
                DrawLine(x+20,y, x+cw, y+ch, lc, 0.3f);
            }
        }

        // ── Dragon ────────────────────────────────────────────────────────────

        public static void DrawDragon(float ox, float oy, float glow, int frame)
        {
            float wa  = Mathf.Sin(frame*0.15f)*18;
            float tw  = Mathf.Sin(frame*0.08f)*6;
            float br  = 0.3f + Mathf.Sin(frame*0.1f)*0.2f;
            bool  eo  = Mathf.Abs(Mathf.Sin(frame*0.02f)) > 0.05f;

            // Body
            DrawEllipse(ox, oy+2, 10, 7, new Color(0.18f,0.6f,0.25f,1));
            DrawEllipse(ox, oy+4, 8,  4, new Color(0.23f,0.72f,0.30f,1));
            // Head
            DrawEllipse(ox+10,oy-3,7,5.5f,new Color(0.18f,0.6f,0.25f,1));
            // Fireball glow
            DrawEllipse(ox+22,oy-2, 8+glow*4, 3+glow*2, new Color(1f,0.55f,0.08f,br));
            DrawEllipse(ox+18,oy-2, 5+glow*2, 2+glow,   new Color(1f,0.86f,0.24f,br*0.6f));
            // Wings (simplified)
            float wRad = wa * Mathf.Deg2Rad;
            DrawTriangle(ox-2,oy-6, ox-12+Mathf.Cos(wRad)*6,oy-24+Mathf.Sin(wRad)*4, ox+2,oy-14, new Color(0.23f,0.67f,0.29f,0.7f));
            // Tail
            DrawLine(ox-8,oy+2, ox-24,oy+tw,  new Color(0.17f,0.54f,0.23f,1), 2.5f);
            // Eyes
            if(eo){ DrawEllipse(ox+11,oy-5,2.8f,2.2f,new Color(1,1,0.8f,1)); DrawCircle(ox+11.5f,oy-5,1.5f,new Color(0.8f,0.2f,0,1)); DrawCircle(ox+11.5f,oy-5,0.8f,Color.black); }
            else  { DrawLine(ox+9,oy-5,ox+13,oy-5,new Color(0.1f,0.35f,0.1f,1),0.8f); }
            // Legs
            DrawLine(ox-4,oy+8, ox-6,oy+13, new Color(0.17f,0.54f,0.23f,1), 2);
            DrawLine(ox+4,oy+8, ox+6,oy+13, new Color(0.17f,0.54f,0.23f,1), 2);
        }

        // ── Fireball ─────────────────────────────────────────────────────────

        public static void DrawFireball(float ox, float oy, int frame)
        {
            float f = Mathf.Sin(frame*0.5f)*1.5f;
            DrawEllipse(ox,oy, 7+f, 3+f*0.4f, new Color(1f,0.39f,0f,0.7f));
            DrawEllipse(ox,oy, 5,   2.2f,      new Color(1f,0.71f,0.12f,0.9f));
            DrawEllipse(ox,oy, 3,   1.3f,      new Color(1f,0.94f,0.59f,1f));
        }

        // ── Pyramid (Loominadi) ───────────────────────────────────────────────

        static readonly Color[] PyramidColors = {
            new Color(0.35f,0.48f,0.23f), new Color(0.48f,0.42f,0.17f),
            new Color(0.29f,0.42f,0.29f), new Color(0.42f,0.35f,0.23f), new Color(0.23f,0.48f,0.35f)
        };

        public static void DrawPyramid(float ox, float oy, int frame, int variant)
        {
            Color c  = PyramidColors[variant%5];
            float ey = -2 + Mathf.Sin(frame*0.3f)*2;
            float px = Mathf.Cos(frame*0.2f)*2;
            // Body triangle
            DrawTriangle(ox,    oy-16, ox-14, oy+12, ox+14, oy+12, c);
            DrawTriangle(ox,    oy-10, ox-9,  oy+8,  ox+9,  oy+8,  new Color(0.54f,0.60f,0.42f,0.4f));
            // Eye
            DrawEllipse(ox,   oy+ey+2, 5, 3.5f, new Color(1,1,0.94f,1));
            DrawCircle( ox+px,oy+ey+2, 2,       new Color(0.1f,0.1f,0.04f,1));
        }

        // ── Cadooceadis ───────────────────────────────────────────────────────

        public static void DrawCaduc(float ox, float oy, float t)
        {
            float w = Mathf.Sin(t*2)*3;
            float cosW=Mathf.Cos(w*Mathf.Deg2Rad), sinW=Mathf.Sin(w*Mathf.Deg2Rad);
            // Staff (rotated line)
            float x0=ox-sinW*14, y0=oy-cosW*14, x1=ox+sinW*14, y1=oy+cosW*14;
            DrawLine(x0,y0,x1,y1, new Color(0.54f,0.54f,0.60f,1), 2);
            // Top circle
            DrawCircle(ox-sinW*14,oy-cosW*14, 3, new Color(0,0,0,0));
            DrawCircle(ox+sinW*14,oy+cosW*14, 3, new Color(0.54f,0.54f,0.60f,0.5f));
            // Orbiting particles
            float sh1=0.15f+Mathf.Sin(t*4)*0.15f;
            float p1x=Mathf.Cos(t*2.5f)*14, p1y=Mathf.Sin(t*3)*12;
            float p2x=Mathf.Cos(t*1.8f+2)*16, p2y=Mathf.Sin(t*2.2f+1)*10;
            DrawCircle(ox+p1x, oy+p1y, 1.5f, new Color(0.71f,0.71f,0.86f,sh1));
            DrawCircle(ox+p2x, oy+p2y, 1.0f, new Color(0.78f,0.78f,0.94f,sh1*0.8f));
        }

        // ── Scarab ────────────────────────────────────────────────────────────

        static readonly Color[] ScarabColors = { new Color(0.91f,0.78f,0.13f), new Color(0.83f,0.66f,0.06f), new Color(0.94f,0.82f,0.19f) };

        public static void DrawScarab(float ox, float oy, float t, int variant)
        {
            Color c = ScarabColors[variant%3];
            float wf = Mathf.Sin(t*12)*3;
            DrawEllipse(ox, oy,   8+wf, 6, new Color(c.r,c.g,c.b,0.6f));
            DrawEllipse(ox, oy+2, 5,    7, c);
            DrawCircle( ox, oy-5, 3.5f, c);
            DrawCircle( ox-1.5f, oy-6, 0.8f, new Color(0.1f,0.1f,0.04f,1));
            DrawCircle( ox+1.5f, oy-6, 0.8f, new Color(0.1f,0.1f,0.04f,1));
        }

        // ── Bomb ─────────────────────────────────────────────────────────────

        public static void DrawBomb(float ox, float oy, float t)
        {
            float p = 0.7f + Mathf.Sin(t*3)*0.3f;
            DrawCircle(ox, oy, 8, new Color(0.71f,0.16f,0.12f,p));
            DrawLine(ox+2,oy-8, ox+5,oy-13, new Color(0.42f,0.29f,0.17f,1), 1.5f);
            DrawCircle(ox+5, oy-14, 2, new Color(1f,0.78f,0.20f,p));
        }

        // ── Shuriken ─────────────────────────────────────────────────────────

        public static void DrawShuriken(float ox, float oy, float angle)
        {
            float a = angle * Mathf.Deg2Rad;
            float cos=Mathf.Cos(a), sin=Mathf.Sin(a);
            Color c = new Color(0.23f,0.23f,0.23f,1);
            // 8-point star: 4 diamond pairs
            for(int i=0;i<4;i++){
                float ai = i*Mathf.PI/2 + a;
                float bx=Mathf.Cos(ai)*12, by=Mathf.Sin(ai)*12;
                float lx=Mathf.Cos(ai+Mathf.PI/2)*3, ly=Mathf.Sin(ai+Mathf.PI/2)*3;
                DrawTriangle(ox+bx,oy+by, ox+lx,oy+ly, ox-lx,oy-ly, c);
            }
            DrawCircle(ox,oy,2.5f, new Color(0.35f,0.35f,0.35f,1));
        }

        // ── Explosion ────────────────────────────────────────────────────────

        public static void DrawExplosion(float ox, float oy, float progress)
        {
            float r = 5 + progress*25, o = 1 - progress;
            DrawCircle(ox,oy, r,       new Color(1f,0.78f,0.20f,o*0.6f));
            DrawCircle(ox,oy, r*0.6f,  new Color(1f,0.47f,0.08f,o*0.8f));
            DrawCircle(ox,oy, r*0.3f,  new Color(1f,1f,0.78f,o));
        }
    }
}
