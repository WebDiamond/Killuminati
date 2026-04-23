using UnityEngine;

namespace Killuminati
{
    /// <summary>
    /// Attach to the Camera. Draws the game area each frame using GL.
    /// Reads GameState from GameManager.Instance.
    /// </summary>
    [RequireComponent(typeof(Camera))]
    public class GameRenderer : MonoBehaviour
    {
        // Game viewport dimensions (pixels) — set by GameManager
        public float GameW = 420f;
        public float GameH = 600f;

        // Offset of game viewport inside screen
        public float OffsetX = 0f;
        public float OffsetY = 40f; // room for HUD at top

        void OnPostRender()
        {
            var gm = GameManager.Instance;
            if (gm == null || gm.CurrentScreen != GameScreen.Play) return;
            var g = gm.State;
            if (g == null) return;

            SpritePainter.GetMat().SetPass(0);

            GL.PushMatrix();
            // Map pixel coords (origin top-left) into NDC
            GL.LoadPixelMatrix(0, Screen.width, Screen.height, 0);

            // Translate to game viewport
            var m = Matrix4x4.TRS(new Vector3(OffsetX, OffsetY, 0), Quaternion.identity, Vector3.one);
            GL.MultMatrix(m);

            // Background
            SpritePainter.DrawBackground(GameW, GameH);

            // Fireballs
            foreach (var b in g.bul)
            {
                float bx = b.x - g.sx;
                if (bx < -20 || bx > GameW + 20) continue;
                SpritePainter.DrawFireball(bx, b.y, g.fr);
            }

            // Enemies
            foreach (var e in g.en)
            {
                if (!e.alive) continue;
                float sx = e.x - g.sx;
                if (sx < -30 || sx > GameW + 30) continue;
                switch (e.type)
                {
                    case "loominadi":    SpritePainter.DrawPyramid(sx, e.y, g.fr, e.variant); break;
                    case "cadooceadis":  SpritePainter.DrawCaduc(sx, e.y, g.fr * 0.08f); break;
                    default:             SpritePainter.DrawScarab(sx, e.y, g.fr * 0.05f, e.variant); break;
                }
            }

            // Hazards
            foreach (var h in g.hz)
            {
                if (!h.alive) continue;
                float sx = h.x - g.sx;
                if (sx < -20 || sx > GameW + 20) continue;
                if (h.kind == "bomb") SpritePainter.DrawBomb(sx, h.y, g.fr * 0.04f);
                else                  SpritePainter.DrawShuriken(sx, h.y, h.angle);
            }

            // Player dragon
            if (g.alive)
                SpritePainter.DrawDragon(GameConstants.PLAYER_X, g.py + g.bob,
                    0.5f + Mathf.Sin(g.fr * 0.08f) * 0.3f, g.fr);

            // Explosions
            foreach (var ex in g.ex)
                SpritePainter.DrawExplosion(ex.x, ex.y, ex.progress);

            GL.PopMatrix();
        }
    }
}
