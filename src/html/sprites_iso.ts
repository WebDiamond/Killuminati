export const SPRITES_ISO_JS = `
/* ---- Canvas 2D isometric placeholder sprites ---- */
function makeTex(w,h,fn){var c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'));return new THREE.CanvasTexture(c);}

function drawIsoPlayer(ctx,frame){
  var wa=Math.sin(frame*0.6)*16,bob=Math.sin(frame*0.3)*2;
  /* Dragon faces upper-right (-0.7 rad ≈ 40° above horizontal)
     = iso scroll direction where enemies come from */
  var tilt=-0.7;
  var cx=38,cy=36+bob;
  var hx=cx+28,hy=cy-24; /* head: upper-right */
  var tx=cx-24,ty2=cy+18; /* tail: lower-left */
  // Ground shadow
  ctx.fillStyle='rgba(0,0,0,0.2)';
  ctx.beginPath();ctx.ellipse(cx+4,cy+12,22,5,tilt+Math.PI/2,0,Math.PI*2);ctx.fill();
  // Lower wing (perpendicular lower side, flaps down)
  ctx.save();ctx.translate(cx,cy);ctx.rotate(tilt+Math.PI/2+wa*0.7*Math.PI/180);
  ctx.fillStyle='rgba(40,140,55,0.55)';
  ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(8,18,4,24);ctx.quadraticCurveTo(-4,16,-4,8);ctx.closePath();ctx.fill();
  ctx.restore();
  // Upper wing (perpendicular upper side, flaps up)
  ctx.save();ctx.translate(cx,cy);ctx.rotate(tilt-Math.PI/2-wa*Math.PI/180);
  ctx.fillStyle='rgba(58,170,74,0.82)';
  ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(-8,-24,-4,-30);ctx.quadraticCurveTo(6,-18,6,-10);ctx.closePath();ctx.fill();
  ctx.restore();
  // Body
  ctx.fillStyle='#2d9940';
  ctx.beginPath();ctx.ellipse(cx,cy,16,9,tilt,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#3ab84e';
  ctx.beginPath();ctx.ellipse(cx,cy+1,12,6,tilt,0,Math.PI*2);ctx.fill();
  // Neck (toward upper-right)
  ctx.fillStyle='#2d9940';
  ctx.beginPath();ctx.ellipse(cx+16,cy-12,8,6,tilt*0.8,0,Math.PI*2);ctx.fill();
  // Head (upper-right, where enemies are)
  ctx.fillStyle='#2d9940';
  ctx.beginPath();ctx.ellipse(hx,hy,9,7,tilt*0.6,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#3ab84e';
  ctx.beginPath();ctx.ellipse(hx+2,hy-1,6,4,tilt*0.6,0,Math.PI*2);ctx.fill();
  // Eye
  ctx.fillStyle='#fffff0';ctx.beginPath();ctx.ellipse(hx+4,hy-5,3,2.5,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#cc3300';ctx.beginPath();ctx.ellipse(hx+4.5,hy-5,1.8,2.2,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#1a0000';ctx.beginPath();ctx.arc(hx+4.5,hy-5,1,0,Math.PI*2);ctx.fill();
  // Flame (upper-right = toward enemies)
  var br=0.4+Math.sin(frame*0.4)*0.3;
  var fg=ctx.createRadialGradient(hx+14,hy-12,1,hx+12,hy-10,12);
  fg.addColorStop(0,'rgba(255,240,60,'+br+')');
  fg.addColorStop(0.5,'rgba(255,120,20,'+(br*0.7)+')');
  fg.addColorStop(1,'rgba(255,80,0,0)');
  ctx.fillStyle=fg;ctx.beginPath();ctx.ellipse(hx+12,hy-10,12+br*5,3+br,tilt*0.5,0,Math.PI*2);ctx.fill();
  // Tail (lower-left, opposite direction)
  ctx.strokeStyle='#2a8a3a';ctx.lineWidth=2.5;ctx.lineCap='round';
  ctx.beginPath();ctx.moveTo(tx+8,ty2-6);ctx.quadraticCurveTo(tx-2,ty2+Math.sin(frame*0.32)*6,tx+2,ty2+4);ctx.stroke();
}

var PYR_ISO_COLS=[['#6a9a4a','#3a6a2a','#4a8a3a'],['#8a7a3a','#5a4a1a','#7a6a2a'],['#4a7a5a','#2a4a3a','#3a6a4a'],['#7a6a4a','#4a3a1a','#6a5a3a'],['#3a8a6a','#1a5a3a','#2a7a5a']];
function drawIsoLoominadi(ctx,frame,variant){
  var bob=Math.sin(frame*0.4)*2.5,c=PYR_ISO_COLS[variant%5],cx=32,cy=6+bob;
  // Shadow
  ctx.fillStyle='rgba(0,0,0,0.18)';
  ctx.beginPath();ctx.ellipse(cx,cy+42,14,4,0,0,Math.PI*2);ctx.fill();
  // Left face
  ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx-20,cy+24);ctx.lineTo(cx,cy+32);ctx.closePath();
  ctx.fillStyle=c[1];ctx.fill();ctx.strokeStyle='rgba(0,0,0,0.45)';ctx.lineWidth=1;ctx.stroke();
  // Right face
  ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+20,cy+24);ctx.lineTo(cx,cy+32);ctx.closePath();
  ctx.fillStyle=c[2];ctx.fill();ctx.stroke();
  // Top highlight
  ctx.beginPath();ctx.moveTo(cx-5,cy+6);ctx.lineTo(cx+5,cy+6);ctx.lineTo(cx,cy);ctx.closePath();
  ctx.fillStyle=c[0];ctx.fill();
  // Eye
  var ex=cx+Math.cos(frame*0.5)*2,ey=cy+20+Math.sin(frame*0.7)*1.5;
  ctx.fillStyle='#fffff0';ctx.beginPath();ctx.ellipse(ex,ey,3.5,3,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#1a1a0a';ctx.beginPath();ctx.arc(ex,ey,1.5,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(255,255,200,0.8)';ctx.beginPath();ctx.arc(ex-0.5,ey-0.8,0.6,0,Math.PI*2);ctx.fill();
}

function drawIsoCadooceadis(ctx,t){
  var bob=Math.sin(t*1.5)*3,cx=32,cy=8+bob;
  // Shadow
  ctx.fillStyle='rgba(0,0,0,0.18)';
  ctx.beginPath();ctx.ellipse(cx,cy+52,12,4,0,0,Math.PI*2);ctx.fill();
  // Orbiting particles
  var p1x=Math.cos(t*2.5)*13+cx,p1y=Math.sin(t*3)*9+cy+10;
  var p2x=Math.cos(t*1.8+2)*15+cx,p2y=Math.sin(t*2.2+1)*7+cy+10;
  ctx.fillStyle='rgba(180,180,240,0.65)';ctx.beginPath();ctx.arc(p1x,p1y,2,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(200,200,255,0.5)';ctx.beginPath();ctx.arc(p2x,p2y,1.5,0,Math.PI*2);ctx.fill();
  // Staff
  ctx.strokeStyle='#9a9aaa';ctx.lineWidth=2.5;
  ctx.beginPath();ctx.moveTo(cx,cy+18);ctx.lineTo(cx,cy+50);ctx.stroke();
  // Coils
  ctx.strokeStyle='#aaaacc';ctx.lineWidth=1.3;
  ctx.beginPath();ctx.moveTo(cx-5,cy+22);ctx.quadraticCurveTo(cx+8,cy+28,cx-5,cy+34);ctx.quadraticCurveTo(cx+8,cy+40,cx,cy+48);ctx.stroke();
  ctx.strokeStyle='#7a7a9a';
  ctx.beginPath();ctx.moveTo(cx+5,cy+22);ctx.quadraticCurveTo(cx-8,cy+28,cx+5,cy+34);ctx.quadraticCurveTo(cx-8,cy+40,cx,cy+48);ctx.stroke();
  // Orb
  var og=ctx.createRadialGradient(cx-5,cy+2,2,cx,cy+8,16);
  og.addColorStop(0,'#d0d0f0');og.addColorStop(0.4,'#8888c0');og.addColorStop(1,'#202050');
  ctx.beginPath();ctx.ellipse(cx,cy+8,14,11,0,0,Math.PI*2);ctx.fillStyle=og;ctx.fill();
  ctx.strokeStyle='#a0a0d0';ctx.lineWidth=1.2;ctx.stroke();
  // Orb highlight
  ctx.fillStyle='rgba(255,255,255,0.38)';
  ctx.beginPath();ctx.ellipse(cx-4,cy+4,5,3.5,-0.5,0,Math.PI*2);ctx.fill();
  // Cap
  ctx.strokeStyle='#8a8a9a';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.arc(cx,cy-4,3.5,0,Math.PI*2);ctx.stroke();
}

function drawIsoGem(ctx,t){
  var pulse=0.55+Math.sin(t*5)*0.45,bob=Math.sin(t*3)*2.5,cx=24,cy=8+bob;
  // Glow
  var grd=ctx.createRadialGradient(cx,cy+10,1,cx,cy+10,20);
  grd.addColorStop(0,'rgba(100,230,255,'+pulse+')');
  grd.addColorStop(1,'rgba(20,80,200,0)');
  ctx.fillStyle=grd;ctx.beginPath();ctx.arc(cx,cy+10,20,0,Math.PI*2);ctx.fill();
  // Shadow
  ctx.fillStyle='rgba(0,30,100,0.18)';
  ctx.beginPath();ctx.ellipse(cx,cy+32,10,3.5,0,0,Math.PI*2);ctx.fill();
  // Left facet
  ctx.fillStyle='rgba(30,130,215,'+(0.7+pulse*0.2)+')';
  ctx.strokeStyle='rgba(150,230,255,0.8)';ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(cx-12,cy+8);ctx.lineTo(cx,cy+16);ctx.lineTo(cx,cy+28);ctx.lineTo(cx-10,cy+20);ctx.closePath();ctx.fill();ctx.stroke();
  // Right facet
  ctx.fillStyle='rgba(50,160,235,'+(0.65+pulse*0.2)+')';
  ctx.beginPath();ctx.moveTo(cx+12,cy+8);ctx.lineTo(cx,cy+16);ctx.lineTo(cx,cy+28);ctx.lineTo(cx+10,cy+20);ctx.closePath();ctx.fill();ctx.stroke();
  // Top face
  ctx.fillStyle='rgba(90,205,255,'+(0.75+pulse*0.25)+')';
  ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+12,cy+8);ctx.lineTo(cx,cy+16);ctx.lineTo(cx-12,cy+8);ctx.closePath();ctx.fill();ctx.stroke();
  // Inner highlight
  ctx.fillStyle='rgba(210,252,255,'+pulse+')';
  ctx.beginPath();ctx.moveTo(cx,cy+2);ctx.lineTo(cx+5,cy+7);ctx.lineTo(cx,cy+11);ctx.lineTo(cx-5,cy+7);ctx.closePath();ctx.fill();
  // Sparkle
  ctx.save();ctx.translate(cx,cy+12);ctx.rotate(t*2.5);
  var sp=13+Math.sin(t*8)*2;
  ctx.strokeStyle='rgba(255,255,255,'+pulse+')';ctx.lineWidth=0.9;
  ctx.beginPath();ctx.moveTo(-sp,0);ctx.lineTo(sp,0);ctx.stroke();
  ctx.beginPath();ctx.moveTo(0,-sp);ctx.lineTo(0,sp);ctx.stroke();
  ctx.restore();
}

function drawIsoFireball(ctx,frame){
  var fl=Math.sin(frame*0.8)*2.5;
  ctx.save();ctx.translate(16,10);
  var g=ctx.createRadialGradient(0,0,0,0,0,9+fl);
  g.addColorStop(0,'rgba(255,240,150,1)');
  g.addColorStop(0.4,'rgba(255,160,30,0.9)');
  g.addColorStop(1,'rgba(255,80,0,0)');
  ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,9+fl,6+fl*0.4,-0.3,0,Math.PI*2);ctx.fill();
  ctx.restore();
}

function drawIsoBomb(ctx,t){
  var p=0.7+Math.sin(t*3)*0.3;
  ctx.save();ctx.translate(15,18);
  ctx.fillStyle='rgba(180,40,30,'+p+')';ctx.strokeStyle='#4a1a10';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.ellipse(0,2,9,7,0,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.fillStyle='rgba(0,0,0,0.2)';
  ctx.beginPath();ctx.ellipse(3,4,6,4.5,0,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#6a4a2a';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(2,-5);ctx.lineTo(5,-11);ctx.stroke();
  ctx.fillStyle='rgba(255,200,50,'+p+')';ctx.beginPath();ctx.arc(5,-12,2.5,0,Math.PI*2);ctx.fill();
  ctx.restore();
}

function drawIsoShuriken(ctx){
  ctx.save();ctx.translate(15,15);
  ctx.fillStyle='#3a3a3a';ctx.strokeStyle='#1a1a1a';ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(0,-12);ctx.lineTo(3,-3);ctx.lineTo(12,0);ctx.lineTo(3,3);ctx.lineTo(0,12);ctx.lineTo(-3,3);ctx.lineTo(-12,0);ctx.lineTo(-3,-3);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.fillStyle='#5a5a5a';ctx.beginPath();ctx.arc(0,0,2.5,0,Math.PI*2);ctx.fill();
  ctx.restore();
}

function drawBoom(ctx,progress){
  var r=5+progress*22,o=1-progress;
  ctx.save();ctx.translate(20,20);
  ctx.fillStyle='rgba(255,200,50,'+(o*0.6)+')';ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(255,120,20,'+(o*0.8)+')';ctx.beginPath();ctx.arc(0,0,r*0.6,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(255,255,200,'+o+')';ctx.beginPath();ctx.arc(0,0,r*0.3,0,Math.PI*2);ctx.fill();
  ctx.restore();
}

function drawIsoBgTile(ctx){
  ctx.fillStyle='#07090a';ctx.fillRect(0,0,80,40);
  ctx.beginPath();ctx.moveTo(40,0);ctx.lineTo(80,20);ctx.lineTo(40,40);ctx.lineTo(0,20);ctx.closePath();
  ctx.fillStyle='#0b0f0d';ctx.fill();
  ctx.strokeStyle='#161e18';ctx.lineWidth=0.7;ctx.stroke();
  ctx.strokeStyle='#0e1510';ctx.lineWidth=0.35;
  ctx.beginPath();ctx.moveTo(40,8);ctx.lineTo(72,24);ctx.lineTo(40,32);ctx.lineTo(8,24);ctx.closePath();ctx.stroke();
}

var TEX_ISO={};
function buildIsoTextures(){
  var f,v;
  TEX_ISO.player=[];
  for(f=0;f<8;f++){var pf=f;TEX_ISO.player.push(makeTex(88,60,function(ctx){drawIsoPlayer(ctx,pf);}));}
  TEX_ISO.loominadi=[];
  for(v=0;v<5;v++){TEX_ISO.loominadi.push([]);for(f=0;f<4;f++){var lf=f,lv=v;TEX_ISO.loominadi[v].push(makeTex(64,52,function(ctx){drawIsoLoominadi(ctx,lf,lv);}));}}
  TEX_ISO.cadooceadis=[];
  for(f=0;f<8;f++){var cf=f;TEX_ISO.cadooceadis.push(makeTex(64,60,function(ctx){drawIsoCadooceadis(ctx,cf*0.4);}));}
  TEX_ISO.cadooceadisDamaged=[];
  for(f=0;f<8;f++){var cdf=f;TEX_ISO.cadooceadisDamaged.push(makeTex(64,60,function(ctx){drawIsoCadooceadis(ctx,cdf*0.4);ctx.globalCompositeOperation='source-atop';ctx.fillStyle='rgba(220,40,40,0.5)';ctx.fillRect(0,0,64,60);ctx.globalCompositeOperation='source-over';}));}
  TEX_ISO.gem=[];
  for(f=0;f<8;f++){var gf=f;TEX_ISO.gem.push(makeTex(48,44,function(ctx){drawIsoGem(ctx,gf*0.35);}));}
  TEX_ISO.fireball=[];
  for(f=0;f<4;f++){var ff=f;TEX_ISO.fireball.push(makeTex(32,20,function(ctx){drawIsoFireball(ctx,ff);}));}
  TEX_ISO.bomb=[];
  for(f=0;f<4;f++){var bf=f;TEX_ISO.bomb.push(makeTex(30,36,function(ctx){drawIsoBomb(ctx,bf*0.8);}));}
  TEX_ISO.shuriken=makeTex(30,30,function(ctx){drawIsoShuriken(ctx);});
  TEX_ISO.bg=makeTex(80,40,function(ctx){drawIsoBgTile(ctx);});
  TEX_ISO.bg.wrapS=TEX_ISO.bg.wrapT=THREE.RepeatWrapping;
}
`;
