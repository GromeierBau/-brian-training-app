// Zuverlaessiger Mengen-Editor statt browserabhaengigem prompt().
(function(){
 let editingId=null;
 function ensureEditor(){
  if(document.getElementById('foodWeightEditor'))return;
  const box=document.createElement('div');box.id='foodWeightEditor';box.style.cssText='display:none;position:fixed;inset:0;z-index:50;background:rgba(0,0,0,.72);padding:20px;align-items:center;justify-content:center';
  box.innerHTML=`<div style="width:min(430px,100%);background:#1d2533;border:1px solid #354154;border-radius:18px;padding:18px"><h3 style="margin-top:0">Gewicht ändern</h3><div id="foodWeightName" class="muted" style="margin-bottom:12px"></div><label>Neue Menge in Gramm<input id="foodWeightInput" type="number" inputmode="decimal" step="1" min="1" style="margin-top:6px"></label><div class="actions" style="margin-top:14px"><button class="btn green" onclick="saveFoodWeight()">Übernehmen</button><button class="btn gray" onclick="closeFoodWeightEditor()">Abbrechen</button></div></div>`;
  document.body.appendChild(box);
 }
 window.changeWeight=function(id){
  ensureEditor();editingId=id;
  const x=foods.find(v=>String(v.id)===String(id));if(!x)return;
  document.getElementById('foodWeightName').textContent=x.name;
  const inp=document.getElementById('foodWeightInput');inp.value=+x.g||100;
  document.getElementById('foodWeightEditor').style.display='flex';
  setTimeout(()=>{inp.focus();inp.select();},80);
 };
 window.closeFoodWeightEditor=function(){const e=document.getElementById('foodWeightEditor');if(e)e.style.display='none';editingId=null;};
 window.saveFoodWeight=function(){
  const i=foods.findIndex(v=>String(v.id)===String(editingId)),inp=document.getElementById('foodWeightInput');if(i<0||!inp)return;
  const x=foods[i],old=+x.g||100,g=+String(inp.value).replace(',','.');if(!Number.isFinite(g)||g<=0)return;
  const m=g/old;foods[i]={...x,g,k:(+x.k||0)*m,p:(+x.p||0)*m,c:(+x.c||0)*m,f:(+x.f||0)*m,b:(+x.b||0)*m,s:(+x.s||0)*m};
  save();closeFoodWeightEditor();render();
 };
 ensureEditor();
})();