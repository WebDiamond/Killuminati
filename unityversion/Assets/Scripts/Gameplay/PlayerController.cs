using UnityEngine;

namespace Killuminati
{
    /// <summary>
    /// Handles all touch/pointer input for the player during gameplay.
    /// GameManager owns the actual state mutation; this script just translates input events.
    /// Attach to the same GameObject as GameManager, or to any active GameObject.
    /// </summary>
    public class PlayerController : MonoBehaviour
    {
        // Swipe detection thresholds
        const float SWIPE_MIN_DIST = 30f;   // pixels
        const float SWIPE_MAX_TIME = 0.4f;  // seconds

        Vector2 _touchStart;
        float   _touchStartTime;
        bool    _touching;

        void Update()
        {
            if (GameManager.Instance?.CurrentScreen != GameScreen.Play) return;

            HandleTouchInput();
            HandleKeyboardInput(); // useful for desktop testing in Editor
        }

        void HandleTouchInput()
        {
#if UNITY_EDITOR || UNITY_STANDALONE
            // Mouse emulation for editor
            if (Input.GetMouseButtonDown(0)) { _touchStart = Input.mousePosition; _touchStartTime = Time.time; _touching = true; }
            if (Input.GetMouseButtonUp(0) && _touching)
            {
                ProcessSwipe(Input.mousePosition);
                _touching = false;
            }
#else
            if (Input.touchCount > 0)
            {
                Touch t = Input.GetTouch(0);
                if (t.phase == TouchPhase.Began)  { _touchStart = t.position; _touchStartTime = Time.time; _touching = true; }
                if (t.phase == TouchPhase.Ended && _touching) { ProcessSwipe(t.position); _touching = false; }
            }
#endif
        }

        void ProcessSwipe(Vector2 end)
        {
            Vector2 delta = end - _touchStart;
            float   dt    = Time.time - _touchStartTime;

            if (dt > SWIPE_MAX_TIME) return; // too slow = not a swipe

            if (Mathf.Abs(delta.y) >= SWIPE_MIN_DIST)
            {
                // Vertical swipe → move dragon
                if (delta.y > 0) GameManager.Instance.OnMoveUp();
                else             GameManager.Instance.OnMoveDown();
            }
            else if (delta.magnitude < SWIPE_MIN_DIST)
            {
                // Tap → fire
                GameManager.Instance.OnFire();
            }
        }

        void HandleKeyboardInput()
        {
            if (Input.GetKeyDown(KeyCode.UpArrow)   || Input.GetKeyDown(KeyCode.W)) GameManager.Instance.OnMoveUp();
            if (Input.GetKeyDown(KeyCode.DownArrow)  || Input.GetKeyDown(KeyCode.S)) GameManager.Instance.OnMoveDown();
            if (Input.GetKeyDown(KeyCode.Space)      || Input.GetKeyDown(KeyCode.F)) GameManager.Instance.OnFire();
            if (Input.GetKeyDown(KeyCode.Escape)) Application.Quit();
        }
    }
}
