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
    {name:'Süßsauer Sauce',portion:'30 g',today:true,verified:true,g:30,k:49,p:0.1,c:11,f:0.3,b:0.4,s:0.31},
    {name:'Barbecue Sauce',portion:'25 ml'},
    {name:'Senf Sauce',portion:'25 ml'},
    {name:'Balsamico Dressing',portion:'30 ml',today:true,verified:true,g:30,k:22.5,p:0.06,c:3.24,f:0.84,b:0,s:0.57},
    {name:'Honig-Senf Dressing',portion:'50 ml'},
    {name:'Sour Cream-Schnittlauch Dip',portion:'25 ml',today:true},
    {name:'Spicy Bali Style Sauce',portion:'29 g',today:true,verified:true,g:29,k:43,p:0.4,c:8.4,f:0.6,b:0.3,s:0.64}
  ]
};

// Ziele aus "90 Tage Challenge.xlsx".
// Eingaben: 88,8 kg, 1,88 m, 40 Jahre, Aktivitätsfaktor 1,5, Defizitfaktor 0,8.
// Tabellenlogik: Idealgewicht = Größe*100-100; Protein = Idealgewicht*2,4;
// Fett = 25 % der Zielkalorien / 9,3; Kohlenhydrate = Restkalorien / 4,1.
window.CHALLENGE_GOALS={
  calories:2472.614928,
  protein:211.2,
  fat:66.4681432258065,
  carbs:241.107608780488,
  basal:2060.51244,
  maintenance:3090.76866,
  weight:88.8,
  height:1.88,
  age:40,
  activity:1.5,
  deficit:0.8,
  idealWeight:88
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

  const g=window.CHALLENGE_GOALS;
  const calorieLabel=document.querySelector('#dk + .muted');
  const proteinLabel=document.querySelector('#dp + .muted');
  if(calorieLabel)calorieLabel.textContent='von '+Math.round(g.calories);
  if(proteinLabel)proteinLabel.textContent='Ziel '+Math.round(g.protein)+' g';
  const dcBox=document.getElementById('dc')?.parentElement;
  const dfBox=document.getElementById('df')?.parentElement;
  if(dcBox&&!dcBox.querySelector('.challengeTarget'))dcBox.insertAdjacentHTML('beforeend',`<span class="muted challengeTarget">Ziel ${Math.round(g.carbs)} g</span>`);
  if(dfBox&&!dfBox.querySelector('.challengeTarget'))dfBox.insertAdjacentHTML('beforeend',`<span class="muted challengeTarget">Ziel ${g.fat.toFixed(1)} g</span>`);

  const originalRender=window.render;
  window.render=function(){
    originalRender();
    const t=total();
    if(window.bk)bk.style.width=Math.min(100,t.k/g.calories*100)+'%';
    if(window.bp)bp.style.width=Math.min(100,t.p/g.protein*100)+'%';
  };

  window.updateRemaining=function(){
    const t=total();
    remaining.innerHTML=`<div class="grid"><div class="metric"><span class="muted">Noch frei</span><b>${Math.max(0,Math.round(g.calories-t.k))} kcal</b></div><div class="metric"><span class="muted">Eiweiß offen</span><b>${Math.max(0,Math.round(g.protein-t.p))} g</b></div><div class="metric"><span class="muted">KH offen</span><b>${Math.max(0,Math.round(g.carbs-t.c))} g</b></div><div class="metric"><span class="muted">Fett offen</span><b>${Math.max(0,(g.fat-t.f)).toFixed(0)} g</b></div></div>`;
  };

  window.showHome=function(){
    updateRemaining();
    const t=total(),rk=Math.max(0,g.calories-t.k),rp=Math.max(0,g.protein-t.p);
    const list=HOME.map((x,i)=>({...x,i,score:(x.k<=rk?100:0)+Math.min(x.p,rp)*2})).sort((a,b)=>b.score-a.score);
    eatList.innerHTML='<h3>Zu Hause</h3>'+list.map((x,j)=>`<div class="suggestion"><b>${j===0?'Beste Wahl: ':''}${x.name}</b><div>${x.k} kcal · ${x.p} g Eiweiß</div><button class="btn green" style="margin-top:8px" onclick="addFixed(HOME[${x.i}])">Eintragen</button></div>`).join('');
  };

  render();
});