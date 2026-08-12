// iPhone/Safari barcode scanner override
// Uses the browser camera directly instead of html5-qrcode's camera selection layer.
let nativeScanStream = null;
let nativeScanTimer = null;

async function stopNativeScanner(){
  if(nativeScanTimer){clearInterval(nativeScanTimer);nativeScanTimer=null;}
  if(nativeScanStream){nativeScanStream.getTracks().forEach(t=>t.stop());nativeScanStream=null;}
  const r=document.getElementById('reader');
  if(r) r.innerHTML='';
}

window.stopCamera = async function(){
  await stopNativeScanner();
  if(window.scanner){try{await window.scanner.stop()}catch(e){} window.scanner=null;}
};

window.openScan = async function(){
  show('scan');
  const r=document.getElementById('reader');
  const out=document.getElementById('br');
  out.innerHTML='<p class="muted">Kamera wird gestartet…</p>';
  await stopNativeScanner();
  r.innerHTML='';

  const video=document.createElement('video');
  video.setAttribute('playsinline','');
  video.setAttribute('autoplay','');
  video.setAttribute('muted','');
  video.muted=true;
  video.style.cssText='width:100%;height:100%;object-fit:cover;background:#000';
  r.appendChild(video);

  try{
    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error('Kamera wird von diesem Browser nicht freigegeben.');
    nativeScanStream=await navigator.mediaDevices.getUserMedia({audio:false,video:{facingMode:{ideal:'environment'},width:{ideal:1280},height:{ideal:720}}});
    video.srcObject=nativeScanStream;
    await video.play();
    out.innerHTML='<p class="good">Kamera aktiv. Barcode vor die Kamera halten.</p>';

    if('BarcodeDetector' in window){
      const formats=await BarcodeDetector.getSupportedFormats();
      const wanted=['ean_13','ean_8','upc_a','upc_e','code_128'].filter(x=>formats.includes(x));
      const detector=new BarcodeDetector(wanted.length?{formats:wanted}:undefined);
      let busy=false;
      nativeScanTimer=setInterval(async()=>{
        if(busy || video.readyState<2)return;
        busy=true;
        try{
          const codes=await detector.detect(video);
          if(codes.length){
            const code=codes[0].rawValue;
            await stopNativeScanner();
            lookup(code);
          }
        }catch(e){}
        busy=false;
      },250);
    }else{
      out.innerHTML='<p class="mid">Kamera aktiv. Automatische Barcode-Erkennung wird von dieser Safari-Version nicht unterstützt. Barcode unten manuell eingeben.</p>';
    }
  }catch(e){
    await stopNativeScanner();
    r.innerHTML='<div style="height:100%;display:flex;align-items:center;justify-content:center;padding:20px;text-align:center" class="mid">Kamera konnte nicht geöffnet werden.</div>';
    out.innerHTML='<p class="mid">Bitte iPhone: Einstellungen → Safari → Kamera → Erlauben prüfen. Der Barcode kann unten weiterhin manuell eingegeben werden.</p>';
  }
};
