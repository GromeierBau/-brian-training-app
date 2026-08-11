// Compact dashboard enhancement for Brians Training & Ernährung
(function () {
  function applyCompactDashboard() {
    const dash = document.getElementById('dash');
    if (!dash || document.getElementById('compact-dashboard-style')) return;

    const style = document.createElement('style');
    style.id = 'compact-dashboard-style';
    style.textContent = `
      #dash > .card:first-child{padding:12px 14px;margin-bottom:10px}
      #dash > .card:first-child h3{margin:0 0 10px;font-size:20px}
      #dash > .card:first-child .grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
      #dash > .card:first-child .metric{padding:9px 11px;min-height:72px;display:flex;flex-wrap:wrap;align-content:center;column-gap:7px}
      #dash > .card:first-child .metric .muted:first-child{width:100%;font-size:13px}
      #dash > .card:first-child .metric b{font-size:21px;line-height:1.05;display:inline;margin:2px 0}
      #dash > .card:first-child .metric .muted:last-child{font-size:13px;align-self:center;margin-top:3px}
      #dash > .card:first-child h4{display:none}
      #dash > .card:first-child > .bar{display:none}
      #compact-bars{margin-top:10px;display:grid;gap:6px}
      .compact-bar-row{display:grid;grid-template-columns:92px 1fr;gap:8px;align-items:center;font-size:13px}
      .compact-bar-row .bar{height:7px}
      #dash > .card:nth-child(2){padding:9px 12px;margin-bottom:10px}
      #dash > .card:nth-child(2) .wide{padding:12px;font-size:16px}
      #dash > .card:nth-child(3){padding:12px 14px}
      #dash > .card:nth-child(3) h3{margin:0 0 9px;font-size:19px}
      @media(max-width:430px){header{padding:12px 14px}header h2{font-size:20px}header .muted{font-size:13px}main{padding:10px}.card{border-radius:16px}}
    `;
    document.head.appendChild(style);

    const card = dash.querySelector('.card');
    const grid = card && card.querySelector('.grid');
    if (!card || !grid) return;

    const metric = (label, valueId, targetId, targetText) => {
      const el = document.createElement('div');
      el.className = 'metric';
      el.innerHTML = `<span class="muted">${label}</span><b id="${valueId}">0</b><span class="muted" id="${targetId}">${targetText}</span>`;
      return el;
    };

    if (!document.getElementById('db')) grid.appendChild(metric('Ballaststoffe','db','dbt','von 30 g'));
    if (!document.getElementById('d46')) grid.appendChild(metric('46er-Check','d46','d46t','erreicht'));

    const bars = document.createElement('div');
    bars.id = 'compact-bars';
    bars.innerHTML = [
      ['Kalorien','cbk','#ef4444'],['Eiweiß','cbp','#22c55e'],['KH','cbc','#3b82f6'],['Fett','cbf','#f59e0b'],['Ballaststoffe','cbb','#a78bfa']
    ].map(([n,id,c])=>`<div class="compact-bar-row"><span>${n}</span><div class="bar"><span id="${id}" style="background:${c};width:0"></span></div></div>`).join('');
    card.appendChild(bars);

    const originalRender = window.render;
    window.render = function () {
      originalRender();
      updateCompact();
    };

    function updateCompact() {
      if (typeof total !== 'function' || typeof GO === 'undefined') return;
      const t = total();
      const setText = (id, text) => { const e=document.getElementById(id); if(e)e.textContent=text; };
      const setWidth = (id, value, goal) => { const e=document.getElementById(id); if(e)e.style.width=Math.min(100,Math.max(0,value/goal*100))+'%'; };
      setText('db', (t.b||0).toFixed(1)+' g');
      setText('dbt', 'von '+GO.b+' g');
      const nutrientGoals = [GO.p,GO.c,GO.f,GO.b];
      const nutrientValues = [t.p,t.c,t.f,t.b];
      const reached = nutrientValues.filter((v,i)=>v>=nutrientGoals[i]*0.9).length;
      setText('d46', reached+' / 46');
      setText('d46t', 'erreicht');
      setWidth('cbk',t.k,GO.k); setWidth('cbp',t.p,GO.p); setWidth('cbc',t.c,GO.c); setWidth('cbf',t.f,GO.f); setWidth('cbb',t.b,GO.b);
    }
    updateCompact();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyCompactDashboard);
  else applyCompactDashboard();
})();
