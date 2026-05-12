import { useState, useEffect, useRef } from "react";

const MINT = "#A8E6CF";
const MINT_DARK = "#5CB88A";
const MINT_GLOW = "#A8E6CF33";
const GRAY_900 = "#0f1117";
const GRAY_800 = "#181c24";
const GRAY_700 = "#232a35";
const GRAY_600 = "#2e3848";
const GRAY_300 = "#8a9bb5";
const GRAY_100 = "#e8edf5";
const WHITE = "#ffffff";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: ${GRAY_900};
    color: ${GRAY_100};
    min-height: 100vh;
    overflow-x: hidden;
  }

  .app {
    min-height: 100vh;
    position: relative;
  }

  /* Background mesh */
  .bg-mesh {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 80% 60% at 20% 10%, ${MINT}18 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 80%, ${MINT}10 0%, transparent 55%),
      radial-gradient(ellipse 40% 40% at 50% 50%, #1a2535 0%, transparent 80%);
  }

  .content { position: relative; z-index: 1; }

  /* NAV */
  .nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 40px;
    border-bottom: 1px solid ${GRAY_700};
    backdrop-filter: blur(12px);
    background: ${GRAY_900}cc;
    position: sticky; top: 0; z-index: 100;
  }
  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800; font-size: 22px;
    color: ${WHITE};
    display: flex; align-items: center; gap: 8px;
  }
  .nav-logo span { color: ${MINT}; }
  .nav-badge {
    background: ${MINT}22; border: 1px solid ${MINT}55;
    color: ${MINT}; font-size: 11px; font-weight: 500;
    padding: 3px 10px; border-radius: 20px;
    letter-spacing: 0.5px;
  }
  .nav-cta {
    background: ${MINT}; color: ${GRAY_900};
    border: none; border-radius: 8px;
    padding: 9px 20px; font-size: 13px; font-weight: 600;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }
  .nav-cta:hover { background: ${MINT_DARK}; transform: translateY(-1px); }

  /* HERO */
  .hero {
    text-align: center;
    padding: 90px 24px 60px;
    max-width: 760px;
    margin: 0 auto;
    animation: fadeUp 0.8s ease both;
  }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 6px;
    background: ${MINT}15; border: 1px solid ${MINT}40;
    color: ${MINT}; font-size: 12px; font-weight: 500;
    padding: 5px 14px; border-radius: 20px;
    margin-bottom: 28px; letter-spacing: 0.8px; text-transform: uppercase;
  }
  .hero-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800; font-size: clamp(36px, 6vw, 64px);
    line-height: 1.08; color: ${WHITE};
    margin-bottom: 20px;
  }
  .hero-title .accent { color: ${MINT}; }
  .hero-sub {
    font-size: 17px; color: ${GRAY_300}; line-height: 1.7;
    max-width: 520px; margin: 0 auto 40px;
    font-weight: 300;
  }
  .hero-stats {
    display: flex; justify-content: center; gap: 40px;
    flex-wrap: wrap; margin-top: 20px;
  }
  .stat { text-align: center; }
  .stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 28px; font-weight: 700; color: ${MINT};
  }
  .stat-label { font-size: 12px; color: ${GRAY_300}; margin-top: 2px; }

  /* PLAN TOGGLE */
  .plan-section {
    text-align: center; padding: 20px 24px 0;
    animation: fadeUp 0.8s 0.1s ease both;
  }
  .plan-toggle {
    display: inline-flex;
    background: ${GRAY_700}; border-radius: 10px; padding: 4px;
    margin-bottom: 8px;
  }
  .plan-btn {
    padding: 8px 22px; border-radius: 7px;
    border: none; font-size: 13px; font-weight: 500;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s; color: ${GRAY_300}; background: transparent;
  }
  .plan-btn.active {
    background: ${MINT}; color: ${GRAY_900}; font-weight: 600;
  }
  .plan-hint { font-size: 12px; color: ${MINT}; margin-bottom: 40px; }

  /* MAIN CARD */
  .main-card {
    max-width: 680px; margin: 0 auto 60px;
    padding: 0 24px;
    animation: fadeUp 0.8s 0.2s ease both;
  }
  .card {
    background: ${GRAY_800};
    border: 1px solid ${GRAY_600};
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 24px 80px #00000060, 0 0 0 1px ${MINT}10;
  }
  .card-header {
    padding: 24px 28px 0;
    display: flex; align-items: center; justify-content: space-between;
  }
  .card-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700; font-size: 16px; color: ${WHITE};
  }
  .free-badge {
    background: ${MINT}20; border: 1px solid ${MINT}50;
    color: ${MINT}; font-size: 11px; padding: 3px 10px;
    border-radius: 20px; font-weight: 500;
  }
  .card-body { padding: 24px 28px; }

  /* COUNTER */
  .usage-bar-wrap { margin-bottom: 24px; }
  .usage-label {
    display: flex; justify-content: space-between;
    font-size: 12px; color: ${GRAY_300}; margin-bottom: 8px;
  }
  .usage-bar {
    height: 5px; background: ${GRAY_700}; border-radius: 10px; overflow: hidden;
  }
  .usage-fill {
    height: 100%; border-radius: 10px;
    background: linear-gradient(90deg, ${MINT}, ${MINT_DARK});
    transition: width 0.5s ease;
  }

  /* FORM */
  .form-grid { display: grid; gap: 16px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .field label {
    display: block; font-size: 12px; font-weight: 500;
    color: ${GRAY_300}; margin-bottom: 7px; letter-spacing: 0.3px;
    text-transform: uppercase;
  }
  .field input, .field select, .field textarea {
    width: 100%;
    background: ${GRAY_700}; border: 1px solid ${GRAY_600};
    border-radius: 10px; color: ${WHITE};
    padding: 11px 14px; font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none; resize: none;
  }
  .field input:focus, .field select:focus, .field textarea:focus {
    border-color: ${MINT}80;
    box-shadow: 0 0 0 3px ${MINT_GLOW};
  }
  .field select option { background: ${GRAY_700}; }

  /* TONE PILLS */
  .tone-pills { display: flex; flex-wrap: wrap; gap: 8px; }
  .tone-pill {
    padding: 6px 14px; border-radius: 20px;
    border: 1px solid ${GRAY_600};
    background: ${GRAY_700}; color: ${GRAY_300};
    font-size: 12px; cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }
  .tone-pill.selected {
    background: ${MINT}20; border-color: ${MINT}70; color: ${MINT};
  }
  .tone-pill:hover { border-color: ${MINT}50; color: ${GRAY_100}; }

  /* GENERATE BTN */
  .generate-btn {
    width: 100%; margin-top: 22px;
    background: linear-gradient(135deg, ${MINT}, ${MINT_DARK});
    color: ${GRAY_900}; border: none; border-radius: 12px;
    padding: 15px; font-size: 15px; font-weight: 700;
    cursor: pointer; font-family: 'Syne', sans-serif;
    letter-spacing: 0.3px;
    transition: all 0.25s;
    position: relative; overflow: hidden;
  }
  .generate-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px ${MINT}50;
  }
  .generate-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
  .generate-btn .shimmer {
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, #ffffff30, transparent);
    transform: translateX(-100%);
    animation: shimmer 2s infinite;
  }
  @keyframes shimmer { to { transform: translateX(100%); } }

  /* RESULT */
  .result-card {
    margin-top: 20px;
    background: ${GRAY_700}; border: 1px solid ${MINT}30;
    border-radius: 14px; padding: 22px;
    animation: fadeUp 0.5s ease both;
    position: relative;
  }
  .result-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 14px;
  }
  .result-label {
    font-family: 'Syne', sans-serif;
    font-size: 13px; font-weight: 700; color: ${MINT};
    display: flex; align-items: center; gap: 6px;
  }
  .copy-btn {
    background: ${GRAY_600}; border: 1px solid ${GRAY_600};
    color: ${GRAY_300}; padding: 5px 14px;
    border-radius: 8px; font-size: 12px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; transition: all 0.2s;
  }
  .copy-btn:hover { background: ${MINT}20; color: ${MINT}; border-color: ${MINT}50; }
  .result-text {
    font-size: 14px; line-height: 1.8; color: ${GRAY_100};
    white-space: pre-wrap;
  }
  .result-tags {
    display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px;
  }
  .result-tag {
    background: ${GRAY_800}; border: 1px solid ${GRAY_600};
    color: ${GRAY_300}; font-size: 11px; padding: 3px 10px;
    border-radius: 20px;
  }

  /* LOADING */
  .loading-dots {
    display: flex; align-items: center; gap: 5px; justify-content: center;
  }
  .dot {
    width: 6px; height: 6px; background: ${GRAY_900};
    border-radius: 50%; animation: bounce 1.2s infinite;
  }
  .dot:nth-child(2) { animation-delay: 0.15s; }
  .dot:nth-child(3) { animation-delay: 0.3s; }
  @keyframes bounce { 0%,80%,100%{transform:scale(1)} 40%{transform:scale(1.4)} }

  /* UPGRADE BANNER */
  .upgrade-banner {
    margin-top: 16px;
    background: linear-gradient(135deg, ${MINT}18, ${MINT}08);
    border: 1px solid ${MINT}40; border-radius: 12px;
    padding: 18px 22px;
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px; flex-wrap: wrap;
    animation: fadeUp 0.4s ease both;
  }
  .upgrade-text { font-size: 13px; color: ${GRAY_100}; }
  .upgrade-text strong { color: ${MINT}; }
  .upgrade-btn-sm {
    background: ${MINT}; color: ${GRAY_900};
    border: none; border-radius: 8px;
    padding: 8px 18px; font-size: 13px; font-weight: 700;
    cursor: pointer; font-family: 'Syne', sans-serif;
    white-space: nowrap; transition: all 0.2s;
  }
  .upgrade-btn-sm:hover { background: ${MINT_DARK}; }

  /* REVIEWS */
  .reviews-section {
    max-width: 680px; margin: 0 auto 80px; padding: 0 24px;
    animation: fadeUp 0.8s 0.3s ease both;
  }
  .section-label {
    font-family: 'Syne', sans-serif;
    font-size: 13px; font-weight: 700; color: ${MINT};
    text-transform: uppercase; letter-spacing: 1px;
    margin-bottom: 20px; text-align: center;
  }
  .reviews-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .review-card {
    background: ${GRAY_800}; border: 1px solid ${GRAY_700};
    border-radius: 14px; padding: 18px;
    transition: border-color 0.2s;
  }
  .review-card:hover { border-color: ${MINT}40; }
  .review-stars { color: ${MINT}; font-size: 13px; margin-bottom: 8px; }
  .review-text { font-size: 13px; color: ${GRAY_300}; line-height: 1.6; margin-bottom: 12px; }
  .reviewer { display: flex; align-items: center; gap: 10px; }
  .avatar {
    width: 32px; height: 32px; border-radius: 50%;
    background: linear-gradient(135deg, ${MINT}60, ${MINT_DARK});
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; color: ${GRAY_900};
    flex-shrink: 0;
  }
  .reviewer-name { font-size: 13px; font-weight: 600; color: ${GRAY_100}; }
  .reviewer-role { font-size: 11px; color: ${GRAY_300}; }

  /* FOOTER */
  .footer {
    border-top: 1px solid ${GRAY_700};
    text-align: center; padding: 30px 24px;
    color: ${GRAY_300}; font-size: 12px;
  }
  .footer span { color: ${MINT}; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 540px) {
    .nav { padding: 16px 20px; }
    .form-row { grid-template-columns: 1fr; }
    .reviews-grid { grid-template-columns: 1fr; }
    .hero { padding: 60px 20px 40px; }
    .card-body { padding: 20px; }
    .hero-stats { gap: 24px; }
  }
`;

const REVIEWS = [
  { stars: 5, text: "Generé 10 guiones en 15 minutos. Mis videos triplicaron las visitas en la primera semana.", name: "Mariana R.", role: "Dueña de panadería", emoji: "M" },
  { stars: 5, text: "No sé escribir y siempre me trabé con el contenido. ViralScripts lo resolvió todo.", name: "Carlos V.", role: "Entrenador personal", emoji: "C" },
  { stars: 5, text: "Mis clientes en la agencia están felices. Les genero guiones en minutos. ¡Vale cada centavo!", name: "Sofía L.", role: "Agencia de marketing", emoji: "S" },
  { stars: 5, text: "Probé el gratis y ya no pude parar. El guion que me dio viralizó en TikTok. 🔥", name: "Diego M.", role: "Tienda de ropa", emoji: "D" },
];

const TONES = ["🔥 Energético", "😂 Divertido", "💼 Profesional", "❤️ Emotivo", "🚀 Motivador", "😱 Impactante"];
const DURATIONS = ["15 segundos", "30 segundos", "60 segundos", "90 segundos"];
const PLATFORMS = ["TikTok", "Instagram Reels", "YouTube Shorts", "Facebook"];

export default function ViralScripts() {
  const [plan, setPlan] = useState("free");
  const [used, setUsed] = useState(1); // already used 1
  const FREE_LIMIT = 3;
  const [form, setForm] = useState({ business: "", audience: "", platform: "TikTok", duration: "30 segundos", extra: "" });
  const [tone, setTone] = useState("🔥 Energético");
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const resultRef = useRef(null);

  const canGenerate = plan === "pro" || used < FREE_LIMIT;

  const handleGenerate = async () => {
    if (!form.business.trim()) return;
    if (!canGenerate) { setShowUpgrade(true); return; }

    setLoading(true);
    setScript(null);
    setShowUpgrade(false);

    const prompt = `Eres un experto en marketing viral y creación de contenido para redes sociales.

Crea un guion viral COMPLETO y listo para grabar en video para este negocio:

- Negocio: ${form.business}
- Público objetivo: ${form.audience || "público general"}
- Red social: ${form.platform}
- Duración: ${form.duration}
- Tono: ${tone.replace(/[\p{Emoji}]/gu, "").trim()}
- Detalle extra: ${form.extra || "ninguno"}

El guion debe:
1. Empezar con un GANCHO impactante (primeros 3 segundos que detienen el scroll)
2. Presentar el problema o deseo del cliente
3. Mostrar la solución (el negocio)
4. Incluir una llamada a la acción clara

Formato:
🎬 GANCHO (0-3 seg):
[texto del gancho]

📢 DESARROLLO (resto del video):
[cuerpo del guion con indicaciones de escena]

✅ CIERRE + CTA:
[llamada a la acción poderosa]

Hazlo en español, natural, conversacional y REALMENTE viral. Máximo ${form.duration === "15 segundos" ? "60" : form.duration === "30 segundos" ? "90" : form.duration === "60 segundos" ? "150" : "200"} palabras.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "Error al generar. Intenta de nuevo.";
      setScript(text);
      setUsed(u => u + 1);
      if (plan === "free" && used + 1 >= FREE_LIMIT) setShowUpgrade(true);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 100);
    } catch {
      setScript("❌ Error de conexión. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (script) { navigator.clipboard.writeText(script); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  };

  const usagePct = Math.min((used / FREE_LIMIT) * 100, 100);

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="bg-mesh" />
        <div className="content">

          {/* NAV */}
          <nav className="nav">
            <div className="nav-logo">Viral<span>Scripts</span></div>
            <div className="nav-badge">IA Generativa</div>
            <button className="nav-cta" onClick={() => setPlan("pro")}>
              {plan === "pro" ? "✓ Pro Activo" : "Ir Pro — $19/mes"}
            </button>
          </nav>

          {/* HERO */}
          <section className="hero">
            <div className="hero-eyebrow">⚡ Guiones que venden solos</div>
            <h1 className="hero-title">
              Tu negocio merece<br />
              videos <span className="accent">virales</span>
            </h1>
            <p className="hero-sub">
              Describe tu negocio y en segundos tienes un guion profesional listo para grabar y publicar. Sin experiencia, sin bloqueo creativo.
            </p>
            <div className="hero-stats">
              <div className="stat"><div className="stat-num">12K+</div><div className="stat-label">Guiones creados</div></div>
              <div className="stat"><div className="stat-num">4.9★</div><div className="stat-label">Calificación</div></div>
              <div className="stat"><div className="stat-num">3x</div><div className="stat-label">Más vistas promedio</div></div>
            </div>
          </section>

          {/* PLAN TOGGLE */}
          <div className="plan-section">
            <div className="plan-toggle">
              <button className={`plan-btn ${plan === "free" ? "active" : ""}`} onClick={() => setPlan("free")}>Gratis</button>
              <button className={`plan-btn ${plan === "pro" ? "active" : ""}`} onClick={() => setPlan("pro")}>Pro $19/mes</button>
            </div>
            {plan === "pro" && <div className="plan-hint">🎉 Guiones ilimitados + acceso prioritario</div>}
          </div>

          {/* MAIN CARD */}
          <div className="main-card">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Generador de Guiones</div>
                {plan === "free" && <div className="free-badge">{FREE_LIMIT - used} guiones restantes</div>}
                {plan === "pro" && <div className="free-badge" style={{color: MINT}}>∞ Ilimitado</div>}
              </div>
              <div className="card-body">

                {/* Usage bar */}
                {plan === "free" && (
                  <div className="usage-bar-wrap">
                    <div className="usage-label">
                      <span>Guiones usados</span>
                      <span>{used}/{FREE_LIMIT}</span>
                    </div>
                    <div className="usage-bar">
                      <div className="usage-fill" style={{ width: `${usagePct}%` }} />
                    </div>
                  </div>
                )}

                <div className="form-grid">
                  <div className="field">
                    <label>¿De qué es tu negocio? *</label>
                    <input
                      type="text"
                      placeholder="Ej: Peluquería canina en Bogotá"
                      value={form.business}
                      onChange={e => setForm(f => ({ ...f, business: e.target.value }))}
                    />
                  </div>

                  <div className="field">
                    <label>¿A quién le vendes?</label>
                    <input
                      type="text"
                      placeholder="Ej: Dueños de mascotas, 25-45 años"
                      value={form.audience}
                      onChange={e => setForm(f => ({ ...f, audience: e.target.value }))}
                    />
                  </div>

                  <div className="form-row">
                    <div className="field">
                      <label>Red social</label>
                      <select value={form.platform} onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}>
                        {PLATFORMS.map(p => <option key={p}>{p}</option>)}
                      </select>
                    </div>
                    <div className="field">
                      <label>Duración del video</label>
                      <select value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}>
                        {DURATIONS.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="field">
                    <label>Tono del guion</label>
                    <div className="tone-pills">
                      {TONES.map(t => (
                        <button key={t} className={`tone-pill ${tone === t ? "selected" : ""}`} onClick={() => setTone(t)}>{t}</button>
                      ))}
                    </div>
                  </div>

                  <div className="field">
                    <label>¿Algo especial que quieres mencionar?</label>
                    <textarea
                      rows={2}
                      placeholder="Ej: Tenemos promoción del 30%, somos los únicos con servicio a domicilio..."
                      value={form.extra}
                      onChange={e => setForm(f => ({ ...f, extra: e.target.value }))}
                    />
                  </div>
                </div>

                <button
                  className="generate-btn"
                  onClick={handleGenerate}
                  disabled={loading || !form.business.trim()}
                >
                  {loading ? (
                    <div className="loading-dots">
                      <div className="dot" /><div className="dot" /><div className="dot" />
                    </div>
                  ) : !canGenerate ? "🔒 Actualiza a Pro para continuar" : "⚡ Generar Guion Viral"}
                  {!loading && <div className="shimmer" />}
                </button>

                {/* RESULT */}
                {script && (
                  <div className="result-card" ref={resultRef}>
                    <div className="result-header">
                      <div className="result-label">🎬 Tu guion listo</div>
                      <button className="copy-btn" onClick={handleCopy}>{copied ? "✓ Copiado" : "Copiar"}</button>
                    </div>
                    <div className="result-text">{script}</div>
                    <div className="result-tags">
                      <span className="result-tag">{form.platform}</span>
                      <span className="result-tag">{form.duration}</span>
                      <span className="result-tag">{tone}</span>
                    </div>
                  </div>
                )}

                {/* UPGRADE BANNER */}
                {showUpgrade && plan === "free" && (
                  <div className="upgrade-banner">
                    <div className="upgrade-text">
                      Usaste tus <strong>3 guiones gratis</strong>. Desbloquea guiones ilimitados por solo <strong>$19/mes</strong>.
                    </div>
                    <button className="upgrade-btn-sm" onClick={() => setPlan("pro")}>Ir Pro ahora</button>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* REVIEWS */}
          <div className="reviews-section">
            <div className="section-label">⭐ Lo que dicen nuestros usuarios</div>
            <div className="reviews-grid">
              {REVIEWS.map((r, i) => (
                <div className="review-card" key={i}>
                  <div className="review-stars">{"★".repeat(r.stars)}</div>
                  <div className="review-text">"{r.text}"</div>
                  <div className="reviewer">
                    <div className="avatar">{r.emoji}</div>
                    <div>
                      <div className="reviewer-name">{r.name}</div>
                      <div className="reviewer-role">{r.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div className="footer">
            Hecho con ❤️ por <span>ViralScripts</span> · Tu contenido, tu éxito.
          </div>

        </div>
      </div>
    </>
  );
}
