using System;
using System.Collections.Generic;
using UnityEngine;

namespace Killuminati
{
    public static class GameConstants
    {
        public const float BULLET_SPEED  = 8f;
        public const float SCROLL_SPEED  = 1.2f;
        public const int   PLAYER_X      = 60;
        public const int   ENEMY_COUNT   = 22;
        public const int   BOMB_COUNT    = 3;
        public const int   SHURIKEN_COUNT= 6;
    }

    [Serializable] public class EnemyData   { public string type; public float x,y,vx,vy; public int variant; public bool alive; }
    [Serializable] public class HazardData  { public string kind; public float x,y,vy,angle; public bool alive; }
    [Serializable] public class BulletData  { public float x,y; }
    [Serializable] public class ExplosionData{ public float x,y,progress; }

    [Serializable]
    public class GameState
    {
        public float py, ty, sx, bob, el, tl;
        public int   fr, req;
        public bool  alive;
        public List<BulletData>   bul = new List<BulletData>();
        public List<EnemyData>    en  = new List<EnemyData>();
        public List<HazardData>   hz  = new List<HazardData>();
        public List<ExplosionData>ex  = new List<ExplosionData>();
    }

    public static class GameEngine
    {
        static readonly System.Random rng = new System.Random();
        static float Rnd() => (float)rng.NextDouble();

        public static EnemyData MakeEnemy(string type, float sx, float h)
        {
            float bvx = 0.3f + Rnd() * 1.0f;
            return new EnemyData {
                type=type, alive=true, variant=rng.Next(5),
                x = sx + 250 + Rnd()*350,
                y = 50  + Rnd()*(h-100),
                vx= type=="loominadi" ? bvx*1.2f : bvx,
                vy= (Rnd()-0.5f)*0.8f
            };
        }

        public static HazardData MakeHazard(string kind, float sx, float h) => new HazardData {
            kind=kind, alive=true, angle=0,
            x = sx + 350 + Rnd()*450,
            y = 50  + Rnd()*(h-100),
            vy= kind=="shuriken" ? 4.5f+Rnd()*3.5f : 0
        };

        public static GameState MakeLevel(float gw, float h)
        {
            var en = new List<EnemyData>();
            for (int i=0;i<GameConstants.ENEMY_COUNT;i++)
                en.Add(MakeEnemy(i<18?"loominadi":i<20?"cadooceadis":"scarab", 0, h));

            var hz = new List<HazardData>();
            for (int i=0;i<GameConstants.BOMB_COUNT;i++)    hz.Add(MakeHazard("bomb",    0,h));
            for (int i=0;i<GameConstants.SHURIKEN_COUNT;i++) hz.Add(MakeHazard("shuriken",0,h));

            return new GameState {
                py=h/2-20, ty=h/2-20, sx=0, el=0, fr=0, alive=true, bob=0,
                req=(3+rng.Next(3))*4, tl=30+rng.Next(11),
                bul=new List<BulletData>(), en=en, hz=hz, ex=new List<ExplosionData>()
            };
        }

        public static string PickType() { float r=Rnd(); return r<0.85f?"loominadi":r<0.95f?"cadooceadis":"scarab"; }

        public static (bool levelDone, bool dead) Tick(GameState g, float dt, float gw, float h)
        {
            g.fr++; g.el+=dt; g.sx+=GameConstants.SCROLL_SPEED;
            g.py+=(g.ty-g.py)*0.12f;
            g.bob=Mathf.Sin(g.fr*0.06f)*3;

            float pWX=g.sx+GameConstants.PLAYER_X, pWY=g.py+g.bob;

            // Bullets
            var nb=new List<BulletData>();
            foreach(var b in g.bul){ b.x+=GameConstants.BULLET_SPEED; if(b.x<g.sx+gw+50&&b.x>0) nb.Add(b); }
            g.bul=nb;

            // Enemies
            foreach(var e in g.en){ if(!e.alive)continue; e.x+=e.vx; e.y+=e.vy; if(e.y<35||e.y>h-35) e.vy*=-1; }

            // Hazards
            foreach(var haz in g.hz){
                if(!haz.alive)continue;
                if(haz.kind=="shuriken"){ haz.x-=4; haz.y+=haz.vy; haz.angle=(haz.angle+4)%360; if(haz.y<25||haz.y>h-25) haz.vy*=-1; }
                else { haz.angle=(haz.angle+0.5f)%360; }
            }

            // Explosions
            g.ex.RemoveAll(e=>{ e.progress+=dt*3; return e.progress>=1; });

            // Bullet-enemy collision
            var kills=new List<int>(); var usedB=new HashSet<int>();
            for(int bi=0;bi<g.bul.Count;bi++){
                if(usedB.Contains(bi))continue;
                var b=g.bul[bi];
                for(int ei=0;ei<g.en.Count;ei++){
                    var e=g.en[ei]; if(!e.alive)continue;
                    float hr=e.type=="scarab"?8:e.type=="cadooceadis"?10:14;
                    if(Mathf.Abs(b.x-e.x)<hr&&Mathf.Abs(b.y-e.y)<hr){
                        kills.Add(ei); usedB.Add(bi);
                        g.ex.Add(new ExplosionData{x=e.x-g.sx,y=e.y,progress=0}); break;
                    }
                }
            }
            foreach(int ei in kills){
                var e=g.en[ei];
                if(e.type=="loominadi")    g.req=Mathf.Max(0,g.req-1);
                else if(e.type=="cadooceadis") g.req=Mathf.Max(0,g.req-3);
                else if(e.type=="scarab")  g.el=Mathf.Max(0,g.el-5);
                e.alive=false; e.x=-99999; e.y=-99999;
            }
            if(usedB.Count>0){ var nbl=new List<BulletData>(); for(int i=0;i<g.bul.Count;i++) if(!usedB.Contains(i)) nbl.Add(g.bul[i]); g.bul=nbl; }

            // Player-enemy collision
            if(g.alive) foreach(var e in g.en){
                if(!e.alive)continue;
                float hr=e.type=="scarab"?8:e.type=="cadooceadis"?10:14;
                if(Mathf.Abs(pWX-e.x)<hr&&Mathf.Abs(pWY-e.y)<hr){ e.alive=false; g.alive=false; g.ex.Add(new ExplosionData{x=GameConstants.PLAYER_X,y=g.py,progress=0}); break; }
            }

            // Player-hazard collision
            if(g.alive) foreach(var haz in g.hz){
                if(!haz.alive)continue;
                float hr=haz.kind=="bomb"?13:12;
                if(Mathf.Abs(pWX-haz.x)<hr&&Mathf.Abs(pWY-haz.y)<hr){ haz.alive=false; g.alive=false; g.ex.Add(new ExplosionData{x=GameConstants.PLAYER_X,y=g.py,progress=0}); break; }
            }

            // Respawn
            for(int i=0;i<g.en.Count;i++) if(!g.en[i].alive&&g.req>0) g.en[i]=MakeEnemy(PickType(),g.sx,h);
            for(int i=0;i<g.hz.Count;i++) if(g.hz[i].x-g.sx<-100) g.hz[i]=MakeHazard(g.hz[i].kind,g.sx,h);

            bool levelDone=g.req<=0;
            bool dead=g.el>=g.tl||!g.alive;
            if(dead) g.alive=false;
            return (levelDone, dead);
        }
    }
}
