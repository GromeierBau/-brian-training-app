// Personal meal calculator + iPhone-safe barcode scanning.
(function(){
 const n=v=>+v||0,EXCLUDE=/grüner helfer|lavita|vitamin|supplement|kreatin|creatin|öl$|sauce$|dressing$/i;let selected=[];
 function pool(){const map={};Object.entries(allFoods()).forEach(([date,items])=>(items||[]).forEach(x=>{if(!x||!x.name||n(x.g)<=1||EXCLUDE.test(x.name.trim()))return;const z=normalizeItem(x),id=z.name.trim().toLowerCase();if(!z.k)return;if(!map[id])map[id]={...z,count:0,last:'',grams:[]};map[id].count++;map[id].last=date>map[id].last?date:map[id].last;map[id].grams.push(n(x.g));}));return Object.values(map).map(x=>{x.grams.sort((a,b)=>a-b);x.usual=x.grams[Math.floor(x.grams.length/2)]||100;return x;}).sort((a,b)=>b.last.localeCompare(a.last)||b.count-a.count);}
 function remainingNow(){const t=total();return{k:Math.max(0,GO.k-t.k),p:Math.max(0,GO.p-t.p),c:Math.max(0,GO.c-t.c),f:Math.max(0,GO.f-t.f),b:Math.max(0,GO.b-n(t.b))};}
 function scaled(x,g){const m=g/100;return{name:x.name,g,k:x.k*m,p:x.p*m,c:x.c*m,f:x.f*m,b:x.b*m,s:x.s*m};}
 function err(parts,r){const t=totalOf(parts);return Math.pow((t.k-r.k)/Math.max(250,r.k),2)*5+Math.pow((t.p-r.p)/Math.max(30,r.p),2)*4+Math.pow((t.c-r.c)/Math.max(40,r.c),2)*2.5+Math.pow(Math.max(0,t.f-r.f)/Math.max(10,r.f),2)*8+Math.pow(Math.max(0,t.k-r.k)/Math.max(200,r.k),2)*12;}
 function solve(){const r=remainingNow(),items=pool().filter(x=>selected.includes(x.name.toLowerCase()));if(!items.length)return null;let grams=items.map(x=>Math.max(20,Math.min(400,Math.round(x.usual/5)*5))),parts=items.map((x,i)=>scaled(x,grams[i])),best=err(parts,r);for(let pass=0;pass<8;pass++){let changed=false;for(let i=0;i<items.length;i++){let bg=grams[i],be=best;for(let g=20;g<=500;g+=5){const test=items.map((x,j)=>scaled(x,j===i?g:grams[j])),e=err(test,r);if(e<be){be=e;bg=g}}if(bg!==grams[i]){grams[i]=bg;parts=items.map((x,j)=>scaled(x,grams[j]));best=be;changed=true}}if(!changed)break}return{parts,r,t:totalOf(parts)}}
 function renderCalc(){const box=document.getElementById('mealCalc');if(!box)return;const q=solve();if(!q){box.innerHTML='<p class="muted">Wähle mindestens ein Lebensmittel aus.</p>';return}box.innerHTML=`<div class="suggestion"><b>Berechnete Mengen</b>${q.parts.map(p=>`<div style="padding:7px 0;border-bottom:1px solid #354154"><b>${Math.round(p.g)} g</b> ${p.name}</div>`).join('')}<div style="margin-top:10px">${Math.round(q.t.k)} kcal · ${Math.round(q.t.p)} g Eiweiß · ${Math.round(q.t.c)} g KH · ${Math.round(q.t.f)} g Fett</div><button class="btn green wide" style="margin-top:10px" onclick="addCalculatedMeal()">Alles so eintragen</button></div>`}
 window.toggleMealFood=function(id){id=decodeURIComponent(id);const i=selected.indexOf(id);if(i>=0)selected.splice(i,1);else selected.push(id);showHome()};
 window.addCalculatedMeal=function(){const q=solve();if(!q)return;q.parts.forEach((p,i)=>foods.push({id:Date.now()+i,name:p.name,g:p.g,k:p.k,p:p.p,c:p.c,f:p.f,b:p.b,s:p.s}));save();selected=[];show('food')};
 window.showHome=function(){updateRemaining();const r=remainingNow(),items=pool();document.getElementById('eatList').innerHTML=`<h3>Stell dir dein Essen zusammen</h3><p class="muted">Wähle aus, was du essen möchtest. Die App berechnet die passenden Gramm-Mengen.</p><div class="suggestion"><b>Lebensmittel auswählen</b><div style="display:grid;gap:7px;max-height:330px;overflow:auto;margin-top:9px">${items.slice(0,35).map(x=>{const id=x.name.toLowerCase(),on=selected.includes(id);return `<button class="btn ${on?'green':'gray'}" style="text-align:left" onclick="toggleMealFood('${encodeURIComponent(id)}')">${on?'✓ ':''}${x.name}<span style="display:block;font-size:11px;opacity:.75">zuletzt ${x.last} · ${x.count}× verwendet</span></button>`}).join('')}</div></div><div id="mealCalc"></div><p class="muted">Noch offen: ${Math.round(r.k)} kcal · ${Math.round(r.p)} g Eiweiß · ${Math.round(r.c)} g KH · ${Math.round(r.f)} g Fett · ${r.b.toFixed(1)} g Ballaststoffe</p>`;renderCalc()};

 // No live camera on iPhone: use the native camera/photo picker and decode the captured image.
 window.openScan=function(){
   show('scan');scanLocked=false;scannedProduct=null;
   const reader=document.getElementById('reader'),out=document.getElementById('br');
   reader.className='';reader.style.cssText='height:auto;background:transparent;border-radius:0;overflow:visible';
   reader.innerHTML='<div class="suggestion" style="margin:0"><b>Barcode fotografieren</b><p class="muted">Kamera öffnen und den Barcode möglichst groß und scharf fotografieren.</p><label class="btn green wide" style="display:block;text-align:center">Kamera öffnen<input id="barcodePhoto" type="file" accept="image/*" capture="environment" style="position:absolute;left:-9999px" onchange="scanBarcodePhoto(this)"></label></div>';
   out.innerHTML='';
 };
 window.scanBarcodePhoto=async function(input){
   const file=input.files&&input.files[0],out=document.getElementById('br');if(!file)return;
   out.innerHTML='<p class="muted">Barcode wird gelesen…</p>';
   try{
     if(typeof Html5Qrcode==='undefined')throw new Error('Scanner nicht geladen');
     let temp=document.getElementById('barcodeDecodeTarget');if(temp)temp.remove();
     temp=document.createElement('div');temp.id='barcodeDecodeTarget';temp.style.display='none';document.body.appendChild(temp);
     const q=new Html5Qrcode('barcodeDecodeTarget');const code=await q.scanFile(file,false);try{q.clear()}catch(e){}temp.remove();await window.lookup(code);
   }catch(e){out.innerHTML='<p class="mid">Barcode nicht erkannt. Bitte noch einmal näher und scharf fotografieren oder unten manuell eingeben.</p>';input.value=''}
 };
 window.lookup=async function(code){
   code=String(code||'').trim();if(!code)return;const out=document.getElementById('br');out.innerHTML='<p class="muted">Produkt wird gesucht…</p>';
   try{const r=await fetch('https://world.openfoodfacts.org/api/v2/product/'+encodeURIComponent(code)+'.json'),d=await r.json();if(!d.product)throw new Error();const p=d.product,u=p.nutriments||{};scannedProduct={name:p.product_name_de||p.product_name||'Produkt',k:+u['energy-kcal_100g']||0,p:+u.proteins_100g||0,c:+u.carbohydrates_100g||0,f:+u.fat_100g||0,b:+u.fiber_100g||0,s:+u.salt_100g||0};out.innerHTML=`<div class="suggestion"><b>${scannedProduct.name}</b><div class="muted">pro 100 g: ${Math.round(scannedProduct.k)} kcal · ${scannedProduct.p.toFixed(1)} g Eiweiß · ${scannedProduct.c.toFixed(1)} g KH · ${scannedProduct.f.toFixed(1)} g Fett</div><label>Menge g<input id="scanGrams" type="number" value="100"></label><button class="btn green" onclick="addScanned()">Hinzufügen</button></div>`}catch(e){out.innerHTML='<p class="mid">Produkt nicht gefunden.</p>'}
 };

 const basic=document.createElement('script');basic.src='basic-foods.js?v=20260811-3';document.head.appendChild(basic);
})();