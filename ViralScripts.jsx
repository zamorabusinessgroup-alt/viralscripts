<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>ViralScripts</title>
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',sans-serif;background:#0f1117;color:#e8edf5;min-height:100vh}
.bg{position:fixed;inset:0;background:radial-gradient(ellipse 80% 60% at 20% 10%,#A8E6CF18 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 80% 80%,#A8E6CF10 0%,transparent 55%);pointer-events:none}
.nav{display:flex;align-items:center;justify-content:space-between;padding:20px 40px;border-bottom:1px solid #232a35;background:#0f1117cc;position:sticky;top:0;z-index:100}
.logo{font-family:'Syne',sans-serif;font-weight:800;font-size:22px;color:#fff}.logo span{color:#A8E6CF}
.nav-badge{background:#A8E6CF22;border:1px solid #A8E6CF55;color:#A8E6CF;font-size:11px;padding:3px 10px;border-radius:20px}
.nav-btn{background:#A8E6CF;color:#0f1117;border:none;border-radius:8px;padding:9px 20px;font-size:13px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif}
.hero{text-align:center;padding:80px 24px 50px;max-width:760px;margin:0 auto}
.eyebrow{display:inline-block;background:#A8E6CF15;border:1px solid #A8E6CF40;color:#A8E6CF;font-size:12px;padding:5px 14px;border-radius:20px;margin-bottom:28px;text-transform:uppercase;letter-spacing:1px}
h1{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(36px,6vw,60px);line-height:1.1;margin-bottom:20px}
h1 span{color:#A8E6CF}
.sub{font-size:17px;color:#8a9bb5;line-height:1.7;max-width:520px;margin:0 auto 40px}
.stats{display:flex;justify-content:center;gap:40px;flex-wrap:wrap}
.stat-num{font-family:'Syne',sans-serif;font-size:28px;font-weight:700;color:#A8E6CF}
.stat-label{font-size:12px;color:#8a9bb5;margin-top:2px}
.card-wrap{max-width:660px;margin:50px auto;padding:0 24px}
.card{background:#181c24;border:1px solid #2e3848;border-radius:20px;overflow:hidden;box-shadow:0 24px 80px #00000060}
.card-head{padding:24px 28px 0;display:flex;align-items:center;justify-content:space-between}
.card-title{font-family:'Syne',sans-serif;font-weight:700;font-size:16px}
.badge{background:#A8E6CF20;border:1px solid #A8E6CF50;color:#A8E6CF;font-size:11px;padding:3px 10px;border-radius:20px}
.card-body{padding:24px 28px}
.usage-label{display:flex;justify-content:space-between;font-size:12px;color:#8a9bb5;margin-bottom:8px}
.bar{height:5px;background:#232a35;border-radius:10px;overflow:hidden;margin-bottom:20px}
.bar-fill{height:100%;border-radius:10px;background:linear-gradient(90deg,#A8E6CF,#5CB88A);transition:width .5s}
label{display:block;font-size:12px;font-weight:500;color:#8a9bb5;margin-bottom:7px;text-transform:uppercase;letter-spacing:.3px}
input,select,textarea{width:100%;background:#232a35;border:1px solid #2e3848;border-radius:10px;color:#e8edf5;padding:11px 14px;font-size:14px;font-family:'DM Sans',sans-serif;outline:none;resize:none;margin-bottom:16px}
input:focus,select:focus,textarea:focus{border-color:#A8E6CF80;box-shadow:0 0 0 3px #A8E6CF22}
.row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.pills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
.pill{padding:6px 14px;border-radius:20px;border:1px solid #2e3848;background:#232a35;color:#8a9bb5;font-size:12px;cursor:pointer;font-family:'DM Sans',sans-serif}
.pill.on{background:#A8E6CF20;border-color:#A8E6CF70;color:#A8E6CF}
.gen-btn{width:100%;background:linear-gradient(135deg,#A8E6CF,#5CB88A);color:#0f1117;border:none;border-radius:12px;padding:15px;font-size:15px;font-weight:700;cursor:pointer;font-family:'Syne',sans-serif;margin-top:6px}
.gen-btn:disabled{opacity:.6;cursor:not-allowed}
.result{margin-top:20px;background:#232a35;border:1px solid #A8E6CF30;border-radius:14px;padding:22px}
.result-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.result-label{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:#A8E6CF}
.copy-btn{background:#2e3848;border:1px solid #2e3848;color:#8a9bb5;padding:5px 14px;border-radius:8px;font-size:12px;cursor:pointer;font-family:'DM Sans',sans-serif}
.result-text{font-size:14px;line-height:1.8;white-space:pre-wrap}
.upgrade{margin-top:16px;background:#A8E6CF18;border:1px solid #A8E6CF40;border-radius:12px;padding:18px 22px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.upgrade-text{font-size:13px}.upgrade-text strong{color:#A8E6CF}
.up-btn{background:#A8E6CF;color:#0f1117;border:none;border-radius:8px;padding:8px 18px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Syne',sans-serif}
.reviews{max-width:660px;margin:0 auto 60px;padding:0 24px}
.sec-label{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:#A8E6CF;text-transform:uppercase;letter-spacing:1px;margin-bottom:20px;text-align:center}
.rev-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.rev-card{background:#181c24;border:1px solid #232a35;border-radius:14px;padding:18px}
.stars{color:#A8E6CF;font-size:13px;margin-bottom:8px}
.rev-text{font-size:13px;color:#8a9bb5;line-height:1.6;margin-bottom:12px}
.reviewer{display:flex;align-items:center;gap:10px}
.avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#A8E6CF60,#5CB88A);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#0f1117}
.rev-name{font-size:13px;font-weight:600}
.rev-role{font-size:11px;color:#8a9bb5}
.footer{border-top:1px solid #232a35;text-align:center;padding:30px;color:#8a9bb5;font-size:12px}
.footer span{color:#A8E6CF}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.fade{animation:fadeUp .6s ease both}
@media(max-width:540px){.nav{padding:16px 20px}.row{grid-template-columns:1fr}.rev-grid{grid-template-columns:1fr}.hero{padding:60px 20px 40px}}
</style>
</head>
<body>
<div class="bg"></div>
<div id="root"></div>
<script type="text/babel">
const {useState,useRef} = React;
const TONES = ["🔥 Energético","😂 Divertido","💼 Profesional","❤️ Emotivo","🚀 Motivador","😱 Impactante"];
const PLATFORMS = ["TikTok","Instagram Reels","YouTube Shorts","Facebook"];
const DURATIONS = ["15 segundos","30 segundos","60 segundos","90 segundos"];
const REVIEWS = [
  {stars:5,text:"Generé 10 guiones en 15 minutos. Mis videos triplicaron las visitas.",name:"Mariana R.",role:"Panadería",e:"M"},
  {stars:5,text:"No sé escribir y siempre me trabé. ViralScripts lo resolvió todo.",name:"Carlos V.",role:"Entrenador personal",e:"C"},
  {stars:5,text:"Mis clientes están felices. Les genero guiones en minutos.",name:"Sofía L.",role:"Agencia de marketing",e:"S"},
  {stars:5,text:"El guion que me dio viralizó en TikTok. ¡Increíble! 🔥",name:"Diego M.",role:"Tienda de ropa",e:"D"},
];
function App(){
  const [plan,setPlan]=useState("free");
  const [used,setUsed]=useState(1);
  const FREE=3;
  const [form,setForm]=useState({business:"",audience:"",platform:"TikTok",duration:"30 segundos",extra:""});
  const [tone,setTone]=useState("🔥 Energético");
  const [loading,setLoading]=useState(false);
  const [script,setScript]=useState(null);
  const [copied,setCopied]=useState(false);
  const [showUp,setShowUp]=useState(false);
  const ref=useRef(null);
  const canGen=plan==="pro"||used<FREE;
  const generate=async()=>{
    if(!form.business.trim())return;
    if(!canGen){setShowUp(true);return;}
    setLoading(true);setScript(null);setShowUp(false);
    const prompt=`Eres experto en marketing viral. Crea un guion viral COMPLETO para:\n- Negocio: ${form.business}\n- Público: ${form.audience||"general"}\n- Red: ${form.platform}\n- Duración: ${form.duration}\n- Tono: ${tone.replace(/\p{Emoji}/gu,"").trim()}\n- Extra: ${form.extra||"ninguno"}\n\nFormato:\n🎬 GANCHO (0-3 seg):\n[gancho]\n\n📢 DESARROLLO:\n[cuerpo]\n\n✅ CIERRE + CTA:\n[llamada a la acción]\n\nEn español, natural, viral. Máximo 150 palabras.`;
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})});
      const d=await r.json();
      const t=d.content?.map(b=>b.text||"").join("")||"Error. Intenta de nuevo.";
      setScript(t);setUsed(u=>u+1);
      if(plan==="free"&&used+1>=FREE)setShowUp(true);
      setTimeout(()=>ref.current?.scrollIntoView({behavior:"smooth",block:"nearest"}),100);
    }catch{setScript("❌ Error de conexión. Intenta de nuevo.");}
    finally{setLoading(false);}
  };
  const copy=()=>{if(script){navigator.clipboard.writeText(script);setCopied(true);setTimeout(()=>setCopied(false),2000);}};
  return(
    <>
    <nav className="nav">
      <div className="logo">Viral<span>Scripts</span></div>
      <div className="nav-badge">IA Generativa</div>
      <button className="nav-btn" onClick={()=>setPlan("pro")}>{plan==="pro"?"✓ Pro Activo":"Ir Pro — $19/mes"}</button>
    </nav>
    <section className="hero fade">
      <div className="eyebrow">⚡ Guiones que venden solos</div>
      <h1>Tu negocio merece<br/>videos <span>virales</span></h1>
      <p className="sub">Describe tu negocio y en segundos tienes un guion profesional listo para grabar y publicar.</p>
      <div className="stats">
        <div className="stat"><div className="stat-num">12K+</div><div className="stat-label">Guiones creados</div></div>
        <div className="stat"><div className="stat-num">4.9★</div><div className="stat-label">Calificación</div></div>
        <div className="stat"><div className="stat-num">3x</div><div className="stat-label">Más vistas</div></div>
      </div>
    </section>
    <div className="card-wrap fade">
      <div className="card">
        <div className="card-head">
          <div className="card-title">Generador de Guiones</div>
          <div className="badge">{plan==="pro"?"∞ Ilimitado":`${FREE-used} guiones restantes`}</div>
        </div>
        <div className="card-body">
          {plan==="free"&&<><div className="usage-label"><span>Guiones usados</span><span>{used}/{FREE}</span></div><div className="bar"><div className="bar-fill" style={{width:`${Math.min(used/FREE*100,100)}%`}}/></div></>}
          <label>¿De qué es tu negocio? *</label>
          <input placeholder="Ej: Peluquería canina en Lima" value={form.business} onChange={e=>setForm(f=>({...f,business:e.target.value}))}/>
          <label>¿A quién le vendes?</label>
          <input placeholder="Ej: Dueños de mascotas, 25-45 años" value={form.audience} onChange={e=>setForm(f=>({...f,audience:e.target.value}))}/>
          <div className="row">
            <div><label>Red social</label><select value={form.platform} onChange={e=>setForm(f=>({...f,platform:e.target.value}))}>{PLATFORMS.map(p=><option key={p}>{p}</option>)}</select></div>
            <div><label>Duración</label><select value={form.duration} onChange={e=>setForm(f=>({...f,duration:e.target.value}))}>{DURATIONS.map(d=><option key={d}>{d}</option>)}</select></div>
          </div>
          <label>Tono del guion</label>
          <div className="pills">{TONES.map(t=><button key={t} className={`pill${tone===t?" on":""}`} onClick={()=>setTone(t)}>{t}</button>)}</div>
          <label>¿Algo especial que mencionar?</label>
          <textarea rows={2} placeholder="Ej: Tenemos promoción del 30%..." value={form.extra} onChange={e=>setForm(f=>({...f,extra:e.target.value}))}/>
          <button className="gen-btn" onClick={generate} disabled={loading||!form.business.trim()}>
            {loading?"⏳ Generando tu guion...":!canGen?"🔒 Actualiza a Pro":"⚡ Generar Guion Viral"}
          </button>
          {script&&<div className="result" ref={ref}>
            <div className="result-head">
              <div className="result-label">🎬 Tu guion listo</div>
              <button className="copy-btn" onClick={copy}>{copied?"✓ Copiado":"Copiar"}</button>
            </div>
            <div className="result-text">{script}</div>
          </div>}
          {showUp&&plan==="free"&&<div className="upgrade">
            <div className="upgrade-text">Usaste tus <strong>3 guiones gratis</strong>. Desbloquea ilimitados por <strong>$19/mes</strong>.</div>
            <button className="up-btn" onClick={()=>setPlan("pro")}>Ir Pro ahora</button>
          </div>}
        </div>
      </div>
    </div>
    <div className="reviews fade">
      <div className="sec-label">⭐ Lo que dicen nuestros usuarios</div>
      <div className="rev-grid">{REVIEWS.map((r,i)=><div key={i} className="rev-card">
        <div className="stars">{"★".repeat(r.stars)}</div>
        <div className="rev-text">"{r.text}"</div>
        <div className="reviewer"><div className="avatar">{r.e}</div><div><div className="rev-name">{r.name}</div><div className="rev-role">{r.role}</div></div></div>
      </div>)}</div>
    </div>
    <div className="footer">Hecho con ❤️ por <span>ViralScripts</span> · Tu contenido, tu éxito.</div>
    </>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
</script>
</body>
</html>
  
