using UnityEngine;

namespace Killuminati
{
    public enum GameScreen { Splash, Menu, Play, GameOver, Info }

    /// <summary>
    /// Central singleton. Manages FSM, game loop, score/HiScore, and all OnGUI rendering.
    /// Attach to ONE empty GameObject in the scene — everything else is created at runtime.
    /// </summary>
    public class GameManager : MonoBehaviour
    {
        public static GameManager Instance { get; private set; }

        // ── State ─────────────────────────────────────────────────────────────
        public GameScreen CurrentScreen { get; private set; } = GameScreen.Splash;
        public GameState  State         { get; private set; }

        int   _score, _last, _hi;
        float _splashTimer;
        bool  _overFired;
        int   _menuFrame;
        float _lastFire;
        int   _boff = -3;       // control bar offset (-5..1)
        float _gameW, _gameH;   // pixel dims of game viewport

        // ── GUI styles (created once) ─────────────────────────────────────────
        GUIStyle _titleStyle, _subStyle, _btnStyle, _exitBtnStyle,
                 _hudStyle, _overStyle, _infoStyle, _recStyle;
        bool     _stylesReady;

        // ── Lifecycle ─────────────────────────────────────────────────────────
        void Awake()
        {
            if (Instance != null) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);

            // Load hi-score
            _hi = PlayerPrefs.GetInt("ki_hi", 0);

            // Set up camera + renderer
            SetupCamera();
        }

        void SetupCamera()
        {
            Camera cam = Camera.main ?? gameObject.AddComponent<Camera>();
            cam.clearFlags       = CameraClearFlags.SolidColor;
            cam.backgroundColor  = new Color(0.024f,0.031f,0.016f,1);
            cam.orthographic     = true;

            var gr = cam.gameObject.GetComponent<GameRenderer>() ?? cam.gameObject.AddComponent<GameRenderer>();
            _gameW = Mathf.Min(Screen.width, 420);
            _gameH = Screen.height - 180;
            gr.GameW   = _gameW;
            gr.GameH   = _gameH;
            gr.OffsetX = (Screen.width - _gameW) / 2f;
            gr.OffsetY = 40f;
        }

        void Start()
        {
            CurrentScreen = GameScreen.Splash;
            _splashTimer  = 0;
        }

        void Update()
        {
            switch (CurrentScreen)
            {
                case GameScreen.Splash:
                    _splashTimer += Time.deltaTime;
                    _menuFrame++;
                    if (_splashTimer >= 2.5f) GoTo(GameScreen.Menu);
                    break;
                case GameScreen.Menu:
                case GameScreen.Info:
                    _menuFrame++;
                    break;
                case GameScreen.Play:
                    TickGame();
                    break;
            }
        }

        // ── Game Loop ─────────────────────────────────────────────────────────
        void TickGame()
        {
            if (State == null) return;
            if (!State.alive) return;

            float dt = Mathf.Min(Time.deltaTime, 0.08f);
            var (levelDone, dead) = GameEngine.Tick(State, dt, _gameW, _gameH);

            if (levelDone) { _score++; State = GameEngine.MakeLevel(_gameW, _gameH); }
            if (dead && !_overFired)
            {
                _overFired = true; _last = _score;
                if (_score > _hi) { _hi = _score; PlayerPrefs.SetInt("ki_hi", _hi); PlayerPrefs.Save(); }
                Invoke(nameof(ShowGameOver), 0.8f);
            }
        }

        void ShowGameOver() => GoTo(GameScreen.GameOver);

        // ── Actions ───────────────────────────────────────────────────────────
        void StartGame()
        {
            _score = 0; _overFired = false; _boff = -3;
            State  = GameEngine.MakeLevel(_gameW, _gameH);
            GoTo(GameScreen.Play);
        }

        void Fire()
        {
            float now = Time.time;
            if (now - _lastFire < 0.5f) return;
            _lastFire = now;
            if (State?.alive == true)
                State.bul.Add(new BulletData { x = State.sx + GameConstants.PLAYER_X + 20, y = State.py });
        }

        void MoveUp()   { if (State != null) State.ty = Mathf.Max(25,          State.ty - 45); }
        void MoveDown() { if (State != null) State.ty = Mathf.Min(_gameH - 40, State.ty + 45); }
        void BarUp()    { _boff = Mathf.Max(-5, _boff - 1); }
        void BarDown()  { _boff = Mathf.Min(1,  _boff + 1); }

        // Public bridge for PlayerController
        public void OnFire()     => Fire();
        public void OnMoveUp()   => MoveUp();
        public void OnMoveDown() => MoveDown();

        void GoTo(GameScreen s) { CurrentScreen = s; if (s == GameScreen.Splash) { _splashTimer = 0; _menuFrame = 0; } }

        // ── OnGUI ─────────────────────────────────────────────────────────────
        void OnGUI()
        {
            if (!_stylesReady) BuildStyles();

            switch (CurrentScreen)
            {
                case GameScreen.Splash:   DrawSplash();   break;
                case GameScreen.Menu:     DrawMenu();     break;
                case GameScreen.Play:     DrawHUD();      break;
                case GameScreen.GameOver: DrawGameOver(); break;
                case GameScreen.Info:     DrawInfo();     break;
            }
        }

        // ── Splash ────────────────────────────────────────────────────────────
        void DrawSplash()
        {
            GUI.color = Color.black;
            GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), Texture2D.whiteTexture);
            GUI.color = Color.white;
            // Draw animated pyramid centered
            DrawPyramidOnGUI(Screen.width / 2f, Screen.height / 2f, _menuFrame, 0, 3.5f);
        }

        // ── Menu ──────────────────────────────────────────────────────────────
        void DrawMenu()
        {
            DrawDarkBg();
            float cx = Screen.width / 2f;
            float cy = Screen.height * 0.18f;

            // Preview sprites
            DrawPyramidOnGUI(cx - 80, cy, _menuFrame, 0, 1f);
            DrawCaducOnGUI(cx,       cy, _menuFrame * 0.05f, 1f);
            DrawScarabOnGUI(cx + 80, cy, _menuFrame * 0.05f, 0, 1f);

            GUI.Label(new Rect(cx - 180, cy + 60, 360, 50), "KILLUMINATI", _titleStyle);
            GUI.Label(new Rect(cx - 180, cy + 115, 360, 30), "▲ THE DRAGON STRIKES BACK ▲", _subStyle);

            if (Button(cx, cy + 180, "▶  GIOCA"))  StartGame();
            if (Button(cx, cy + 240, "ℹ  INFO"))   GoTo(GameScreen.Info);
            if (ExitButton(cx, cy + 300, "✕  ESCI")) Application.Quit();

            if (_hi > 0) GUI.Label(new Rect(cx - 100, cy + 360, 200, 30), $"RECORD: {_hi}", _recStyle);
        }

        // ── HUD ───────────────────────────────────────────────────────────────
        void DrawHUD()
        {
            var g = State; if (g == null) return;
            int timeLeft = Mathf.Max(0, Mathf.FloorToInt(g.tl - g.el));

            // Top bar
            GUI.color = new Color(0.024f, 0.047f, 0.016f, 0.92f);
            GUI.DrawTexture(new Rect(0, 0, Screen.width, 40), Texture2D.whiteTexture);
            GUI.color = Color.white;
            GUI.Label(new Rect(14,  8, 120, 26), $"◈ {g.req}",    _hudStyle);
            GUI.Label(new Rect(Screen.width/2f-40,  8, 80, 26),
                timeLeft <= 3 ? $"<color=#e84040>⏱ {timeLeft}s</color>" : $"⏱ {timeLeft}s", _hudStyle);
            GUI.Label(new Rect(Screen.width - 120, 8, 110, 26), $"★ {_score}", _hudStyle);

            // Control bar
            float bBot   = -_boff * 50;
            float barW   = 260, barH = 54;
            float barX   = (Screen.width - barW) / 2f;
            float barY   = Screen.height - barH - bBot;

            GUI.color = new Color(0.024f,0.047f,0.016f,0.95f);
            GUI.DrawTexture(new Rect(barX, barY, barW, barH), Texture2D.whiteTexture);
            GUI.color = Color.white;

            // Bar position buttons
            if (GUI.Button(new Rect(barX+4, barY+4,  36, 22), "▲", _btnStyle)) BarUp();
            if (GUI.Button(new Rect(barX+4, barY+28, 36, 22), "▼", _btnStyle)) BarDown();
            // Movement buttons
            if (GUI.Button(new Rect(barX+50,  barY+8, 60, 38), "↑", _btnStyle)) MoveUp();
            if (GUI.Button(new Rect(barX+118, barY+8, 60, 38), "↓", _btnStyle)) MoveDown();
            // Fire button
            if (GUI.Button(new Rect(barX+188, barY+8, 68, 38), "🔥", _btnStyle)) Fire();
        }

        // ── Game Over ─────────────────────────────────────────────────────────
        void DrawGameOver()
        {
            DrawDarkBg();
            float cx = Screen.width / 2f, cy = Screen.height * 0.3f;
            GUI.Label(new Rect(cx - 180, cy,      360, 60), "GAME OVER", _overStyle);
            GUI.Label(new Rect(cx - 180, cy + 70, 360, 36), $"Punteggio: {_last}", _infoStyle);
            GUI.Label(new Rect(cx - 180, cy + 106,360, 30), $"Record: {_hi}",      _recStyle);
            if (Button(cx,   cy + 160, "↺  RIPROVA"))              StartGame();
            if (Button(cx,   cy + 220, "⌂  HOME"))                 GoTo(GameScreen.Menu);
            if (ExitButton(cx,cy + 280, "ESCI"))                    Application.Quit();
        }

        // ── Info ──────────────────────────────────────────────────────────────
        void DrawInfo()
        {
            DrawDarkBg();
            float cx = Screen.width / 2f, y = Screen.height * 0.08f;
            GUI.Label(new Rect(cx - 150, y, 300, 40), "INFO", _titleStyle); y += 50;
            string[] lines = {
                "Guida il draghetto attraverso i livelli!","",
                "★ NEMICI",
                "▲ Loominadi = -1 kill",
                "⚕ Cadooceadis = -3 kills",
                "◉ Scarab = -5 sec timer","",
                "Evita bombe e shuriken!","",
                "★ BARRA COMANDI",
                "↑  Su  —  sposta il drago verso l'alto",
                "↓  Giù  —  sposta il drago verso il basso",
                "🔥  Spara  —  lancia una palla di fuoco","",
                "La barra è mobile: usa ▲ ▼ per spostarla."
            };
            foreach (var l in lines) {
                GUI.Label(new Rect(cx - 180, y, 360, 26), l, _infoStyle); y += 26;
            }
            if (Button(cx, y + 20, "← MENU")) GoTo(GameScreen.Menu);
        }

        // ── Helpers ───────────────────────────────────────────────────────────
        void DrawDarkBg()
        {
            GUI.color = new Color(0.04f,0.055f,0.03f,1);
            GUI.DrawTexture(new Rect(0,0,Screen.width,Screen.height), Texture2D.whiteTexture);
            GUI.color = Color.white;
        }

        bool Button(float cx, float cy, string label)
        {
            var r = new Rect(cx - 105, cy, 210, 46);
            return GUI.Button(r, label, _btnStyle);
        }

        bool ExitButton(float cx, float cy, string label)
        {
            var r = new Rect(cx - 105, cy, 210, 46);
            return GUI.Button(r, label, _exitBtnStyle);
        }

        // ── OnGUI sprite helpers (drawn with GL via DrawTexture trick) ─────────
        // We repaint with a callback texture — simplest cross-platform approach
        void DrawPyramidOnGUI(float x, float y, int frame, int variant, float scale) { /* placeholder — actual drawing in GameRenderer for play; menus use labels */ }
        void DrawCaducOnGUI(float x,  float y, float t, float scale) {}
        void DrawScarabOnGUI(float x, float y, float t, int variant, float scale) {}

        // ── GUIStyle builder ──────────────────────────────────────────────────
        void BuildStyles()
        {
            _titleStyle = new GUIStyle(GUI.skin.label) {
                fontSize=22, fontStyle=FontStyle.Bold, alignment=TextAnchor.MiddleCenter,
                normal = { textColor = new Color(0.25f,0.75f,0.31f) }
            };
            _subStyle = new GUIStyle(GUI.skin.label) {
                fontSize=10, alignment=TextAnchor.MiddleCenter,
                normal = { textColor = new Color(0.23f,0.35f,0.17f) }
            };
            _btnStyle = new GUIStyle(GUI.skin.button) {
                fontSize=14, fontStyle=FontStyle.Bold, alignment=TextAnchor.MiddleCenter,
                normal   = { textColor=new Color(0.37f,0.75f,0.31f), background=MakeTex(new Color(0.04f,0.12f,0.04f,0.85f)) },
                hover    = { textColor=new Color(0.50f,0.90f,0.40f), background=MakeTex(new Color(0.06f,0.18f,0.06f,0.90f)) },
                active   = { textColor=Color.white,                   background=MakeTex(new Color(0.10f,0.26f,0.10f,1.0f)) }
            };
            _exitBtnStyle = new GUIStyle(_btnStyle) {
                normal = { textColor=new Color(0.63f,0.25f,0.25f), background=MakeTex(new Color(0.12f,0.03f,0.03f,0.85f)) },
                hover  = { textColor=new Color(0.80f,0.35f,0.35f), background=MakeTex(new Color(0.18f,0.05f,0.05f,0.90f)) }
            };
            _hudStyle = new GUIStyle(GUI.skin.label) {
                fontSize=13, richText=true,
                normal = { textColor=new Color(0.50f,0.69f,0.37f) }
            };
            _overStyle = new GUIStyle(GUI.skin.label) {
                fontSize=30, fontStyle=FontStyle.Bold, alignment=TextAnchor.MiddleCenter,
                normal = { textColor=new Color(0.54f,0.17f,0.10f) }
            };
            _infoStyle = new GUIStyle(GUI.skin.label) {
                fontSize=13, alignment=TextAnchor.MiddleCenter,
                normal = { textColor=new Color(0.48f,0.54f,0.37f) }
            };
            _recStyle = new GUIStyle(GUI.skin.label) {
                fontSize=12, alignment=TextAnchor.MiddleCenter,
                normal = { textColor=new Color(0.17f,0.29f,0.13f) }
            };
            _stylesReady = true;
        }

        static Texture2D MakeTex(Color c)
        {
            var t = new Texture2D(1,1); t.SetPixel(0,0,c); t.Apply(); return t;
        }
    }
}
