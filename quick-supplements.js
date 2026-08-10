// Feste Schnell-Eintraege, getrennt von der Haupt-App.
window.GREEN_HELPER={name:'Grüner Helfer',g:7,k:19.084,p:1.021,c:1.914,f:0.148,b:3.246,s:0.0026};
window.LAVITA={name:'LaVita',g:10,k:24,p:0.26,c:4.9,f:0.32,b:2.6,s:0.1};
window.addEventListener('load',()=>{
 const addQuick=x=>{foods.push({id:Date.now(),name:x.name,g:x.g,k:x.k,p:x.p,c:x.c,f:x.f,b:x.b,s:x.s});save();render();};
 window.addGreenHelper=()=>addQuick(window.GREEN_HELPER); window.addLaVita=()=>addQuick(window.LAVITA);
 const h=[...document.querySelectorAll('.card h3')].find(x=>x.textContent.trim()==='Schnell eintragen'); if(!h)return;
 const card=h.closest('.card'), row=document.createElement('div'); row.className='grid'; row.style.marginTop='10px';
 row.innerHTML='<button class="btn green" onclick="addGreenHelper()">Grüner Helfer +7 g</button><button class="btn blue" onclick="addLaVita()">LaVita +10 ml</button>'; card.appendChild(row);
});