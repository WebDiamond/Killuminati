export const ENGINE_JS = `
var PLAYER_X = 60, BULLET_SPEED = 8, SCROLL_SPEED = 1.2;
var ENEMY_COUNT = 30, BOMB_COUNT = 3, SHURIKEN_COUNT = 3;

function mkE(type, sx, svgH) {
  var bvx = 0.3 + Math.random() * 1.0;
  var yMin=svgH*0.26, yMax=svgH*0.79;
  return { type:type, x:sx+250+Math.random()*350, y:yMin+Math.random()*(yMax-yMin),
    vx:type==='loominadi'?bvx*1.2:type==='gem'?bvx*0.7:bvx, vy:(Math.random()-0.5)*0.6,
    variant:Math.floor(Math.random()*5), hp:(type==='cadooceadis'||type==='scarab')?2:1, alive:true };
}
function mkH(kind, sx, svgH) {
  var yMin=svgH*0.26, yMax=svgH*0.79;
  return { kind:kind, x:sx+350+Math.random()*450, y:yMin+Math.random()*(yMax-yMin),
    vy:kind==='shuriken'?3.5+Math.random()*2.5:0, angle:0, alive:true };
}
function pickType() {
  var r = Math.random();
  return r < 0.78 ? 'loominadi' : r < 0.88 ? 'cadooceadis' : r < 0.95 ? 'scarab' : 'gem';
}
function mkLevel(gw, svgH) {
  var en = [], hz = [], i;
  for (i=0;i<ENEMY_COUNT;i++) en.push(mkE(i<24?'loominadi':i<27?'cadooceadis':'scarab',0,svgH));
  for (i=0;i<BOMB_COUNT;i++) hz.push(mkH('bomb',0,svgH));
  for (i=0;i<SHURIKEN_COUNT;i++) hz.push(mkH('shuriken',0,svgH));
  return { py:svgH/2-20, ty:svgH/2-20, sx:0, bul:[], en:en, hz:hz, ex:[],
    req:(3+Math.floor(Math.random()*3))*4, tl:Math.floor((40+Math.floor(Math.random()*11))*4/3),
    el:0, fr:0, alive:true, bob:0, hp:3, iframes:0, stamina:10, staminaTimer:0 };
}
function tick(g, dt, gw, svgH) {
  g.fr++; g.el+=dt; g.sx+=SCROLL_SPEED;
  if(g.iframes>0)g.iframes--;
  g.staminaTimer+=dt;
  if(g.staminaTimer>=0.5){g.staminaTimer-=0.5;if(g.stamina<10)g.stamina++;}
  g.py+=(g.ty-g.py)*0.12;
  g.bob=Math.sin(g.fr*0.06)*3;
  var pWX=g.sx+PLAYER_X, pWY=g.py+g.bob;
  g.bul=g.bul.filter(function(b){b.x+=BULLET_SPEED;return b.x<g.sx+gw+50&&b.x>0;});
  var yLo=svgH*0.26, yHi=svgH*0.79;
  g.en.forEach(function(e){if(!e.alive)return;e.x+=e.vx;e.y+=e.vy;if(e.y<yLo||e.y>yHi)e.vy*=-1;});
  g.hz.forEach(function(h){
    if(!h.alive)return;
    if(h.kind==='shuriken'){h.x-=4;h.y+=h.vy;h.angle=(h.angle+4)%360;if(h.y<25||h.y>svgH-25)h.vy*=-1;}
    else{h.angle=(h.angle+0.5)%360;}
  });
  g.ex=g.ex.filter(function(e){e.progress+=dt*3;return e.progress<1;});
  var usedB=new Set(),bi,ei;
  for(bi=0;bi<g.bul.length;bi++){
    if(usedB.has(bi))continue;
    var b=g.bul[bi];
    for(ei=0;ei<g.en.length;ei++){
      var e=g.en[ei];if(!e.alive)continue;
      var hr=e.type==='scarab'||e.type==='gem'?8:e.type==='cadooceadis'?10:14;
      if(Math.abs(b.x-e.x)<hr&&Math.abs(b.y-e.y)<hr){
        usedB.add(bi);
        if(e.type==='gem'){
          g.hp=Math.min(g.hp+2,6);
          g.ex.push({x:e.x-g.sx,y:e.y,progress:0});
          if(typeof playExplode==='function')playExplode();
          e.alive=false;e.x=-99999;e.y=-99999;
        } else {
          e.hp=(e.hp||1)-1;
          if(e.hp>0){
            g.ex.push({x:e.x-g.sx,y:e.y,progress:0.55});
            if(typeof playHurt==='function')playHurt();
          } else {
            if(e.type==='loominadi')g.req=Math.max(0,g.req-1);
            else if(e.type==='cadooceadis')g.req=Math.max(0,g.req-3);
            else if(e.type==='scarab')g.el=Math.max(0,g.el-5);
            g.ex.push({x:e.x-g.sx,y:e.y,progress:0});
            if(typeof playExplode==='function')playExplode();
            e.alive=false;e.x=-99999;e.y=-99999;
          }
        }
        break;
      }
    }
  }
  if(usedB.size>0)g.bul=g.bul.filter(function(_,i){return!usedB.has(i);});
  var k,j;
  if(g.alive&&g.iframes===0){
    for(k=0;k<g.en.length;k++){
      var en2=g.en[k];if(!en2.alive)continue;
      var hr2=en2.type==='scarab'||en2.type==='gem'?8:en2.type==='cadooceadis'?10:14;
      if(Math.abs(pWX-en2.x)<hr2&&Math.abs(pWY-en2.y)<hr2){
        en2.alive=false;en2.x=-99999;en2.y=-99999;
        if(en2.type==='gem'){
          g.hp=Math.min(g.hp+2,6);
          g.ex.push({x:PLAYER_X,y:g.py,progress:0.3});
          if(typeof playExplode==='function')playExplode();
        } else {
          g.hp-=1;g.iframes=40;
          if(g.hp<=0){g.alive=false;g.ex.push({x:PLAYER_X,y:g.py,progress:0});if(typeof playExplode==='function')playExplode();}
          else{g.ex.push({x:PLAYER_X,y:g.py,progress:0.45});if(typeof playHurt==='function')playHurt();}
        }
        break;
      }
    }
  }
  if(g.alive&&g.iframes===0){
    for(j=0;j<g.hz.length;j++){
      var h2=g.hz[j];if(!h2.alive)continue;
      var hr3=h2.kind==='bomb'?13:12;
      if(Math.abs(pWX-h2.x)<hr3&&Math.abs(pWY-h2.y)<hr3){
        h2.alive=false;
        var dmg=h2.kind==='bomb'?3:1;
        g.hp-=dmg;g.iframes=40;
        if(g.hp<=0){g.alive=false;g.ex.push({x:PLAYER_X,y:g.py,progress:0});if(typeof playExplode==='function')playExplode();}
        else{g.ex.push({x:PLAYER_X,y:g.py,progress:0.45});if(typeof playHurt==='function')playHurt();}
        break;
      }
    }
  }
  var hasGem=g.en.some(function(e){return e.alive&&e.type==='gem';});
  g.en.forEach(function(e,i){if(!e.alive&&g.req>0){var t=pickType();if(t==='gem'&&hasGem)t='loominadi';g.en[i]=mkE(t,g.sx,svgH);}});
  g.hz.forEach(function(h,i){if(h.x-g.sx<-100)g.hz[i]=mkH(h.kind,g.sx,svgH);});
  var ld=g.req<=0, dead=g.el>=g.tl||!g.alive;
  if(dead)g.alive=false;
  return{levelDone:ld,dead:dead};
}
`;
