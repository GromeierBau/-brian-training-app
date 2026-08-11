// Basis-Lebensmittel fuer die normale Lebensmittelsuche. Werte je 100 g.
window.BASIC_FOODS=[
{name:'Tomate, roh',aliases:['tomate','tomaten'],k:18,p:.9,c:3.9,f:.2,b:1.2,s:.01},
{name:'Kartoffel, gekocht',aliases:['kartoffel','kartoffeln'],k:77,p:2,c:17,f:.1,b:1.8,s:.01},
{name:'Banane, roh',aliases:['banane','bananen'],k:89,p:1.1,c:22.8,f:.3,b:2.6,s:0},
{name:'Himbeeren, roh',aliases:['himbeere','himbeeren'],k:52,p:1.2,c:11.9,f:.7,b:6.5,s:0},
{name:'Apfel, roh',aliases:['apfel','aepfel','äpfel'],k:52,p:.3,c:13.8,f:.2,b:2.4,s:0},
{name:'Gurke, roh',aliases:['gurke','salatgurke'],k:15,p:.7,c:3.6,f:.1,b:.5,s:.01},
{name:'Paprika, rot, roh',aliases:['paprika','rote paprika'],k:31,p:1,c:6,f:.3,b:2.1,s:.01},
{name:'Brokkoli, roh',aliases:['brokkoli'],k:34,p:2.8,c:6.6,f:.4,b:2.6,s:.03},
{name:'Karotte, roh',aliases:['karotte','karotten','moehre','möhre','möhren'],k:41,p:.9,c:9.6,f:.2,b:2.8,s:.17},
{name:'Wassermelone, roh',aliases:['wassermelone'],k:30,p:.6,c:7.6,f:.2,b:.4,s:0},
{name:'Skyr natur',aliases:['skyr','skyr natur'],k:63,p:11,c:4,f:.2,b:0,s:.1},
{name:'Magerquark',aliases:['magerquark','quark'],k:67,p:12,c:4,f:.2,b:0,s:.1},
{name:'Hähnchenbrust, roh',aliases:['hähnchen','haehnchen','hähnchenbrust','haehnchenbrust'],k:110,p:23,c:0,f:1.2,b:0,s:.12},
{name:'Rinderhackfleisch, mager, roh',aliases:['rinderhack','rinderhackfleisch','hackfleisch rind'],k:176,p:21,c:0,f:10,b:0,s:.16},
{name:'Rindersteak, roh',aliases:['rindfleisch','rindersteak','steak'],k:158,p:22,c:0,f:7.5,b:0,s:.12},
{name:'Ei, Hühnerei',aliases:['ei','eier','hühnerei','huehnerei'],k:143,p:12.6,c:.7,f:9.5,b:0,s:.36},
{name:'Reis, gekocht',aliases:['reis','reis gekocht'],k:130,p:2.7,c:28.2,f:.3,b:.4,s:0},
{name:'Haferflocken',aliases:['haferflocken','hafer'],k:372,p:13.5,c:58.7,f:7,b:10,s:.01}
];
window.addEventListener('load',()=>{
  const clean=s=>String(s||'').toLowerCase().trim();
  const basicMatches=q=>{const x=clean(q);return (window.BASIC_FOODS||[]).filter(f=>f.aliases.some(a=>clean(a)===x)||f.aliases.some(a=>clean(a).includes(x)||x.includes(clean(a))));};
  window.searchFood=async function(){
    const q=sq.value.trim();if(!q)return;
    sr.innerHTML='<p class="muted">Suche…</p>';
    const basic=basicMatches(q),own=typeof customResults==='function'?customResults(q):[];
    let ext=[];
    try{
      const r=await fetch('https://world.openfoodfacts.org/cgi/search.pl?search_terms='+encodeURIComponent(q)+'&search_simple=1&action=process&json=1&page_size=10'),d=await r.json();
      ext=(d.products||[]).filter(p=>p.product_name&&p.nutriments).map(p=>{const n=p.nutriments||{};return{name:p.product_name_de||p.product_name,k:+n['energy-kcal_100g']||0,p:+n.proteins_100g||0,c:+n.carbohydrates_100g||0,f:+n.fat_100g||0,b:+n.fiber_100g||0,s:+n.salt_100g||0}}).filter(x=>x.k);
    }catch(e){}
    const seen=new Set();window.results=[...basic,...own,...ext].filter(x=>{const k=clean(x.name);if(seen.has(k))return false;seen.add(k);return true}).slice(0,12);
    sr.innerHTML=window.results.length?window.results.map((x,i)=>`<div class="suggestion"><b>${x.name}</b><div>${Math.round(x.k)} kcal · ${(+x.p||0).toFixed(1)} g Eiweiß · ${(+x.c||0).toFixed(1)} g KH · ${(+x.f||0).toFixed(1)} g Fett /100 g</div><button class="btn ${i<basic.length?'green':''}" onclick="addProduct(${i})">Auswählen</button></div>`).join(''):'<p class="muted">Kein passendes Lebensmittel gefunden.</p>';
  };
  if(!document.querySelector('script[data-weight-editor]')){const s=document.createElement('script');s.src='weight-editor.js?v=20260811-1';s.dataset.weightEditor='1';document.head.appendChild(s);}
});