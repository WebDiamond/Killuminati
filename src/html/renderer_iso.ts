export const RENDERER_ISO_JS = `
/* ---- Isometric Game Renderer ---- */
var threeRenderer, threeScene, threeCamera;
var GW=0, SVG_H=0;
var dragonSpr, bgMesh;
var bulletPool=[], enemyPool=[], hazardPool=[], boomPool=[];
var gameState=null, gameScore=0, overFired=false, transitionActive=false;
var animId=null, lastTs=0, accumulator=0;
var FIXED_DT=0.05;
var threeInited=false;
var ISO_BULLET_ANGLE=0; /* computed in initThree once SVG_H is known */

/* Isometric projection: player at bottom-left (~30% from bottom), enemies from upper-right.
   Coefficients scale with SVG_H so layout is consistent across screen sizes.
   sx = relative X (PLAYER_X=60 = player; higher = further away = upper-right on screen)
   sy = lateral lane (center = SVG_H/2; higher sy = screen-right) */
function toIso(sx,sy){
  var dy=sy-SVG_H*0.5;
  var c=SVG_H/654;  /* depth coefficient: scales enemy from bottom to top as sx grows */
  var ix=sx*0.76+17+dy*0.4;
  var iy=SVG_H*0.7917-sx*c+dy*0.12;
  return{x:ix,y:iy};
}

function makeSprite(tex,w,h){
  var mat=new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:false});
  var spr=new THREE.Sprite(mat);
  spr.scale.set(w,h,1);
  spr.visible=false;
  threeScene.add(spr);
  return spr;
}

/* Position a sprite using iso projection. z encodes depth for sorting. */
function posIsoSprite(spr,gx,gy){
  var p=toIso(gx,gy);
  spr.position.set(p.x,SVG_H-p.y,p.y/SVG_H*0.45);
  spr.visible=true;
}

function hideSprite(spr){spr.visible=false;}

function initThree(){
  if(threeInited)return;
  threeInited=true;
  GW=Math.min(window.innerWidth,420);
  SVG_H=window.innerHeight-40;
  var canvas=document.getElementById('gc');
  threeRenderer=new THREE.WebGLRenderer({canvas:canvas,antialias:false,alpha:false});
  threeRenderer.setSize(GW,SVG_H);
  threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  threeScene=new THREE.Scene();
  threeCamera=new THREE.OrthographicCamera(0,GW,SVG_H,0,-1,1);
  threeCamera.position.z=0.5;
  buildIsoTextures();
  /* Bullet angle: direction of travel in Three.js XY (y-up) = atan2(SVG_H/654, 0.76) */
  ISO_BULLET_ANGLE=Math.atan2(SVG_H/654,0.76);
  /* Tiled iso-diamond background */
  TEX_ISO.bg.repeat.set(GW/80,SVG_H/40);
  var bgGeo=new THREE.PlaneGeometry(GW,SVG_H);
  bgMesh=new THREE.Mesh(bgGeo,new THREE.MeshBasicMaterial({map:TEX_ISO.bg}));
  bgMesh.position.set(GW/2,SVG_H/2,-0.5);
  threeScene.add(bgMesh);
  /* Sprites */
  dragonSpr=makeSprite(TEX_ISO.player[0],88,60);
  var i;
  for(i=0;i<15;i++) bulletPool.push(makeSprite(TEX_ISO.fireball[0],32,20));
  for(i=0;i<ENEMY_COUNT;i++) enemyPool.push(makeSprite(TEX_ISO.loominadi[0][0],64,52));
  for(i=0;i<BOMB_COUNT+SHURIKEN_COUNT;i++) hazardPool.push(makeSprite(TEX_ISO.shuriken,30,30));
  for(i=0;i<8;i++) boomPool.push(makeSprite(TEX_ISO.bomb[0],40,40));
}

function updateHUD(){
  if(!gameState)return;
  var tl=Math.max(0,Math.floor((gameState.tl||0)-(gameState.el||0)));
  document.getElementById('hud-kills').textContent='\\u25C8 '+(gameState.req||0);
  var hpEl=document.getElementById('hud-hp');
  if(hpEl){var hp=Math.max(0,gameState.hp||0);hpEl.textContent='\\u2764 '+hp;hpEl.className='hud-txt hud-hp'+(hp<=1?' hud-hp-low':'');}
  var htEl=document.getElementById('hud-time');
  htEl.textContent='\\u23F1 '+tl+'s';
  htEl.className='hud-txt'+(tl<=3?' hud-urgent':'');
  document.getElementById('hud-score').textContent='\\u2605 '+gameScore;
  var st=Math.max(0,gameState.stamina||0);
  for(var si=0;si<10;si++){var seg=document.getElementById('st'+si);if(seg)seg.className='st-seg'+(si>=st?' st-empty':'');}
}

function updateSprites(){
  var g=gameState;if(!g)return;
  var sx=g.sx,fr=g.fr;
  /* Player */
  if(g.alive){
    var df=Math.floor(fr/3)%8;
    dragonSpr.material.map=TEX_ISO.player[df];
    dragonSpr.material.needsUpdate=true;
    dragonSpr.scale.set(88,60,1);
    posIsoSprite(dragonSpr,PLAYER_X,(g.py||0)+(g.bob||0));
  } else hideSprite(dragonSpr);
  /* Bullets */
  var bi=0;
  g.bul.forEach(function(b){
    if(bi>=bulletPool.length)return;
    var bx=b.x-sx;
    if(bx>-20&&bx<GW+20){
      var ff=Math.floor(fr/2)%4;
      bulletPool[bi].material.map=TEX_ISO.fireball[ff];
      bulletPool[bi].material.rotation=ISO_BULLET_ANGLE;
      bulletPool[bi].material.needsUpdate=true;
      bulletPool[bi].scale.set(32,20,1);
      posIsoSprite(bulletPool[bi],bx,b.y);
    } else hideSprite(bulletPool[bi]);
    bi++;
  });
  for(;bi<bulletPool.length;bi++) hideSprite(bulletPool[bi]);
  /* Enemies */
  var ei=0;
  g.en.forEach(function(e){
    if(ei>=enemyPool.length)return;
    if(!e.alive){hideSprite(enemyPool[ei++]);return;}
    var ex2=e.x-sx;
    if(ex2>-80&&ex2<GW+80){
      var spr=enemyPool[ei],ev=e.variant%5;
      if(e.type==='loominadi'){
        spr.scale.set(64,52,1);
        spr.material.map=TEX_ISO.loominadi[ev][Math.floor(fr/4)%4];
      } else if(e.type==='cadooceadis'){
        spr.scale.set(64,60,1);
        var cf2=Math.floor(fr/3)%8;
        spr.material.map=(e.hp<=1)?TEX_ISO.cadooceadisDamaged[cf2]:TEX_ISO.cadooceadis[cf2];
      } else if(e.type==='scarab'){
        spr.scale.set(52,44,1);
        spr.material.map=TEX_ISO.loominadi[ev][Math.floor(fr/4)%4];
      } else {
        spr.scale.set(48,44,1);
        spr.material.map=TEX_ISO.gem[Math.floor(fr/3)%8];
      }
      spr.material.needsUpdate=true;
      posIsoSprite(spr,ex2,e.y);
    } else hideSprite(enemyPool[ei]);
    ei++;
  });
  for(;ei<enemyPool.length;ei++) hideSprite(enemyPool[ei]);
  /* Hazards */
  var hi=0;
  g.hz.forEach(function(h){
    if(hi>=hazardPool.length)return;
    if(!h.alive){hideSprite(hazardPool[hi++]);return;}
    var hx=h.x-sx;
    if(hx>-40&&hx<GW+40){
      var spr2=hazardPool[hi];
      if(h.kind==='bomb'){
        spr2.scale.set(30,36,1);
        spr2.material.map=TEX_ISO.bomb[Math.floor(fr/6)%4];
      } else {
        spr2.scale.set(30,30,1);
        spr2.material.map=TEX_ISO.shuriken;
        spr2.material.rotation=h.angle*Math.PI/180;
      }
      spr2.material.needsUpdate=true;
      posIsoSprite(spr2,hx,h.y);
    } else hideSprite(hazardPool[hi]);
    hi++;
  });
  for(;hi<hazardPool.length;hi++) hideSprite(hazardPool[hi]);
  /* Background: tiles scroll upper-right → lower-left as player advances */
  if(bgMesh&&g){
    var tu=g.sx/80;
    TEX_ISO.bg.offset.x=(-tu*0.38)%1;
    TEX_ISO.bg.offset.y=(-tu*0.58)%1;
  }
  /* Explosions */
  var xi=0;
  g.ex.forEach(function(ex3){
    if(xi>=boomPool.length)return;
    var bc=document.createElement('canvas');bc.width=40;bc.height=40;
    drawBoom(bc.getContext('2d'),ex3.progress);
    boomPool[xi].material.map=new THREE.CanvasTexture(bc);
    boomPool[xi].material.needsUpdate=true;
    boomPool[xi].scale.set(40,40,1);
    posIsoSprite(boomPool[xi],ex3.x,ex3.y);
    xi++;
  });
  for(;xi<boomPool.length;xi++) hideSprite(boomPool[xi]);
}

function gameLoop(ts){
  animId=requestAnimationFrame(gameLoop);
  if(!gameState)return;
  var elapsed=Math.min((ts-lastTs)/1000,0.15);
  lastTs=ts;
  accumulator+=elapsed;
  while(accumulator>=FIXED_DT&&gameState){
    var res=tick(gameState,FIXED_DT,GW,SVG_H);
    if(res.levelDone&&!transitionActive){
      transitionActive=true;gameScore++;
      var _lvl=gameScore,_hp=gameState.hp;
      gameState=null;
      showLevelTransition(_lvl,function(){gameState=mkLevel(GW,SVG_H);gameState.hp=Math.max(1,_hp);transitionActive=false;});
      break;
    }
    if(res.dead&&!overFired){
      overFired=true;saveHi(gameScore);
      setTimeout(function(){showOver(gameScore);},800);
    }
    accumulator-=FIXED_DT;
  }
  updateSprites();
  updateHUD();
  threeRenderer.render(threeScene,threeCamera);
}

function startGame(){
  gameScore=0;overFired=false;accumulator=0;transitionActive=false;
  showScreen('game');
  requestAnimationFrame(function(){
    initThree();
    gameState=mkLevel(GW,SVG_H);
    lastTs=performance.now();
    if(animId)cancelAnimationFrame(animId);
    animId=requestAnimationFrame(gameLoop);
  });
}

function stopGame(){
  if(animId){cancelAnimationFrame(animId);animId=null;}
  gameState=null;
}
`;
