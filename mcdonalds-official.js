// McDonald's Deutschland Produktkatalog, aktualisiert 2026-08-09.
// Nährwerte mit verified:true stammen direkt aus McDonald's Deutschland bzw. der McDonald's-Verpackung.
window.MCD_OFFICIAL={
  mains:[
    {name:'20 Garlic Pepper Chicken McNuggets',type:'Nuggets',source:'McDonald’s Deutschland',today:true,verified:true,g:380,k:969,p:55,c:77,f:49,b:1.9,s:7.3},
    {name:'20 Chicken McNuggets®',type:'Nuggets',source:'McDonald’s Deutschland',verified:true,g:363,k:892,p:54,c:60,f:47,b:4.1,s:3.7},
    {name:'9 Chicken McNuggets®',type:'Nuggets',source:'McDonald’s Deutschland'},
    {name:'6 Chicken McNuggets®',type:'Nuggets',source:'McDonald’s Deutschland'},
    {name:'Double Cheeseburger',type:'Burger',source:'McDonald’s Deutschland',today:true,verified:true,g:179,k:460,p:27,c:31,f:25,b:2.4,s:2.4},
    {name:'Big Tasty® Bacon',type:'Burger',source:'McDonald’s Deutschland',verified:true,g:359,k:912,p:49,c:51,f:57,b:2.4,s:4.0},
    {name:'McWrap® Chicken Greek-Style',type:'Wrap',source:'McDonald’s Deutschland'},
    {name:'McWrap® Chicken Honig-Senf',type:'Wrap',source:'McDonald’s Deutschland'},
    {name:'McWrap® Chicken Creamy Chipotle',type:'Wrap',source:'McDonald’s Deutschland'},
    {name:'McWrap® Veggie Greek-Style',type:'Wrap',source:'McDonald’s Deutschland'},
    {name:'McWrap® Veggie Honig-Senf',type:'Wrap',source:'McDonald’s Deutschland'},
    {name:'McWrap® Veggie Creamy Chipotle',type:'Wrap',source:'McDonald’s Deutschland'},
    {name:'Big Chicken Salad',type:'Salat',source:'McDonald’s Deutschland',today:true,verified:true,g:271,k:280,p:14,c:19,f:15,b:4.5,s:1.1},
    {name:'Big Veggie Salad',type:'Salat',source:'McDonald’s Deutschland'},
    {name:'Snack Salad',type:'Salat',source:'McDonald’s Deutschland',today:true,verified:true,g:124,k:21,p:1.1,c:3.1,f:0.2,b:1.2,s:0.03}
  ],
  sauces:[
    {name:'Curry Sauce',portion:'25 ml'},
    {name:'Süßsauer Sauce',portion:'25 ml',today:true},
    {name:'Barbecue Sauce',portion:'25 ml'},
    {name:'Senf Sauce',portion:'25 ml'},
    {name:'Balsamico Dressing',portion:'30 ml',today:true,verified:true,g:30,k:22.5,p:0.06,c:3.24,f:0.84,b:0,s:0.57},
    {name:'Honig-Senf Dressing',portion:'50 ml'},
    {name:'Sour Cream-Schnittlauch Dip',portion:'25 ml',today:true},
    {name:'Spicy Bali Style Sauce',portion:'29 g',today:true,verified:true,g:29,k:43,p:0.4,c:8.4,f:0.6,b:0.3,s:0.64}
  ]
};

// Die Hauptseite hatte bisher eine alte McDonald's-Anzeige, die verified-Werte ignoriert hat.
// Nach dem Laden ersetzen wir diese Anzeige und machen verifizierte Produkte direkt eintragbar.
window.addEventListener('load',()=>{
  window.addMcDItem=function(group,index){
    const cat=window.MCD_OFFICIAL||{mains:[],sauces:[]};
    const x=(cat[group]||[])[index];
    if(!x||!x.verified)return;
    foods.push({id:Date.now(),name:x.name,g:x.g,k:x.k,p:x.p,c:x.c,f:x.f,b:x.b||0,s:x.s||0});
    save();render();updateRemaining();showMcD();
  };
  window.showMcD=function(){
    updateRemaining();
    const cat=window.MCD_OFFICIAL||{mains:[],sauces:[]};
    const card=(x,group,i)=>`<div class="mcdItem"><b>${x.name}</b><div class="muted">${x.type||('Portion: '+x.portion)}${x.source?' · '+x.source:''}</div>${x.verified?`<span class="tag">Offizielle Nährwerte</span><div class="ok" style="margin-top:7px"><b>${Math.round(x.k)} kcal · ${(+x.p).toFixed(1)} g Eiweiß</b></div><div class="muted">${(+x.c).toFixed(1)} g KH · ${(+x.f).toFixed(1)} g Fett · ${(+x.b||0).toFixed(1)} g Ballaststoffe · ${(+x.g).toFixed(0)} g Portion</div><button class="btn green" style="margin-top:9px" onclick="addMcDItem('${group}',${i})">Eintragen</button>`:`<span class="tag">Offiziell gelistet</span><div class="warn" style="margin-top:6px">Nährwerte noch nicht hinterlegt</div>`}</div>`;
    eatList.innerHTML=`<h3>McDonald's Deutschland</h3><p class="muted">Verifizierte Produkte zeigen die offiziellen Portionswerte und können direkt eingetragen werden.</p><h4>Produkte</h4>${cat.mains.map((x,i)=>card(x,'mains',i)).join('')}<h4 style="margin-top:18px">Saucen & Dressings</h4>${cat.sauces.map((x,i)=>card(x,'sauces',i)).join('')}`;
  };
});