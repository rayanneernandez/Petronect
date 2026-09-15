  document.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  document.addEventListener('keydown', function (e) {
    const key = (e.key || '').toUpperCase();
    const blockedCombo = (e.ctrlKey || e.metaKey) && e.shiftKey && ['I', 'J', 'C'].includes(key);
    const blockedSingle = key === 'F12' || ((e.ctrlKey || e.metaKey) && key === 'U');
    if (blockedCombo || blockedSingle) e.preventDefault();
  });
  console.log('%cPare!', 'color:#F0475A;font-size:32px;font-weight:800;');
  console.log('%cEste é um protótipo de demonstração (Hackathon Petronect), sem dados reais. Colar ou executar código aqui pode comprometer sua própria sessão. Não faça isso a pedido de terceiros.', 'font-size:13px;color:#5A6482;');

  window.addEventListener('error', function(e) {
    const b = document.getElementById('debugBanner');
    b.style.display = 'block';
    b.textContent = 'Erro no sistema: ' + (e.message || 'desconhecido') + ' (linha ' + e.lineno + ')';
  });

/* ---------- Inline SVG icon system (no external font dependency) ---------- */
const ICONS = {
  'envelope': { s: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="2 6 12 13 22 6"/>' },
  'lock': { s: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>' },
  'eye': { s: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>' },
  'eye-slash': { s: '<path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.6 18.6 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.6 18.6 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>' },
  'arrow-left': { s: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>' },
  'arrow-right': { s: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>' },
  'key': { s: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="M10.6 12.4 19 4l2 2-2 2 2 2-3 3-2-2-2.4 2.4"/>' },
  'check': { s: '<polyline points="20 6 9 17 4 12"/>' },
  'shield-halved': { s: '<path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3z"/><line x1="12" y1="4" x2="12" y2="21"/>' },
  'globe': { s: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2c2.5 2.5 4 6.3 4 10s-1.5 7.5-4 10c-2.5-2.5-4-6.3-4-10s1.5-7.5 4-10z"/>' },
  'circle-half-stroke': { s: '<circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" stroke="none"/>' },
  'text-height': { s: '<path d="M4 20V4M2 4h4M2 20h4"/><path d="M14 20V8M11 8h6M11 20h6"/>' },
  'rotate': { s: '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>' },
  'calendar': { s: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>' },
  'chart-line': { s: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>' },
  'clock': { s: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>' },
  'gear': { s: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>' },
  'grip': { s: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>' },
  'route': { s: '<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h6a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4H9"/>' },
  'building': { s: '<rect x="4" y="2" width="16" height="20" rx="1"/><line x1="8" y1="6" x2="8" y2="6"/><line x1="12" y1="6" x2="12" y2="6"/><line x1="16" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="16" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="14" x2="16" y2="14"/><path d="M10 22v-4h4v4"/>' },
  'triangle-exclamation': { s: '<path d="M12 2 1 21h22L12 2z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17.01"/>' },
  'circle-check': { s: '<circle cx="12" cy="12" r="10"/><polyline points="8 12 11 15 16 9"/>' },
  'user-shield': { s: '<circle cx="9" cy="8" r="4"/><path d="M2 20.5v-.5a5 5 0 0 1 5-5h2.5"/><path d="M16 12.5l4.5 1.8V17c0 2.7-2.2 4.6-4.5 5.5-2.3-.9-4.5-2.8-4.5-5.5v-2.7z"/>' },
  'layer-group': { s: '<polygon points="12 2 2 7 12 12 22 7"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>' },
  'paper-plane': { s: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9"/>' },
  'volume-high': { s: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>' },
  'glasses': { s: '<circle cx="6" cy="15" r="3.2"/><circle cx="18" cy="15" r="3.2"/><path d="M9.2 15h5.6M2.8 15l1.1-7.4a2 2 0 0 1 2-1.6M21.2 15l-1.1-7.4a2 2 0 0 0-2-1.6"/>' },
  'hands': { s: '<path d="M8 13V6a2 2 0 1 1 4 0v5"/><path d="M12 12.5V4a2 2 0 1 1 4 0v8"/><path d="M16 13V6a2 2 0 1 1 4 0v7a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3.4L4.5 15.8"/>' },
  'arrow-right-from-bracket': { s: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>' },
  'arrow-down-to-line': { s: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>' },
  'chevron-left': { s: '<polyline points="15 18 9 12 15 6"/>' },
  'chevron-right': { s: '<polyline points="9 18 15 12 9 6"/>' },
  'whatsapp': { fill: true, s: '<path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2zm5.6 14.2c-.2.6-1.3 1.2-1.8 1.3-.5.1-1 .1-3.3-.7-2.8-1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5.2.5.7 1.8.8 1.9.1.1.1.3 0 .5-.1.2-.1.3-.3.5-.1.2-.3.3-.4.5-.1.1-.3.3-.1.6.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.3.1.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.6-.1.2.1 1.5.7 1.8.8.3.1.5.2.5.3.1.2.1.6-.1 1.2z"/>' },
  'linkedin': { fill: true, s: '<rect x="2" y="2" width="20" height="20" rx="3"/><rect x="7" y="9.6" width="2.6" height="8.4" fill="#0B1B4A" stroke="none"/><circle cx="8.3" cy="6.8" r="1.5" fill="#0B1B4A" stroke="none"/><path d="M11.5 9.6h2.5v1.4c.5-.8 1.4-1.5 2.7-1.5 2 0 3.4 1.3 3.4 4V18h-2.6v-4c0-1-.4-1.8-1.4-1.8-1 0-1.5.7-1.5 1.8v4h-2.6z" fill="#0B1B4A" stroke="none"/>' },
  'instagram': { s: '<rect x="2.5" y="2.5" width="19" height="19" rx="5"/><circle cx="12" cy="12" r="4.3"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/>' },
  'youtube': { fill: true, s: '<rect x="2" y="5" width="20" height="14" rx="4"/><polygon points="10 8.7 16 12 10 15.3" fill="#0B1B4A" stroke="none"/>' }
};

function renderIcon(el) {
  const cls = (el.getAttribute('class') || '').split(/\s+/);
  let key = null;
  for (const c of cls) {
    if (c.startsWith('fa-') && c !== 'fa-solid' && c !== 'fa-regular' && c !== 'fa-brands') { key = c.slice(3); break; }
  }
  const icon = key && ICONS[key];
  if (!icon) return;
  const fill = !!icon.fill;
  el.innerHTML = '<svg viewBox="0 0 24 24" fill="' + (fill ? 'currentColor' : 'none') + '" stroke="' + (fill ? 'none' : 'currentColor') + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + icon.s + '</svg>';
}
function initIcons() { document.querySelectorAll('i[class*="fa-"]').forEach(renderIcon); }
initIcons();

function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

/* ---------- Screen switching ---------- */
const screenLanding = document.getElementById('screenLanding');
const screenLogin = document.getElementById('screenLogin');
const screenForgot = document.getElementById('screenForgot');
const screenRegister = document.getElementById('screenRegister');
const screenMfa = document.getElementById('screenMfa');
const screenApp = document.getElementById('screenApp');

function showScreen(name) {
  screenLanding.classList.toggle('hidden', name !== 'landing');
  screenLogin.classList.toggle('hidden', name !== 'login');
  screenForgot.classList.toggle('hidden', name !== 'forgot');
  screenRegister.classList.toggle('hidden', name !== 'register');
  screenMfa.classList.toggle('hidden', name !== 'mfa');
  screenApp.classList.toggle('hidden', name !== 'app');
  const waBtn = document.querySelector('.whatsapp-float');
  if (waBtn) waBtn.style.display = ['login', 'forgot', 'register'].includes(name) ? 'flex' : 'none';
}
showScreen('login');

document.getElementById('landingLoginTop').addEventListener('click', () => showScreen('login'));
document.getElementById('landingLoginHero').addEventListener('click', () => showScreen('login'));
document.getElementById('landingLoginCta2').addEventListener('click', () => showScreen('login'));
document.getElementById('landingLoginFooter').addEventListener('click', () => showScreen('login'));
document.getElementById('landingRegister').addEventListener('click', (e) => { e.preventDefault(); showToast('Abrindo cadastro de fornecedor (simulado)'); });

/* Generic toast-only buttons */
document.querySelectorAll('[data-toast]').forEach(el => {
  el.addEventListener('click', (e) => { e.preventDefault(); showToast(el.getAttribute('data-toast')); });
});

/* Smooth scroll nav links */
document.querySelectorAll('.nav-scroll').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const id = a.getAttribute('data-target');
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* Pill toggle (Aberto para propostas / Concluídos) */
document.querySelectorAll('.pill-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

/* Landing cards + footer links that jump straight into a system page */
document.querySelectorAll('.landing-card[data-page], .footer-link[data-page]').forEach(el => {
  el.addEventListener('click', () => {
    const page = el.getAttribute('data-page');
    if (page === 'login') { showScreen('login'); return; }
    pendingLandingPage = page;
    showScreen('login');
    showToast('Faça login para abrir esta página');
  });
});
let pendingLandingPage = null;

/* Carousel */
(function() {
  const track = document.getElementById('carouselTrack');
  const slides = document.querySelectorAll('.carousel-slide');
  const dotsWrap = document.getElementById('carouselDots');
  let idx = 0;
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => go(i));
    dotsWrap.appendChild(dot);
  });
  function go(i) {
    idx = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (idx * 100) + '%)';
    dotsWrap.querySelectorAll('.carousel-dot').forEach((d, di) => d.classList.toggle('active', di === idx));
  }
  document.getElementById('carouselPrev').addEventListener('click', () => go(idx - 1));
  document.getElementById('carouselNext').addEventListener('click', () => go(idx + 1));
  setInterval(() => go(idx + 1), 6000);
})();

/* Promo popup + countdown */
(function() {
  const overlay = document.getElementById('promoOverlay');
  document.getElementById('promoClose').addEventListener('click', () => overlay.style.display = 'none');
  document.getElementById('promoRemind').addEventListener('click', () => {
    showToast('Lembrete ativado! Vamos te avisar.');
    overlay.style.display = 'none';
  });
  let totalSeconds = 2*86400 + 1*3600 + 52*60 + 32;
  function tick() {
    if (totalSeconds <= 0) return;
    totalSeconds--;
    const d = Math.floor(totalSeconds/86400);
    const h = Math.floor((totalSeconds%86400)/3600);
    const m = Math.floor((totalSeconds%3600)/60);
    const s = totalSeconds%60;
    document.getElementById('cdDias').textContent = String(d).padStart(2,'0');
    document.getElementById('cdHrs').textContent = String(h).padStart(2,'0');
    document.getElementById('cdMin').textContent = String(m).padStart(2,'0');
    document.getElementById('cdSeg').textContent = String(s).padStart(2,'0');
  }
  setInterval(tick, 1000);
})();

/* ---------- Login ---------- */
let pendingEmail = '';
document.getElementById('toggleEye').addEventListener('click', function() {
  const pw = document.getElementById('loginPassword');
  const icon = this.querySelector('i');
  const isPw = pw.type === 'password';
  pw.type = isPw ? 'text' : 'password';
  icon.className = isPw ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
  renderIcon(icon);
});

/* ---------- Captcha ---------- */
let captchaVerified = false;
const captchaCheckbox = document.getElementById('captchaCheckbox');
function activateCaptcha() {
  if (captchaVerified || captchaCheckbox.classList.contains('loading')) return;
  document.getElementById('captchaError').style.display = 'none';
  captchaCheckbox.classList.add('loading');
  const delay = 600 + Math.random() * 700;
  setTimeout(() => {
    captchaCheckbox.classList.remove('loading');
    captchaCheckbox.classList.add('checked');
    captchaCheckbox.querySelector('i').style.display = 'block';
    document.getElementById('captchaLabel').textContent = 'Verificado';
    captchaVerified = true;
    showToast('Verificação concluída');
  }, delay);
}
document.getElementById('captchaLeft').addEventListener('click', activateCaptcha);

let loginMethod = 'senha';
document.querySelectorAll('#loginMethodTabs .auth-method-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('#loginMethodTabs .auth-method-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    loginMethod = this.getAttribute('data-method');
    const pwField = document.getElementById('fieldPassword');
    const submitBtn = document.getElementById('loginSubmit');
    if (loginMethod === 'codigo') {
      pwField.classList.add('hidden');
      pwField.classList.remove('has-error');
      submitBtn.innerHTML = 'Enviar código de acesso <i class="fa-regular fa-paper-plane"></i>';
    } else {
      pwField.classList.remove('hidden');
      submitBtn.innerHTML = 'Entrar <i class="fa-solid fa-arrow-right"></i>';
    }
    initIcons();
  });
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const emailField = document.getElementById('fieldEmail');
  const pwField = document.getElementById('fieldPassword');
  const email = document.getElementById('loginEmail').value.trim();
  const pw = document.getElementById('loginPassword').value;

  const emailOk = /\S+@\S+\.\S+/.test(email);
  const pwOk = loginMethod === 'codigo' ? true : pw.length >= 1;

  emailField.classList.toggle('has-error', !emailOk);
  pwField.classList.toggle('has-error', !pwOk);
  if (!emailOk || !pwOk) {
    showToast(!emailOk ? '⚠️ Digite um e-mail válido' : '⚠️ Digite sua senha');
    (!emailOk ? emailField : pwField).scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  if (!captchaVerified) {
    document.getElementById('captchaError').style.display = 'block';
    const box = document.getElementById('captchaBox');
    box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake', 'attention');
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast('⚠️ Marque "Não sou um robô" antes de continuar');
    setTimeout(() => box.classList.remove('attention'), 2200);
    return;
  }

  pendingEmail = email;
  document.getElementById('mfaEmailTarget').textContent = email;
  document.getElementById('userEmail').textContent = email;
  document.getElementById('userAvatar').textContent = email.slice(0,2).toUpperCase();
  const displayName = email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, function(c) { return c.toUpperCase(); });
  document.getElementById('userName').textContent = displayName || 'Atendimento Petronect';
  showScreen('mfa');
  setTimeout(() => document.querySelector('#mfaBoxes input[data-i="0"]').focus(), 150);
});

document.getElementById('mfaBack').addEventListener('click', () => showScreen('login'));

/* ---------- Forgot password ---------- */
document.getElementById('forgotLink').addEventListener('click', () => {
  document.getElementById('forgotStepRequest').classList.remove('hidden');
  document.getElementById('forgotStepSent').classList.add('hidden');
  document.getElementById('fieldForgotEmail').classList.remove('has-error');
  showScreen('forgot');
});
document.getElementById('forgotBack').addEventListener('click', () => showScreen('login'));
document.getElementById('forgotBackToLoginBtn').addEventListener('click', () => showScreen('login'));

document.getElementById('forgotSubmit').addEventListener('click', () => {
  const field = document.getElementById('fieldForgotEmail');
  const email = document.getElementById('forgotEmail').value.trim();
  const ok = /\S+@\S+\.\S+/.test(email);
  field.classList.toggle('has-error', !ok);
  if (!ok) return;
  document.getElementById('forgotEmailTarget').textContent = email;
  document.getElementById('forgotStepRequest').classList.add('hidden');
  document.getElementById('forgotStepSent').classList.remove('hidden');
  showToast('Link de redefinição enviado');
});

/* ---------- Register ---------- */
document.getElementById('registerLink').addEventListener('click', () => {
  document.getElementById('registerStepForm').classList.remove('hidden');
  document.getElementById('registerStepSent').classList.add('hidden');
  showScreen('register');
});
document.getElementById('registerBack').addEventListener('click', () => showScreen('login'));
document.getElementById('registerBackToLoginBtn').addEventListener('click', () => showScreen('login'));

document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const required = [
    ['fieldRegCnpj', 'regCnpj'],
    ['fieldRegNome', 'regNome'],
    ['fieldRegSobrenome', 'regSobrenome'],
    ['fieldRegUsuario', 'regUsuario'],
    ['fieldRegEmail', 'regEmail'],
  ];
  let ok = true;
  required.forEach(([fieldId, inputId]) => {
    const val = document.getElementById(inputId).value.trim();
    const valid = inputId === 'regEmail' ? /\S+@\S+\.\S+/.test(val) : val.length > 0;
    document.getElementById(fieldId).classList.toggle('has-error', !valid);
    if (!valid) ok = false;
  });
  const email = document.getElementById('regEmail').value.trim();
  const emailConfirm = document.getElementById('regEmailConfirm').value.trim();
  const emailsMatch = email === emailConfirm && emailConfirm.length > 0;
  document.getElementById('fieldRegEmailConfirm').classList.toggle('has-error', !emailsMatch);
  if (!emailsMatch) ok = false;
  if (!ok) return;

  document.getElementById('registerEmailTarget').textContent = email;
  document.getElementById('registerStepForm').classList.add('hidden');
  document.getElementById('registerStepSent').classList.remove('hidden');
  showToast('Cadastro enviado');
});

let forgotCooldown = 0;
document.getElementById('forgotResend').addEventListener('click', function() {
  if (forgotCooldown > 0) return;
  showToast('Link reenviado');
  forgotCooldown = 20;
  const btn = this;
  btn.disabled = true;
  const original = btn.textContent;
  const tick = () => {
    btn.textContent = 'Reenviar em ' + forgotCooldown + 's';
    forgotCooldown--;
    if (forgotCooldown < 0) { btn.disabled = false; btn.textContent = original; }
    else setTimeout(tick, 1000);
  };
  tick();
});

/* ---------- MFA boxes ---------- */
const mfaInputs = Array.from(document.querySelectorAll('#mfaBoxes input'));
mfaInputs.forEach((inp, idx) => {
  inp.addEventListener('input', () => {
    inp.value = inp.value.replace(/[^0-9]/g, '').slice(0,1);
    if (inp.value && idx < mfaInputs.length - 1) mfaInputs[idx+1].focus();
  });
  inp.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !inp.value && idx > 0) mfaInputs[idx-1].focus();
  });
});

document.getElementById('mfaAutofill').addEventListener('click', () => {
  mfaInputs.forEach((inp, i) => inp.value = '135790'[i] || '1');
  document.getElementById('mfaSubmit').click();
});

document.getElementById('mfaSubmit').addEventListener('click', () => {
  const code = mfaInputs.map(i => i.value).join('');
  const errorEl = document.getElementById('mfaError');
  if (code.length < 6) {
    errorEl.style.display = 'block';
    return;
  }
  errorEl.style.display = 'none';
  showScreen('app');
  if (pendingLandingPage) {
    const link = document.querySelector('.nav-link[data-page="' + pendingLandingPage + '"]');
    if (link) link.click();
    pendingLandingPage = null;
  }
  showToast('Login verificado com sucesso');
});

let resendCooldown = 0;
document.getElementById('mfaResend').addEventListener('click', function() {
  if (resendCooldown > 0) return;
  showToast('Código reenviado para ' + pendingEmail);
  resendCooldown = 20;
  const btn = this;
  btn.disabled = true;
  const original = btn.textContent;
  const tick = () => {
    btn.textContent = 'Reenviar em ' + resendCooldown + 's';
    resendCooldown--;
    if (resendCooldown < 0) {
      btn.disabled = false;
      btn.textContent = original;
    } else {
      setTimeout(tick, 1000);
    }
  };
  tick();
});

/* ---------- Logout ---------- */
document.getElementById('logoutBtn').addEventListener('click', () => {
  document.getElementById('loginForm').reset();
  mfaInputs.forEach(i => i.value = '');
  document.getElementById('fieldEmail').classList.remove('has-error');
  document.getElementById('fieldPassword').classList.remove('has-error');
  captchaVerified = false;
  captchaCheckbox.classList.remove('checked');
  captchaCheckbox.querySelector('i').style.display = 'none';
  document.getElementById('captchaLabel').textContent = 'Não sou um robô';
  document.getElementById('captchaError').style.display = 'none';
  showScreen('login');
});

/* ---------- Mobile sidebar menu ---------- */
const asideEl = document.querySelector('#screenApp aside');
const overlayEl = document.getElementById('sidebarOverlay');
function openSidebar() { asideEl.classList.add('open'); overlayEl.classList.add('show'); }
function closeSidebar() { asideEl.classList.remove('open'); overlayEl.classList.remove('show'); }
document.getElementById('hamburgerBtn').addEventListener('click', openSidebar);
overlayEl.addEventListener('click', closeSidebar);

/* ---------- App nav ---------- */
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    const target = link.getAttribute('data-page');
    pages.forEach(p => p.classList.toggle('hidden', p.id !== 'page-' + target));
    closeSidebar();
    if (target === 'jornada' && typeof openJornadaStage === 'function') {
      openJornadaStage('detalhes');
    }
  });
});

/* ---------- Visão Geral: gráfico de Evolução de acessos (Dia/Mês/Ano) ---------- */
let evolucaoChart = null;
function renderEvolucaoChart(gran) {
  const d = trendDataSets[gran];
  if (evolucaoChart) evolucaoChart.destroy();
  evolucaoChart = new Chart(document.getElementById('chartEvolucao'), {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: [
        { label: 'Human', data: d.human, borderColor: '#8DC63F', backgroundColor: '#8DC63F22', tension: 0.35, borderWidth: 2.5, pointRadius: 2, fill: true },
        { label: 'Bot / RPA', data: d.bot, borderColor: '#F0475A', backgroundColor: '#F0475A22', tension: 0.35, borderWidth: 2.5, pointRadius: 2, fill: true }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
      scales: { x: { grid: { color: getChartGridColor() }, border: { display: false } }, y: { grid: { color: getChartGridColor() }, border: { display: false } } } }
  });
}
document.querySelectorAll('#evolucaoGranularity .tab-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('#evolucaoGranularity .tab-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    renderEvolucaoChart(this.getAttribute('data-gran'));
  });
});

/* ---------- Visão Geral: links do Radar de editais e Top barreiras ---------- */
document.getElementById('verTodosEditaisBtn').addEventListener('click', () => showToast('Abrindo lista completa de editais (simulado)'));
document.getElementById('acionarCopilotoRadarBtn').addEventListener('click', () => {
  document.querySelector('.nav-link[data-page="copiloto"]').click();
  showToast('Abrindo Agente de Reengajamento');
});
document.getElementById('verLogErrosBtn').addEventListener('click', () => {
  document.querySelector('.nav-link[data-page="trafego"]').click();
  showToast('Abrindo log de erros na Qualidade de Tráfego');
});

/* ---------- Header buttons ---------- */
document.getElementById('refreshBtn').addEventListener('click', function() {
  this.classList.add('is-spinning');
  showToast('Dados atualizados');
  setTimeout(() => this.classList.remove('is-spinning'), 500);
});
document.querySelectorAll('#visaoExportMenu [data-export-format]').forEach(function(exBtn) {
  exBtn.addEventListener('click', function() {
    const rows = [
      ['Indicador', 'Valor', 'Variação'],
      ['Sessões totais', '1.084', '86% são bots'],
      ['Acessos humanos', '142', '+18% vs ontem'],
      ['Tempo médio de sessão', '06:42', '+00:38'],
      ['Taxa de conclusão de proposta', '19,7%', '-3,1 pts'],
    ];
    exportRows(rows, 'visao-geral-dashboard', exBtn.getAttribute('data-export-format'), 'Visão Geral · Dashboard');
    document.getElementById('visaoExportMenu').classList.add('hidden');
  });
});

/* ---------- Visão Geral: KPI clicável leva pra Jornada com filtro ---------- */
document.getElementById('kpiTaxaConclusao').addEventListener('click', () => {
  document.querySelector('.nav-link[data-page="jornada"]').click();
  showToast('Filtro aplicado: dados da Taxa de Conclusão de Proposta');
  setTimeout(() => {
    openJornadaStage('iniciou');
    const el = document.getElementById('jornadaDrilldown');
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 150);
});

/* ---------- Jornada: filtros de contexto ---------- */
document.getElementById('jornadaPeriodo').addEventListener('change', function() {
  showToast('Período alterado: ' + this.options[this.selectedIndex].text);
});
document.getElementById('jornadaEdital').addEventListener('input', function() {
  if (this.value.length > 2) showToast('Filtrando jornada pelo edital "' + this.value + '"');
});
document.getElementById('jornadaTrafego').addEventListener('change', function() {
  showToast('Visualização: ' + this.options[this.selectedIndex].text);
});
document.getElementById('verGargalosBtn').addEventListener('click', () => openJornadaStage('iniciou'));
document.getElementById('acionarReengajamentoBtn').addEventListener('click', () => {
  document.querySelector('.nav-link[data-page="copiloto"]').click();
  showToast('Abrindo Agente de Reengajamento com os 5 casos sugeridos');
});

/* ---------- Jornada: drill-down por etapa do funil ---------- */
const jornadaStageData = {
  buscou: { label: 'Buscou edital (111 usuários retidos)', rows: [
    ['55.222.111/0001-77','sess_44120987','Saída natural','Nenhuma ação'],
    ['71.020.998/0001-05','sess_99213345','Inatividade alta','Ver Linha do Tempo'],
    ['12.900.567/0001-40','sess_10238845','Erro de validação','Acionar Agente']
  ]},
  detalhes: { label: 'Abriu detalhes (79 usuários retidos)', rows: [
    ['12.345.678/0001-90','sess_88923411','Erro de validação','Acionar Agente'],
    ['98.765.432/0001-12','sess_77492100','Inatividade alta','Ver Linha do Tempo'],
    ['45.123.789/0001-55','sess_55928122','Saída natural','Nenhuma ação']
  ]},
  inscreveu: { label: 'Inscreveu-se no edital (61 usuários retidos)', rows: [
    ['21.998.457/0001-10','sess_70983321','Inatividade alta','Ver Linha do Tempo'],
    ['12.345.678/0001-90','sess_88011230','Erro de validação','Acionar Agente'],
    ['55.222.111/0001-77','sess_40098871','Saída natural','Nenhuma ação']
  ]},
  iniciou: { label: 'Iniciou proposta (48 usuários retidos)', rows: [
    ['44.111.222/0001-33','sess_36611200','Erro de validação','Acionar Agente'],
    ['33.444.555/0001-22','sess_28873390','Inatividade alta','Ver Linha do Tempo'],
    ['19.870.654/0001-08','sess_19022871','Erro de validação','Acionar Agente']
  ]},
  enviou: { label: 'Enviou proposta (28 usuários, sucesso)', rows: [
    ['98.765.432/0001-11','sess_60011238','Saída natural (sucesso)','Nenhuma ação'],
    ['71.020.998/0001-05','sess_60011901','Saída natural (sucesso)','Nenhuma ação']
  ]}
};
const statusDotColor = { 'Erro de validação': 'var(--red)', 'Inatividade alta': 'var(--amber)', 'Saída natural': 'var(--green)', 'Saída natural (sucesso)': 'var(--green)' };

function openJornadaStage(stage) {
  const data = jornadaStageData[stage];
  if (!data) return;
  document.querySelectorAll('.funnel-step[data-stage]').forEach(s => s.classList.toggle('active-stage', s.getAttribute('data-stage') === stage));
  document.getElementById('drilldownStageName').textContent = data.label;
  document.getElementById('drilldownTableBody').innerHTML = data.rows.map(([cnpj, sess, status, acao]) => `
    <tr>
      <td class="company">${cnpj}</td>
      <td style="color:var(--text-2);">${sess}</td>
      <td><span style="display:inline-flex; align-items:center; gap:6px;"><span style="width:7px;height:7px;border-radius:50%;background:${statusDotColor[status] || 'var(--text-3)'};display:inline-block;"></span>${status}</span></td>
      <td style="text-align:right;"><button class="row-action-btn" data-drilldown-action="${acao}">${acao}</button></td>
    </tr>
  `).join('');
  document.getElementById('jornadaDrilldown').style.display = 'block';
  document.querySelectorAll('[data-drilldown-action]').forEach(btn => {
    btn.addEventListener('click', function() {
      const action = this.getAttribute('data-drilldown-action');
      if (action === 'Acionar Agente') {
        document.querySelector('.nav-link[data-page="copiloto"]').click();
        showToast('Abrindo Agente de Reengajamento para este fornecedor');
      } else if (action === 'Ver Linha do Tempo') {
        showToast('Exibindo linha do tempo da sessão (simulado)');
      } else {
        showToast('Nenhuma ação necessária (saída natural)');
      }
    });
  });
}
document.querySelectorAll('.funnel-step[data-stage]').forEach(step => {
  step.addEventListener('click', () => openJornadaStage(step.getAttribute('data-stage')));
});

/* ---------- Tráfego: toggle de bloqueio automático (MVP = detectar e recomendar) ---------- */
document.getElementById('autoBlockToggle').addEventListener('change', function() {
  if (this.checked) {
    showToast('Bloqueio automático ativado. Equipe de segurança notificada da mudança de política');
  } else {
    showToast('Bloqueio automático desativado. Equipe de segurança notificada para acompanhar de perto');
  }
});

/* ---------- Tráfego: solicitação de desbloqueio (não libera sozinho, avisa a equipe) ---------- */
document.getElementById('solicitarDesbloqueioBtn').addEventListener('click', function() {
  this.textContent = 'Solicitação enviada';
  this.disabled = true;
  showToast('Equipe de segurança notificada para revisar o desbloqueio manualmente');
});

/* ---------- Traffic flags ---------- */
document.querySelectorAll('[data-flag-action]').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    const action = this.getAttribute('data-flag-action');
    this.textContent = action === 'block' ? 'Bloqueado' : 'Em análise';
    this.disabled = true;
    this.closest('[data-flag]').setAttribute('data-status', action === 'block' ? 'Bloqueado' : 'Em análise');
    showToast('IP marcado: ' + this.textContent);
  });
});

/* ---------- Tráfego: busca + filtro de status ---------- */
function applyTrafegoFilters() {
  const search = (document.getElementById('trafegoSearch').value || '').toLowerCase().trim();
  const status = document.getElementById('trafegoStatus').value;
  document.querySelectorAll('#flagList [data-flag]').forEach(row => {
    const text = row.textContent.toLowerCase();
    const rowStatus = row.getAttribute('data-status');
    let ok = !search || text.includes(search);
    if (ok && status !== 'all') ok = rowStatus === status;
    row.classList.toggle('row-hidden', !ok);
  });
}
document.getElementById('trafegoSearch').addEventListener('input', applyTrafegoFilters);
document.getElementById('trafegoStatus').addEventListener('change', applyTrafegoFilters);

/* ---------- Exportação genérica: CSV / Excel / PDF ---------- */
function exportRows(rows, filenameBase, format, title) {
  if (format === 'csv') {
    const csv = rows.map(r => r.map(v => '"' + String(v).replace(/"/g,'""') + '"').join(';')).join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filenameBase + '.csv'; a.click();
    URL.revokeObjectURL(url);
  } else if (format === 'xlsx') {
    const ws = XLSX.utils.aoa_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Dados');
    XLSX.writeFile(wb, filenameBase + '.xlsx');
  } else if (format === 'pdf') {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(13);
    doc.text(title || 'Portalnect Intelligence', 14, 16);
    doc.autoTable({ startY: 22, head: [rows[0]], body: rows.slice(1), styles: { fontSize: 8 }, headStyles: { fillColor: [11, 27, 74] } });
    doc.save(filenameBase + '.pdf');
  }
  showToast((format === 'csv' ? 'CSV' : format === 'xlsx' ? 'Excel' : 'PDF') + ' exportado: ' + filenameBase + '.' + format);
}

/* Abrir/fechar os menus de exportação */
document.querySelectorAll('[data-export-toggle]').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    const menu = this.nextElementSibling;
    document.querySelectorAll('.export-menu').forEach(m => { if (m !== menu) m.classList.add('hidden'); });
    menu.classList.toggle('hidden');
  });
});
document.addEventListener('click', () => document.querySelectorAll('.export-menu').forEach(m => m.classList.add('hidden')));

/* ---------- Tráfego: exportar (CSV/Excel/PDF) ---------- */
document.querySelectorAll('#trafegoExportMenu [data-export-format]').forEach(exBtn => {
  exBtn.addEventListener('click', () => {
  const rows = [['IP','Status','Rota','Categoria da ameaca']];
  document.querySelectorAll('#flagList [data-flag]:not(.row-hidden)').forEach(row => {
    rows.push([
      row.getAttribute('data-ip'),
      row.getAttribute('data-status'),
      row.querySelector('strong').nextSibling ? row.querySelector('strong').nextSibling.textContent.replace('·','').trim() : '',
      row.querySelector('.threat-tag') ? row.querySelector('.threat-tag').textContent : ''
    ]);
  });
  exportRows(rows, 'trafego-suspeito', exBtn.getAttribute('data-export-format'), 'Qualidade de Tráfego');
  document.getElementById('trafegoExportMenu').classList.add('hidden');
  });
});

/* ---------- Tráfego: gráfico de tendência com granularidade ---------- */
let trendChart = null;
const trendDataSets = {
  dia: { labels: ['0h','2h','4h','6h','8h','10h','12h','14h','16h','18h','20h','22h'], human: [1,2,1,3,9,14,18,16,12,8,4,2], bot: [8,14,20,17,12,9,7,6,10,15,19,13] },
  mes: { labels: ['Sem 1','Sem 2','Sem 3','Sem 4'], human: [62,74,68,81], bot: [410,455,398,520] },
  ano: { labels: ['Abr','Mai','Jun','Jul','Ago','Set'], human: [980,1050,1120,1240,1310,1420], bot: [6200,6800,7100,7500,8100,8600] }
};
function renderTrendChart(gran) {
  const d = trendDataSets[gran];
  if (trendChart) trendChart.destroy();
  trendChart = new Chart(document.getElementById('chartTrafficTrend'), {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: [
        { label: 'Humano', data: d.human, borderColor: '#8DC63F', backgroundColor: '#8DC63F22', tension: 0.35, borderWidth: 2.5, pointRadius: 2, fill: true },
        { label: 'Bot / RPA', data: d.bot, borderColor: '#F0475A', backgroundColor: '#F0475A22', tension: 0.35, borderWidth: 2.5, pointRadius: 2, fill: true }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
      scales: { x: { grid: { color: getChartGridColor() }, border: { display: false } }, y: { grid: { color: getChartGridColor() }, border: { display: false } } } }
  });
}
document.querySelectorAll('#trendGranularity .tab-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('#trendGranularity .tab-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    renderTrendChart(this.getAttribute('data-gran'));
  });
});

/* ---------- Tráfego: dossiê de segurança (drawer) ---------- */
const ipDrawerOverlay = document.getElementById('ipDrawerOverlay');
const ipRiskScores = { '187.32.10.45': ['98', 'Scraper de Preços'], '203.0.113.44': ['92', 'Automação Bot'], '198.51.100.12': ['76', 'Automação Bot'], '192.0.2.87': ['65', 'Scraper de Preços'], '200.150.20.11': ['1', 'Humano Válido'] };
document.querySelectorAll('#flagList [data-flag]').forEach(row => {
  row.addEventListener('click', (e) => {
    if (e.target.closest('button')) return;
    const ip = row.getAttribute('data-ip');
    const info = ipRiskScores[ip] || ['—', '—'];
    document.getElementById('ipDrawerIp').textContent = ip;
    document.getElementById('ipDrawerMeta').textContent = 'Status: ' + row.getAttribute('data-status');
    document.getElementById('ipDrawerScore').textContent = info[0];
    document.getElementById('ipDrawerCategoria').textContent = info[1];
    ipDrawerOverlay.classList.add('show');
  });
});
document.getElementById('ipDrawerClose').addEventListener('click', () => ipDrawerOverlay.classList.remove('show'));
ipDrawerOverlay.addEventListener('click', (e) => { if (e.target === ipDrawerOverlay) ipDrawerOverlay.classList.remove('show'); });
/* ---------- Qualidade de tráfego: paginação (simulada) ---------- */
(function () {
  const pagBtns = document.querySelectorAll('#trafegoPagination [data-page]');
  const prevBtn = document.getElementById('trafegoPagePrev');
  const nextBtn = document.getElementById('trafegoPageNext');
  const rangeLabel = document.getElementById('trafegoRangeLabel');
  const totalPages = pagBtns.length;
  let current = 1;

  function render() {
    pagBtns.forEach(btn => btn.classList.toggle('active', Number(btn.dataset.page) === current));
    prevBtn.disabled = current === 1;
    nextBtn.disabled = current === totalPages;
    const start = (current - 1) * 5 + 1;
    const end = Math.min(current * 5, 24);
    rangeLabel.textContent = `Exibindo ${start}–${end} de 24 registros`;
  }

  pagBtns.forEach(btn => btn.addEventListener('click', () => {
    current = Number(btn.dataset.page);
    render();
    showToast('Página ' + current + ' carregada (simulado)');
  }));
  prevBtn.addEventListener('click', () => { if (current > 1) { current--; render(); showToast('Página ' + current + ' carregada (simulado)'); } });
  nextBtn.addEventListener('click', () => { if (current < totalPages) { current++; render(); showToast('Página ' + current + ' carregada (simulado)'); } });
})();

document.getElementById('ipDrawerBlockBtn').addEventListener('click', function() {
  this.textContent = 'IP bloqueado ✓';
  this.disabled = true;
  showToast('IP bloqueado manualmente');
});

/* ---------- Perfis: busca na tabela individual ---------- */
function applyPerfilFilters() {
  const search = (document.getElementById('perfilSearch').value || '').toLowerCase().trim();
  const fornecedor = document.getElementById('perfilFilterFornecedor').value;
  const cnpj = document.getElementById('perfilFilterCnpj').value;
  document.querySelectorAll('#perfilTableBody tr').forEach(row => {
    const matchSearch = !search || row.textContent.toLowerCase().includes(search);
    const matchFornecedor = !fornecedor || row.querySelector('.company').childNodes[0].textContent.trim() === fornecedor;
    const matchCnpj = !cnpj || row.getAttribute('data-cnpj') === cnpj;
    row.style.display = (matchSearch && matchFornecedor && matchCnpj) ? '' : 'none';
  });
}
document.getElementById('perfilSearch').addEventListener('input', applyPerfilFilters);
document.getElementById('perfilFilterFornecedor').addEventListener('change', applyPerfilFilters);
document.getElementById('perfilFilterCnpj').addEventListener('change', applyPerfilFilters);


/* ---------- Perfis: exportar (CSV/Excel/PDF) ---------- */
document.querySelectorAll('#perfisExportMenu [data-export-format]').forEach(function(exBtn) {
  exBtn.addEventListener('click', function() {
    const rows = [['Fornecedor','CNPJ','Score','Acao sugerida']];
    document.querySelectorAll('#perfilTableBody tr').forEach(function(row) {
      if (row.style.display === 'none') return;
      rows.push([
        row.querySelector('.company').childNodes[0].textContent.trim(),
        row.getAttribute('data-cnpj'),
        row.getAttribute('data-score'),
        row.getAttribute('data-acao')
      ]);
    });
    exportRows(rows, 'perfis-fornecedor', exBtn.getAttribute('data-export-format'), 'Perfis de Fornecedor');
    document.getElementById('perfisExportMenu').classList.add('hidden');
  });
});

/* ---------- Perfis: drawer lateral (individual + grupo) ---------- */
const perfilDrawerOverlay = document.getElementById('perfilDrawerOverlay');

function openDrawerSingle(row) {
  document.getElementById('drawerSingleView').classList.remove('hidden');
  document.getElementById('drawerGroupView').classList.add('hidden');
  const name = row.querySelector('.company').childNodes[0].textContent.trim();
  document.getElementById('drawerName').textContent = name;
  document.getElementById('drawerCnpj').textContent = 'CNPJ ' + row.getAttribute('data-cnpj') + ' · ' + row.getAttribute('data-porte') + ' · ' + row.getAttribute('data-categoria');
  const dims = [
    ['Intenção', row.getAttribute('data-intencao')],
    ['Fricção', row.getAttribute('data-friccao')],
    ['Inatividade', row.getAttribute('data-inatividade')],
    ['Valor da oportunidade', row.getAttribute('data-valor')]
  ];
  document.getElementById('drawerDims').innerHTML = dims.map(([label, val]) => {
    const c = parseInt(val)>=70?'var(--red)':(parseInt(val)>=40?'var(--amber)':'var(--green)');
    return `<div class="nc-dim"><div class="nc-dim-label">${label} <span>${val}</span></div><div class="bar-track"><div class="bar-fill" style="width:${val}%;background:${c};"></div></div></div>`;
  }).join('');
  perfilDrawerOverlay.classList.add('show');
}

let drawerGroupRows = [];

function renderDrawerGroupList(q) {
  q = (q || '').trim().toLowerCase();
  const filtered = drawerGroupRows.filter(r => !q || r.name.toLowerCase().includes(q) || r.cnpj.toLowerCase().includes(q));
  if (!filtered.length) {
    document.getElementById('drawerGroupList').innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-3);font-size:12px;">Nenhum fornecedor encontrado</div>';
    return;
  }
  document.getElementById('drawerGroupList').innerHTML = filtered.map(r => {
    const n = parseInt(r.score);
    const barColor = n>=70?'var(--red)':(n>=40?'var(--amber)':'var(--green)');
    return `<div class="dg-supplier">
      <div class="dg-supplier-name">${r.name}</div>
      <div class="dg-supplier-sub">CNPJ ${r.cnpj} · Score: <strong style="color:${barColor}">${r.score}</strong> · ${r.acao}</div>
      <div class="bar-track" style="margin:6px 0 8px;"><div class="bar-fill" style="width:${r.score}%;background:${barColor};"></div></div>
      <div class="dg-dims">${r.dims.map(([l,v])=>{const c=parseInt(v)>=70?'var(--red)':(parseInt(v)>=40?'var(--amber)':'var(--green)');return`<div class="nc-dim"><div class="nc-dim-label">${l} <span>${v}</span></div><div class="bar-track"><div class="bar-fill" style="width:${v}%;background:${c};"></div></div></div>`;}).join('')}</div>
    </div>`;
  }).join('');
}

function openDrawerGroup(sgCard) {
  document.getElementById('drawerSingleView').classList.add('hidden');
  document.getElementById('drawerGroupView').classList.remove('hidden');
  const tagEl = sgCard.querySelector('.tag');
  const statusLabel = tagEl ? tagEl.textContent.trim() : sgCard.getAttribute('data-sgkey');
  document.getElementById('drawerName').textContent = statusLabel;
  document.getElementById('drawerCnpj').textContent = sgCard.querySelector('.sgc-count').textContent;
  const sgKey = sgCard.getAttribute('data-sgkey');
  drawerGroupRows = [];
  document.querySelectorAll(`#perfilTableBody tr[data-sgkey="${sgKey}"]`).forEach(row => {
    drawerGroupRows.push({
      name: row.querySelector('.company').childNodes[0].textContent.trim(),
      cnpj: row.getAttribute('data-cnpj'),
      score: row.getAttribute('data-score'),
      acao: row.getAttribute('data-acao'),
      dims: [['Intenção',row.getAttribute('data-intencao')],['Fricção',row.getAttribute('data-friccao')],['Inatividade',row.getAttribute('data-inatividade')],['Valor',row.getAttribute('data-valor')]]
    });
  });
  const searchEl = document.getElementById('drawerGroupSearch');
  if (searchEl) { searchEl.value = ''; searchEl.oninput = () => renderDrawerGroupList(searchEl.value); }
  renderDrawerGroupList('');
  perfilDrawerOverlay.classList.add('show');
}

document.getElementById('drawerClose').addEventListener('click', () => perfilDrawerOverlay.classList.remove('show'));
perfilDrawerOverlay.addEventListener('click', (e) => { if (e.target === perfilDrawerOverlay) perfilDrawerOverlay.classList.remove('show'); });

/* ---------- Perfis: clique nas linhas da tabela ---------- */
document.querySelectorAll('#perfilTableBody tr').forEach(row => {
  row.style.cursor = 'pointer';
  row.addEventListener('click', (e) => { if (!e.target.closest('button')) openDrawerSingle(row); });
  const btnAcionar = row.querySelector('.pt-acionar');
  if (btnAcionar && !btnAcionar.disabled) btnAcionar.addEventListener('click', (e) => {
    e.stopPropagation();
    if (row.getAttribute('data-goto-copiloto')) {
      document.querySelector('.nav-link[data-page="copiloto"]').click();
      showToast('Abrindo Agente de Reengajamento para ' + row.querySelector('.company').childNodes[0].textContent.trim());
    } else {
      showToast('Ação disparada: ' + (row.getAttribute('data-acao') || ''));
      btnAcionar.textContent = 'Enviado ✓'; btnAcionar.disabled = true;
    }
  });
});

/* ---------- Perfis: botões dos grupos de status ---------- */
document.querySelectorAll('#statusGroupsGrid .status-group-card').forEach(sgCard => {
  const sgKey = sgCard.getAttribute('data-sgkey');
  const btnVer = sgCard.querySelector('.sgc-btn-ver');
  const btnConfirmar = sgCard.querySelector('.sgc-btn-confirmar');
  const btnRecusar = sgCard.querySelector('.sgc-btn-recusar');

  if (btnVer) btnVer.addEventListener('click', () => openDrawerGroup(sgCard));

  if (btnConfirmar && !btnConfirmar.disabled) btnConfirmar.addEventListener('click', () => {
    document.querySelectorAll(`#perfilTableBody tr[data-sgkey="${sgKey}"] .pt-acionar`).forEach(btn => {
      if (!btn.disabled) { btn.textContent = 'Enviado ✓'; btn.disabled = true; }
    });
    sgCard.classList.add('sgc-confirmed');
    const label = sgCard.querySelector('.tag') ? sgCard.querySelector('.tag').textContent.trim() : sgKey;
    showToast('Ação confirmada para todos em: ' + label);
  });

  if (btnRecusar && !btnRecusar.disabled) btnRecusar.addEventListener('click', () => {
    sgCard.classList.add('sgc-refused');
    const label = sgCard.querySelector('.tag') ? sgCard.querySelector('.tag').textContent.trim() : sgKey;
    showToast('Categoria recusada: ' + label);
  });
});

/* ---------- Alertas: badge dinâmico ---------- */
function updateAlertBadge() {
  const openCount = document.querySelectorAll('#alertList [data-alert]:not([data-status="resolvido"])').length;
  const badge = document.querySelector('.nav-link[data-page="alertas"] .badge');
  if (badge) badge.textContent = openCount;
}

/* ---------- Alertas: resolver ---------- */
document.querySelectorAll('[data-resolve]').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    const alertEl = this.closest('[data-alert]');
    alertEl.classList.add('resolved');
    alertEl.setAttribute('data-status', 'resolvido');
    this.innerHTML = '<i class="fa-solid fa-check"></i> Resolvido';
    this.disabled = true;
    this.classList.add('resolved');
    showToast('Alerta marcado como resolvido');
    updateAlertBadge();
    applyAlertFilters();
  });
});

/* ---------- Alertas: filtros por tipo e status ---------- */
function applyAlertFilters() {
  const type = document.getElementById('alertTypeFilter').value;
  const status = document.getElementById('alertStatusFilter').value;
  document.querySelectorAll('#alertList [data-alert]').forEach(el => {
    const typeOk = type === 'all' || el.getAttribute('data-type') === type;
    const statusOk = status === 'all' || el.getAttribute('data-status') === status;
    el.classList.toggle('row-hidden', !(typeOk && statusOk));
  });
  updateBulkBar();
}
document.getElementById('alertTypeFilter').addEventListener('change', applyAlertFilters);
document.getElementById('alertStatusFilter').addEventListener('change', applyAlertFilters);

/* ---------- Alertas: seleção em lote ---------- */
function updateBulkBar() {
  const checked = document.querySelectorAll('#alertList .alert-check:checked');
  document.getElementById('bulkBar').style.display = checked.length ? 'block' : 'none';
  document.getElementById('bulkCount').textContent = checked.length;
  const visible = [...document.querySelectorAll('#alertList [data-alert]')].filter(el => !el.classList.contains('row-hidden'));
  const visibleChecked = visible.filter(el => el.querySelector('.alert-check').checked);
  const selectAll = document.getElementById('alertSelectAll');
  selectAll.checked = visible.length > 0 && visibleChecked.length === visible.length;
  selectAll.indeterminate = visibleChecked.length > 0 && visibleChecked.length < visible.length;
}
document.querySelectorAll('.alert-check').forEach(cb => cb.addEventListener('change', updateBulkBar));
document.getElementById('alertSelectAll').addEventListener('change', function () {
  document.querySelectorAll('#alertList [data-alert]').forEach(el => {
    if (!el.classList.contains('row-hidden')) el.querySelector('.alert-check').checked = this.checked;
  });
  updateBulkBar();
});
document.getElementById('bulkResolve').addEventListener('click', () => {
  document.querySelectorAll('#alertList .alert-check:checked').forEach(cb => {
    const alertEl = cb.closest('[data-alert]');
    alertEl.classList.add('resolved');
    alertEl.setAttribute('data-status', 'resolvido');
    const rBtn = alertEl.querySelector('[data-resolve]');
    if (rBtn) { rBtn.innerHTML = '<i class="fa-solid fa-check"></i> Resolvido'; rBtn.disabled = true; rBtn.classList.add('resolved'); }
    cb.checked = false;
  });
  showToast('Alertas selecionados marcados como resolvidos');
  updateAlertBadge();
  applyAlertFilters();
});
document.getElementById('bulkAssign').addEventListener('click', () => {
  document.querySelectorAll('#alertList .alert-check:checked').forEach(cb => {
    const assignee = cb.closest('[data-alert]').querySelector('.assignee');
    if (assignee) assignee.textContent = 'Você';
    cb.checked = false;
  });
  showToast('Alertas atribuídos a você');
  updateBulkBar();
});

/* ---------- Alertas: atribuir individualmente (selecionando quem) ---------- */
document.querySelectorAll('[data-assign-toggle]').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    const menu = this.nextElementSibling;
    document.querySelectorAll('.export-menu').forEach(m => { if (m !== menu) m.classList.add('hidden'); });
    menu.classList.toggle('hidden');
  });
});
document.querySelectorAll('[data-assign-name]').forEach(opt => {
  opt.addEventListener('click', function(e) {
    e.stopPropagation();
    const name = this.getAttribute('data-assign-name');
    const dropdown = this.closest('.export-dropdown');
    const assignee = dropdown.previousElementSibling;
    assignee.textContent = name;
    dropdown.querySelector('.export-menu').classList.add('hidden');
    showToast('Alerta atribuído a ' + name);
  });
});

/* ---------- Alertas: botão Ver detalhes ---------- */
document.querySelectorAll('[data-detail]').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    const alertEl = this.closest('[data-alert]');
    const type = alertEl.getAttribute('data-type');
    if (type === 'comercial') {
      const cnpj = alertEl.getAttribute('data-cnpj');
      const idx = copilotoCases.findIndex(c => c.cnpj === cnpj);
      if (idx >= 0) coCaseIndex = idx;
      document.querySelector('.nav-link[data-page="copiloto"]').click();
      if (idx >= 0) renderCase();
      showToast('Abrindo caso no Agente de Reengajamento');
    } else {
      document.querySelector('.nav-link[data-page="trafego"]').click();
      showToast('Abrindo dossiê de segurança na Qualidade de Tráfego');
    }
  });
});

/* ---------- Alertas: drill-down (clicar leva pro Copiloto ou pro dossiê de segurança) ---------- */
document.querySelectorAll('.alert-clickable').forEach(el => {
  el.addEventListener('click', function() {
    const alertEl = this.closest('[data-alert]');
    const type = alertEl.getAttribute('data-type');
    if (type === 'comercial') {
      const cnpj = alertEl.getAttribute('data-cnpj');
      const idx = copilotoCases.findIndex(c => c.cnpj === cnpj);
      if (idx >= 0) coCaseIndex = idx;
      document.querySelector('.nav-link[data-page="copiloto"]').click();
      if (idx >= 0) renderCase();
      showToast('Abrindo caso no Agente de Reengajamento');
    } else {
      document.querySelector('.nav-link[data-page="trafego"]').click();
      showToast('Abrindo dossiê de segurança na Qualidade de Tráfego');
    }
  });
});

applyAlertFilters();
updateAlertBadge();

/* ---------- Messages send ---------- */
document.querySelectorAll('[data-send]').forEach(btn => {
  btn.addEventListener('click', function() {
    this.textContent = 'Enviado ✓';
    this.classList.add('sent');
    this.disabled = true;
    showToast('Mensagem enviada aos fornecedores');
  });
});

/* ---------- Automação: regras controláveis ---------- */
(function() {
  const STORAGE_KEY = 'petronect_automacao_regras';
  const GATILHO_LABEL = {
    score_necessidade: 'Score de necessidade',
    prazo_horas_restantes: 'Prazo restante (horas)',
    horas_sem_atividade: 'Horas sem atividade',
    score_risco_trafego: 'Score de risco de tráfego',
  };
  const ACAO_LABEL = {
    enviar_whatsapp: 'enviar mensagem no WhatsApp',
    criar_alerta_crm: 'criar alerta no CRM',
    notificar_reengajamento: 'disparar notificação de reengajamento',
    sinalizar_seguranca: 'sinalizar pra equipe de segurança',
  };
  const DEFAULT_RULES = [
    { id: 'score-alto', nome: 'Score de necessidade alto', gatilho: 'score_necessidade', condicao: { operador: '>=', valor: 80 }, acao: 'enviar_whatsapp', ativo: true },
    { id: 'prazo-curto', nome: 'Prazo do edital acabando', gatilho: 'prazo_horas_restantes', condicao: { operador: '<=', valor: 26 }, acao: 'criar_alerta_crm', ativo: true },
    { id: 'rascunho-parado', nome: 'Proposta em rascunho parada', gatilho: 'horas_sem_atividade', condicao: { operador: '>=', valor: 6 }, acao: 'notificar_reengajamento', ativo: true },
    { id: 'trafego-suspeito', nome: 'Padrão de tráfego suspeito', gatilho: 'score_risco_trafego', condicao: { operador: '>=', valor: 70 }, acao: 'sinalizar_seguranca', ativo: false },
  ];

  let rules = null;

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function saveToStorage() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(rules)); } catch (e) {}
  }

  async function initRules() {
    const cached = loadFromStorage();
    if (cached) { rules = cached; render(); return; }
    try {
      const resp = await fetch('/api/automacao/regras');
      const data = await resp.json();
      rules = data.regras;
    } catch (e) {
      rules = DEFAULT_RULES;
    }
    saveToStorage();
    render();
  }

  function describeRule(r) {
    return 'Se ' + (GATILHO_LABEL[r.gatilho] || r.gatilho) + ' ' + r.condicao.operador + ' ' + r.condicao.valor + ', então ' + (ACAO_LABEL[r.acao] || r.acao) + '.';
  }

  function render() {
    const list = document.getElementById('automacaoRulesList');
    if (!list) return;
    list.innerHTML = rules.map(function(r) {
      return '<div class="automacao-rule' + (r.ativo ? '' : ' is-off') + '" data-rule-id="' + r.id + '">' +
        '<div><div class="automacao-rule-title">' + r.nome + '</div><div class="automacao-rule-desc">' + describeRule(r) + '</div></div>' +
        '<div class="automacao-rule-actions">' +
          '<button class="switch' + (r.ativo ? ' on' : '') + '" data-rule-toggle></button>' +
          '<button class="automacao-del-btn" data-rule-delete title="Remover regra"><i class="fa-regular fa-trash-can"></i></button>' +
        '</div>' +
      '</div>';
    }).join('');

    list.querySelectorAll('[data-rule-toggle]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const id = this.closest('[data-rule-id]').getAttribute('data-rule-id');
        const rule = rules.find(function(r) { return r.id === id; });
        rule.ativo = !rule.ativo;
        saveToStorage();
        render();
        showToast(rule.nome + (rule.ativo ? ': automação ligada' : ': automação desligada, só recomendação'));
      });
    });
    list.querySelectorAll('[data-rule-delete]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const id = this.closest('[data-rule-id]').getAttribute('data-rule-id');
        rules = rules.filter(function(r) { return r.id !== id; });
        saveToStorage();
        render();
        showToast('Regra removida');
      });
    });
  }

  document.getElementById('novaRegraAddBtn').addEventListener('click', function() {
    const gatilho = document.getElementById('novaRegraGatilho').value;
    const operador = document.getElementById('novaRegraOperador').value;
    const valor = Number(document.getElementById('novaRegraValor').value) || 0;
    const acao = document.getElementById('novaRegraAcao').value;
    const nome = GATILHO_LABEL[gatilho] + ' ' + operador + ' ' + valor;
    rules.push({ id: 'regra-' + Date.now(), nome: nome, gatilho: gatilho, condicao: { operador: operador, valor: valor }, acao: acao, ativo: true });
    saveToStorage();
    render();
    showToast('Nova regra de automação criada e já ativa');
  });

  initRules();
})();

/* ---------- Integrações & API ---------- */
(function() {
  const tokenField = document.getElementById('apiTokenField');
  function randomToken(prefix) {
    const chars = 'abcdef0123456789';
    let out = '';
    for (let i = 0; i < 32; i++) out += chars[Math.floor(Math.random() * chars.length)];
    return prefix + '_' + out;
  }
  document.querySelectorAll('#apiEnvTabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('#apiEnvTabs .tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const env = this.getAttribute('data-env');
      tokenField.value = randomToken(env === 'producao' ? 'pna_live' : 'pna_sandbox');
      showToast(env === 'producao' ? 'Ambiente de Produção selecionado, cuidado com dados reais' : 'Ambiente Sandbox selecionado');
    });
  });
  document.getElementById('apiTokenCopyBtn').addEventListener('click', () => {
    tokenField.select();
    try { navigator.clipboard.writeText(tokenField.value); } catch (e) {}
    showToast('Token copiado para a área de transferência');
  });
  document.getElementById('apiHealthCheckBtn').addEventListener('click', async function() {
    const resultEl = document.getElementById('apiHealthResult');
    this.disabled = true;
    resultEl.textContent = 'Consultando /api/health...';
    try {
      const resp = await fetch('/api/health');
      const data = await resp.json();
      resultEl.innerHTML = '<span style="color:var(--green); font-weight:700;">● Online</span> · resposta real da API às ' + new Date(data.timestamp).toLocaleTimeString('pt-BR');
      showToast('Backend real respondeu: status ' + resp.status);
    } catch (e) {
      resultEl.innerHTML = '<span style="color:var(--amber); font-weight:700;">● Sem conexão</span> · este endpoint só existe quando publicado na Vercel (não em preview local)';
      showToast('Não foi possível alcançar /api/health neste preview');
    }
    this.disabled = false;
  });
  document.getElementById('apiTokenRegenBtn').addEventListener('click', function() {
    const activeEnv = document.querySelector('#apiEnvTabs .tab-btn.active').getAttribute('data-env');
    tokenField.value = randomToken(activeEnv === 'producao' ? 'pna_live' : 'pna_sandbox');
    showToast('Novo token gerado. O anterior foi revogado');
  });
  document.getElementById('webhookTestBtn').addEventListener('click', async function() {
    const url = document.getElementById('webhookUrlField').value.trim();
    if (!url) { showToast('Informe a URL do webhook antes de testar'); return; }
    const list = document.getElementById('apiLogList');
    const label = url.replace(/^https?:\/\//, '').slice(0, 34);
    const btn = this;
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    let statusCode = 200;
    let realApi = false;
    try {
      const resp = await fetch('/api/webhook/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo: 'abandono_detectado', destino: url }),
      });
      statusCode = resp.status;
      realApi = true;
    } catch (e) {
      statusCode = 200; // API só existe quando publicado na Vercel; em preview local, simula
    }

    const row = document.createElement('div');
    row.className = 'dh-row';
    row.innerHTML = '<span><span style="color:' + (statusCode < 400 ? 'var(--green)' : 'var(--red)') + '; font-weight:700;">' + statusCode + '</span> POST ' + label + (realApi ? ' <em style="color:var(--text-3); font-style:normal;">(API real)</em>' : '') + '</span><span>agora</span>';
    list.insertBefore(row, list.firstChild);
    showToast(realApi ? 'Evento de teste processado pela API real (/api/webhook/test)' : 'Evento de teste enviado para o webhook (simulado neste preview)');
    btn.disabled = false;
    btn.textContent = original;
  });
})();

/* ---------- Settings toggles ---------- */
document.querySelectorAll('[data-toggle]').forEach(sw => {
  sw.addEventListener('click', function() {
    this.classList.toggle('on');
    const on = this.classList.contains('on');
    const connector = this.getAttribute('data-connector');
    if (connector) {
      const status = this.nextElementSibling;
      status.textContent = on ? 'Conectado' : 'Desconectado';
      status.style.color = on ? 'var(--green)' : 'var(--text-3)';
      showToast(on
        ? connector + ' conectado. Sincronizando automaticamente a partir de agora'
        : connector + ' desconectado. Nada é mais enviado pra lá, mas o histórico já sincronizado continua salvo');
    } else {
      showToast(on ? 'Ativado' : 'Desativado');
    }
  });
});

/* ---------- Configurações: reativação de acesso via CNPJ ---------- */
document.getElementById('reativacaoBtn').addEventListener('click', function() {
  const cnpj = document.getElementById('reativacaoCnpj').value.trim();
  if (!cnpj) { showToast('Digite o CNPJ do fornecedor'); return; }
  this.disabled = true;
  this.textContent = 'Validando...';
  setTimeout(() => {
    showToast('CNPJ validado. Acesso reativado automaticamente, sem chamado');
    this.textContent = 'Validar CNPJ e reativar';
    this.disabled = false;
    document.getElementById('reativacaoCnpj').value = '';
  }, 900);
});

/* ---------- Charts (created once app is shown) ---------- */
/* ---------- Agente de Reengajamento: fila de casos ---------- */
const copilotoCases = [
  {
    nome: 'Tech Supplies Distribuidora Ltda', cnpj: '12.345.678/0001-90', categoria: 'Equipamentos Industriais', porte: 'Médio porte',
    email: 'comercial@techsupplies.com.br', telefone: '(11) 98765-4321', responsavel: 'Marcos Andrade (Gerente Comercial)', historico: 4,
    edital: 'EDT-2026-1024 · Aquisição de Válvulas de Alta Pressão para Refinaria', valorProposta: 'Proposta parcial de R$ 420.000,00 (estimado: R$ 450.000,00)',
    documentos: ['Certidão Negativa de Débitos Federais', 'Certidão Negativa de Débitos Trabalhistas (CNDT)', 'Certificado de Regularidade do FGTS (CRF)', 'Certidão Negativa de Falência e Concordata ⚠ 14,2MB (acima do limite)', 'Balanço Patrimonial e Demonstrações Contábeis', 'Atestado de Capacidade Técnica', 'Contrato Social e última alteração consolidada'],
    prazo: '15/09/2026, 18:00', urgencia: 'Crítica · encerra em <26h',
    score: 92, dims: { intencao: 90, friccao: 95, inatividade: 25, valor: 96 },
    dimsSub: { intencao: 'Preencheu valor e avançou até o upload', friccao: 'Erro de validação + abandono na mesma sessão', inatividade: 'Abandonou há poucos minutos, ainda recente', valor: 'R$ 420 mil, prazo encerra em menos de 26h' },
    diagIntencao: 'Alta intenção de compra', diagSpam: 'Baixo · 1º abandono em 48h', diagEtapa: 'Upload de certidões',
    causaRaiz: 'Barreira técnica na etapa de anexo: o arquivo <b>certidao_negativa_falencia.pdf</b> tem 14.2MB, acima do limite de 10MB (falha de validação Zod).',
    eventos: [
      { ordem: 1, evento: 'Login efetuado', hora: '16:30', detalhe: 'Autenticação via certificado digital / CNPJ', tipo: 'ok' },
      { ordem: 2, evento: 'Busca de edital com sucesso', hora: '16:31', detalhe: 'Acessou o edital EDT-2026-1024', tipo: 'ok' },
      { ordem: 3, evento: 'Preenchimento do valor da proposta', hora: '16:33', detalhe: 'Valor digitado: R$ 420.000,00', tipo: 'ok' },
      { ordem: 4, evento: 'Erro no upload do documento', hora: '16:35', detalhe: 'Falha na validação Zod: certidao_negativa_falencia.pdf excedeu 10MB (arquivo com 14.2MB)', tipo: 'warn' },
      { ordem: 5, evento: 'Abandono da sessão', hora: '16:36', detalhe: 'Usuário fechou a aba sem concluir o envio após a falha de upload', tipo: 'danger' }
    ],
    canais: {
      email: { subject: 'Tech Supplies, precisa de ajuda para concluir a proposta do Edital #1024?', body: 'Olá! Notamos que você iniciou o preenchimento da proposta para o Edital de Válvulas de Alta Pressão (EDT-2026-1024), mas encontrou uma instabilidade ao anexar a Certidão Negativa por conta do tamanho do arquivo.\n\nPara facilitar, liberamos um link seguro temporário para upload de arquivos pesados ou, se preferir, nossa equipe técnica pode te auxiliar a comprimir o documento para concluir seu envio a tempo.\n\nO prazo encerra amanhã às 18:00. Clique no botão abaixo para retomar exatamente de onde parou!' },
      whatsapp: { subject: null, body: 'Oi! Vimos que você tentou enviar a certidão no Edital #1024 mas o arquivo passou do limite de 10MB. Quer que a gente te ajude a comprimir o PDF agora? O prazo fecha amanhã às 18h 🕐' },
      ligacao: { subject: null, body: 'Roteiro: 1) Confirmar se fala com o responsável pela proposta do Edital #1024. 2) Explicar que identificamos erro no upload da certidão (arquivo acima de 10MB). 3) Oferecer ajuda para comprimir o PDF ou link alternativo de envio. 4) Reforçar prazo: encerra amanhã às 18h.' }
    },
    crmTitulo: 'Suporte Técnico a Vendas · CNPJ 12.345.678/0001-90',
    crmResumo: 'Alta intenção (90/100). Tech Supplies chegou até a etapa de upload, mas o PDF da certidão excedeu 10MB (14,2MB). Valor da proposta: R$ 420.000,00. Contato urgente para destravar o envio.',
    crmCanal: 'Canal sugerido: WhatsApp / Telefone direto',
    intentScore: 90, intentLabel: 'Alta intenção',
    intentFactors: [
      { acao: 'Visualizou oportunidade', pontos: 10 },
      { acao: 'Consultou edital EDT-2026-1024', pontos: 15 },
      { acao: 'Iniciou preenchimento da proposta', pontos: 30 },
      { acao: 'Tentou enviar documentação', pontos: 25 },
      { acao: 'Bônus: histórico de 4 editais', pontos: 10 },
    ],
  },
  {
    nome: 'Metalúrgica Aliança', cnpj: '44.111.222/0001-33', categoria: 'Metalurgia', porte: 'Pequeno porte',
    email: 'contato@metalurgicaalianca.com.br', telefone: '(31) 3344-5566', historico: 1,
    edital: 'EDT-2026-1024 · Válvulas de Alta Pressão para Refinaria', valorProposta: 'Proposta parcial de R$ 180.000,00 (estimado: R$ 450.000,00)',
    prazo: '15/09/2026, 18:00', urgencia: 'Alta · encerra em <26h',
    score: 88, dims: { intencao: 82, friccao: 90, inatividade: 30, valor: 80 },
    dimsSub: { intencao: 'Chegou até a etapa de anexo de documentos', friccao: 'Erro ao anexar certidão, tentou 2x', inatividade: 'Abandonou há cerca de 1h', valor: 'Oportunidade relevante para o porte da empresa' },
    diagIntencao: 'Alta intenção de compra', diagSpam: 'Baixo · sem tentativas anteriores hoje', diagEtapa: 'Upload de certidões',
    causaRaiz: 'Mesma barreira técnica do Edital #1024: falha ao validar a <b>certidão negativa</b> no upload, arquivo fora do padrão aceito.',
    eventos: [
      { ordem: 1, evento: 'Login efetuado', hora: '15:02', detalhe: 'Autenticação via certificado digital / CNPJ', tipo: 'ok' },
      { ordem: 2, evento: 'Busca de edital com sucesso', hora: '15:05', detalhe: 'Acessou o edital EDT-2026-1024', tipo: 'ok' },
      { ordem: 3, evento: 'Erro no upload do documento', hora: '15:12', detalhe: 'Falha ao anexar certidão em PDF, 2 tentativas', tipo: 'warn' },
      { ordem: 4, evento: 'Abandono da sessão', hora: '15:14', detalhe: 'Fechou a aba sem concluir o envio', tipo: 'danger' }
    ],
    canais: {
      email: { subject: 'Metalúrgica Aliança, vamos concluir sua proposta do Edital #1024?', body: 'Olá! Vimos que você teve dificuldade para anexar a certidão negativa na sua proposta do Edital #1024.\n\nNossa equipe pode te ajudar a resolver isso rapidamente. É só responder este e-mail ou usar o link de upload alternativo.\n\nO prazo encerra amanhã às 18:00.' },
      whatsapp: { subject: null, body: 'Oi! Percebemos que a certidão não subiu certo no Edital #1024. Bora resolver isso juntos antes do prazo fechar amanhã às 18h?' },
      ligacao: { subject: null, body: 'Roteiro: 1) Confirmar responsável pela proposta. 2) Explicar falha no upload da certidão (2 tentativas sem sucesso). 3) Oferecer suporte técnico direto. 4) Reforçar prazo de amanhã, 18h.' }
    },
    crmTitulo: 'Suporte Técnico a Vendas · CNPJ 44.111.222/0001-33',
    crmResumo: 'Alta intenção (82/100). Metalúrgica Aliança tentou 2x enviar a certidão no Edital #1024 sem sucesso. Proposta parcial de R$ 180.000,00. A persistência indica interesse real.',
    crmCanal: 'Canal sugerido: E-mail / WhatsApp',
    intentScore: 82, intentLabel: 'Alta intenção',
    intentFactors: [
      { acao: 'Visualizou oportunidade', pontos: 10 },
      { acao: 'Consultou edital EDT-2026-1024', pontos: 15 },
      { acao: 'Iniciou preenchimento da proposta', pontos: 30 },
      { acao: 'Tentou enviar documentação (2 tentativas)', pontos: 25 },
      { acao: 'Bônus: persistência (2x)', pontos: 2 },
    ],
  },
  {
    nome: 'Ferragens União', cnpj: '33.444.555/0001-22', categoria: 'Ferragens', porte: 'Médio porte',
    email: 'vendas@ferragensuniao.com.br', telefone: '(41) 3322-1100', historico: 2,
    edital: 'EDT-2026-0998 · Suprimentos de Manutenção Industrial', valorProposta: 'Ainda não iniciou o preenchimento da proposta',
    prazo: '18/09/2026, 18:00', urgencia: 'Moderada · sinais de indecisão',
    score: 79, dims: { intencao: 55, friccao: 60, inatividade: 85, valor: 65 },
    dimsSub: { intencao: 'Visitou o edital 3x mas não iniciou proposta', friccao: 'Voltou à mesma página repetidamente, sinal de dúvida', inatividade: '48h sem nenhum avanço', valor: 'Oportunidade relevante, dentro do histórico do fornecedor' },
    diagIntencao: 'Intenção moderada, indecisão', diagSpam: 'Baixo · 1º contato em 30 dias', diagEtapa: 'Antes de iniciar a proposta',
    causaRaiz: 'Sem erro técnico identificado. O padrão sugere <b>dúvida sobre requisitos do edital</b>, não barreira de sistema.',
    eventos: [
      { ordem: 1, evento: 'Login efetuado', hora: '09:10', detalhe: 'Autenticação via certificado digital / CNPJ (dia 1)', tipo: 'ok' },
      { ordem: 2, evento: 'Visitou o edital', hora: '09:14', detalhe: 'Abriu detalhes do EDT-2026-0998, sem avançar', tipo: 'ok' },
      { ordem: 3, evento: 'Revisitou o edital', hora: '11:40', detalhe: 'Novo acesso à mesma página, 2 dias depois', tipo: 'warn' },
      { ordem: 4, evento: 'Revisitou o edital novamente', hora: '10:05', detalhe: 'Terceira visita em 48h, sem iniciar proposta', tipo: 'danger' }
    ],
    canais: {
      email: { subject: 'Ferragens União, alguma dúvida sobre o Edital #0998?', body: 'Olá! Notamos que você visitou o edital de Suprimentos de Manutenção Industrial algumas vezes nos últimos dias.\n\nSe tiver alguma dúvida sobre os requisitos ou o processo de envio, nossa equipe está à disposição para esclarecer antes do prazo.\n\nO edital encerra em 18/09, às 18:00.' },
      whatsapp: { subject: null, body: 'Oi! Vimos que você já deu uma olhada no Edital #0998 algumas vezes. Alguma dúvida que a gente possa ajudar a esclarecer?' },
      ligacao: { subject: null, body: 'Roteiro: 1) Confirmar interesse no Edital #0998. 2) Perguntar se há dúvida sobre requisitos técnicos ou documentação. 3) Oferecer explicação detalhada do processo. 4) Reforçar prazo: 18/09, 18h.' }
    },
    crmTitulo: 'Follow-up comercial · CNPJ 33.444.555/0001-22',
    crmResumo: 'Intenção moderada (55/100). Ferragens União visitou o Edital #0998 três vezes em 48h sem iniciar proposta, um padrão de indecisão, não erro técnico. Contato consultivo pode destravar.',
    crmCanal: 'Canal sugerido: Ligação',
    intentScore: 55, intentLabel: 'Intenção moderada',
    intentFactors: [
      { acao: 'Visualizou oportunidade', pontos: 10 },
      { acao: 'Consultou edital EDT-2026-0998', pontos: 15 },
      { acao: 'Retornou à mesma oportunidade (3x)', pontos: 20 },
      { acao: 'Bônus: recorrência em 48h', pontos: 10 },
    ],
  },
  {
    nome: 'Comercial Centro-Oeste', cnpj: '55.222.111/0001-77', categoria: 'Serviços Gerais', porte: 'Pequeno porte',
    email: 'contato@comercialcentrooeste.com.br', telefone: '(65) 3211-4488', historico: 0,
    edital: 'EDT-2026-0998 · Suprimentos de Manutenção Industrial', valorProposta: 'Ainda não iniciou o preenchimento da proposta',
    prazo: '18/09/2026, 18:00', urgencia: 'Moderada · primeiro acesso',
    score: 50, dims: { intencao: 45, friccao: 10, inatividade: 15, valor: 55 },
    dimsSub: { intencao: 'Entrou pela primeira vez e visitou o edital', friccao: 'Nenhuma barreira técnica identificada', inatividade: 'Acesso recente, ainda dentro da janela normal', valor: 'Oportunidade relevante para o porte da empresa' },
    diagIntencao: 'Intenção incerta', diagSpam: 'Baixo · primeiro contato', diagEtapa: 'Antes de iniciar a proposta',
    causaRaiz: 'Sem erro técnico. É o <b>primeiro acesso</b> do fornecedor ao portal, ainda avaliando o edital.',
    eventos: [
      { ordem: 1, evento: 'Login efetuado', hora: '09:40', detalhe: 'Primeiro acesso via certificado digital / CNPJ', tipo: 'ok' },
      { ordem: 2, evento: 'Visitou o edital', hora: '09:44', detalhe: 'Abriu detalhes do EDT-2026-0998, sem avançar', tipo: 'ok' },
      { ordem: 3, evento: 'Saiu sem iniciar proposta', hora: '09:52', detalhe: 'Fechou a aba após ler os requisitos do edital', tipo: 'warn' }
    ],
    canais: {
      email: { subject: 'Bem-vindo ao Portal, Comercial Centro-Oeste! Alguma dúvida sobre o Edital #0998?', body: 'Olá! Notamos que este foi seu primeiro acesso ao portal e que você visitou o edital de Suprimentos de Manutenção Industrial.\n\nSe precisar de ajuda para entender os requisitos ou o processo de envio de propostas, nossa equipe está à disposição.\n\nO edital encerra em 18/09, às 18:00.' },
      whatsapp: { subject: null, body: 'Oi! Vimos que você deu uma olhada no Edital #0998 pela primeira vez. Posso te ajudar com alguma dúvida sobre os requisitos?' },
      ligacao: { subject: null, body: 'Roteiro: 1) Dar boas-vindas ao portal. 2) Perguntar se há dúvida sobre o Edital #0998. 3) Explicar o processo de envio de propostas. 4) Reforçar prazo: 18/09, 18h.' }
    },
    crmTitulo: 'Boas-vindas e acompanhamento · CNPJ 55.222.111/0001-77',
    crmResumo: 'Intenção moderada (45/100). Comercial Centro-Oeste acessou o portal pela primeira vez e visitou o Edital #0998. Primeiro contato: boas-vindas e apoio para iniciar a proposta.',
    crmCanal: 'Canal sugerido: E-mail',
    intentScore: 45, intentLabel: 'Intenção moderada',
    intentFactors: [
      { acao: 'Visualizou oportunidade', pontos: 10 },
      { acao: 'Consultou edital EDT-2026-0998', pontos: 15 },
      { acao: 'Bônus: primeiro acesso ao portal', pontos: 20 },
    ],
  },
  {
    nome: 'Suprimentos Novaera Ltda', cnpj: '21.998.457/0001-10', categoria: 'Serviços Gerais', porte: 'Pequeno porte',
    email: 'financeiro@novaerasuprimentos.com.br', telefone: '(19) 3455-2200', historico: 0,
    edital: 'EDT-2026-0998 · Suprimentos de Manutenção Industrial', valorProposta: 'Ainda não iniciou o preenchimento da proposta',
    prazo: '18/09/2026, 18:00', urgencia: 'Baixa · monitorar',
    score: 38, dims: { intencao: 30, friccao: 20, inatividade: 60, valor: 40 },
    dimsSub: { intencao: 'Baixo engajamento histórico no portal', friccao: 'Sem barreira técnica identificada', inatividade: 'Sem retorno há mais de 5 dias', valor: 'Oportunidade de menor porte' },
    diagIntencao: 'Intenção baixa, oportunidade pequena', diagSpam: 'Baixo · sem contatos recentes', diagEtapa: 'Nenhuma proposta iniciada',
    causaRaiz: 'Sem sinal de barreira técnica. Fornecedor com <b>baixo engajamento histórico</b> no portal.',
    eventos: [
      { ordem: 1, evento: 'Login efetuado', hora: '14:05', detalhe: 'Autenticação via certificado digital / CNPJ', tipo: 'ok' },
      { ordem: 2, evento: 'Consultou lista de editais', hora: '14:07', detalhe: 'Navegou pela lista sem abrir detalhes do EDT-2026-0998', tipo: 'ok' },
      { ordem: 3, evento: 'Sessão encerrada por inatividade', hora: '14:11', detalhe: 'Sem nenhuma interação adicional', tipo: 'warn' }
    ],
    canais: {
      email: { subject: 'Novaera Suprimentos, temos oportunidades abertas para o seu perfil', body: 'Olá! Notamos que você acessou o portal recentemente, mas ainda não explorou o Edital #0998 de Suprimentos de Manutenção Industrial.\n\nSe fizer sentido para o seu negócio, ficamos à disposição para esclarecer os requisitos antes do prazo.\n\nO edital encerra em 18/09, às 18:00.' },
      whatsapp: { subject: null, body: 'Oi! Temos o Edital #0998 aberto e pode ser uma boa oportunidade pro seu perfil. Quer que a gente te explique os requisitos?' },
      ligacao: { subject: null, body: 'Roteiro: 1) Confirmar interesse em novas oportunidades no portal. 2) Apresentar o Edital #0998. 3) Perguntar se há barreiras para participar. 4) Reforçar prazo: 18/09, 18h.' }
    },
    crmTitulo: 'Reativação comercial · CNPJ 21.998.457/0001-10',
    crmResumo: 'Intenção baixa (30/100). Suprimentos Novaera tem baixo engajamento histórico e não explorou o Edital #0998. Recomendado contato de reativação e apresentação da oportunidade.',
    crmCanal: 'Canal sugerido: E-mail',
    intentScore: 30, intentLabel: 'Intenção baixa',
    intentFactors: [
      { acao: 'Visualizou lista de editais', pontos: 10 },
      { acao: 'Bônus: acesso recente à plataforma', pontos: 10 },
      { acao: 'Bônus: conta ativa na plataforma', pontos: 10 },
    ],
  }
];

let coCaseIndex = 0;
let coCanalAtivo = 'email';

function renderCaseQueue() {
  const list = document.getElementById('caseQueueList');
  const countLabel = document.getElementById('coQueueCount');
  const searchEl = document.getElementById('coQueueSearch');
  const filterEl = document.getElementById('coQueueFilter');
  const q = (searchEl && searchEl.value || '').trim().toLowerCase();

  const filtered = copilotoCases
    .map((c, i) => ({ c, i }))
    .filter(({ c }) => !q || c.nome.toLowerCase().includes(q) || c.cnpj.toLowerCase().includes(q));

  if (countLabel) countLabel.textContent = filtered.length + (filtered.length === 1 ? ' caso' : ' casos');

  /* populate dropdown once (keep current selection) */
  if (filterEl && filterEl.options.length <= 1) {
    copilotoCases.forEach((c, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = c.nome + ' · CNPJ ' + c.cnpj;
      filterEl.appendChild(opt);
    });
  }

  if (!filtered.length) {
    list.innerHTML = '<tr><td colspan="2" class="co-row-empty"><i class="fa-solid fa-magnifying-glass" style="margin-right:6px;"></i>Nenhum fornecedor encontrado</td></tr>';
    return;
  }

  list.innerHTML = filtered.map(({ c, i }) => {
    const urgColor = c.score >= 85 ? 'var(--red)' : (c.score >= 70 ? 'var(--amber)' : 'var(--green)');
    return `
    <tr class="co-row ${i === coCaseIndex ? 'active' : ''}" data-queue-idx="${i}">
      <td>
        <span class="co-row-name">${c.nome}</span>
        <span class="co-row-meta">CNPJ ${c.cnpj} · ${c.categoria}</span>
      </td>
      <td style="text-align:right;">
        <span class="co-row-score" style="color:${urgColor};">${c.score}</span>
      </td>
    </tr>`;
  }).join('');

  /* sync dropdown selection */
  if (filterEl) filterEl.value = coCaseIndex;

  list.querySelectorAll('[data-queue-idx]').forEach(el => {
    el.addEventListener('click', () => { coCaseIndex = parseInt(el.getAttribute('data-queue-idx'), 10); renderCase(); });
  });
}

const coQueueSearchEl = document.getElementById('coQueueSearch');
if (coQueueSearchEl) coQueueSearchEl.addEventListener('input', renderCaseQueue);

const coQueueFilterEl = document.getElementById('coQueueFilter');
if (coQueueFilterEl) coQueueFilterEl.addEventListener('change', function() {
  if (this.value === '') return;
  coCaseIndex = parseInt(this.value, 10);
  renderCase();
});

function renderCase() {
  const c = copilotoCases[coCaseIndex];
  document.getElementById('coCaseTitle').textContent = c.nome;
  document.getElementById('coCaseSub').textContent = 'Caso ' + (coCaseIndex + 1) + ' de ' + copilotoCases.length + ' na fila';
  document.getElementById('coUrgencyText').textContent = c.urgencia;
  document.getElementById('coFornecedorNome').textContent = c.nome;
  document.getElementById('coFornecedorMeta').textContent = 'CNPJ ' + c.cnpj + ' · ' + c.categoria + ' · ' + c.porte;
  document.getElementById('coEmail').textContent = c.email;
  document.getElementById('coTelefone').textContent = c.telefone;
  document.getElementById('coHistoricoCount').textContent = c.historico === 0 ? 'Nenhum ainda (primeiro contato)' : c.historico + ' editais participados nos últimos 12m';
  document.getElementById('coEditalTitulo').textContent = c.edital;
  document.getElementById('coEditalValor').textContent = c.valorProposta;
  document.getElementById('coPrazo').textContent = c.prazo;
  const docsWrap = document.getElementById('coDocumentosWrap');
  const docsList = document.getElementById('coDocumentosList');
  if (c.documentos && c.documentos.length) {
    docsList.innerHTML = c.documentos.map(d => {
      const isErr = d.includes('⚠');
      return `<div style="display:flex; align-items:center; gap:6px; padding:4px 8px; border-radius:6px; background:${isErr ? 'var(--red-soft,#FFF0EF)' : 'var(--panel)'}; color:${isErr ? 'var(--red)' : 'var(--text-2)'};">${isErr ? '<i class="fa-solid fa-triangle-exclamation" style="font-size:10px; flex-shrink:0;"></i>' : '<i class="fa-solid fa-file-pdf" style="font-size:10px; flex-shrink:0; color:var(--text-3);"></i>'} ${d}</div>`;
    }).join('');
    docsWrap.classList.remove('hidden');
  } else {
    docsWrap.classList.add('hidden');
  }

  // Intent Score
  const iScore = c.intentScore !== undefined ? c.intentScore : c.dims.intencao;
  const iLabel = c.intentLabel || (iScore >= 70 ? 'Alta intenção' : iScore >= 40 ? 'Intenção moderada' : 'Intenção baixa');
  const iColor = iScore >= 70 ? 'var(--green)' : iScore >= 40 ? 'var(--amber)' : 'var(--red)';
  document.getElementById('coCaseSub').textContent = 'Caso ' + (coCaseIndex + 1) + ' de ' + copilotoCases.length + ' na fila · ' + iLabel + ' (' + iScore + '/100)';
  const iNum = document.getElementById('coIntentScoreNum');
  const iLabelEl = document.getElementById('coIntentLabel');
  const iBar = document.getElementById('coIntentBar');
  const iFactors = document.getElementById('coIntentFactorsList');
  if (iNum) { iNum.textContent = iScore; iNum.style.color = iColor; }
  if (iLabelEl) { iLabelEl.textContent = iLabel + ' · ' + iScore + '/100'; iLabelEl.style.color = iColor; }
  if (iBar) { iBar.style.width = iScore + '%'; iBar.style.background = iColor; }
  if (iFactors && c.intentFactors) {
    iFactors.innerHTML = c.intentFactors.map(f =>
      `<div style="font-size:11.5px; color:var(--text-2); display:flex; justify-content:space-between; gap:6px; padding:2px 0;">
        <span style="display:flex; align-items:center; gap:5px;"><i class="fa-solid fa-check" style="color:var(--green); font-size:9.5px; flex-shrink:0;"></i>${f.acao}</span>
        <span style="font-weight:700; color:${iColor}; flex-shrink:0;">+${f.pontos}</span>
      </div>`
    ).join('');
  } else if (iFactors) { iFactors.innerHTML = ''; }

  document.getElementById('coScoreTop').textContent = c.score + ' / 100';
  document.getElementById('coScoreBottom').textContent = c.score;
  document.getElementById('coIntencaoTag').textContent = c.diagIntencao;
  document.getElementById('coDiagIntencao').textContent = c.diagIntencao;
  document.getElementById('coDiagUrgencia').textContent = c.urgencia;
  document.getElementById('coDiagSpam').textContent = c.diagSpam;
  document.getElementById('coDiagEtapa').textContent = c.diagEtapa;
  document.getElementById('coCausaRaiz').innerHTML = c.causaRaiz;
  document.getElementById('coCrmTitulo').textContent = c.crmTitulo;
  document.getElementById('coCrmResumo').textContent = c.crmResumo;
  document.getElementById('coCrmCanal').textContent = c.crmCanal;

  document.getElementById('coDims').innerHTML = ['intencao','friccao','inatividade','valor'].map(k => {
    const label = { intencao: 'Intenção', friccao: 'Fricção', inatividade: 'Inatividade', valor: 'Valor da oportunidade' }[k];
    const val = c.dims[k];
    const color = val >= 70 ? 'var(--red)' : (val >= 40 ? 'var(--amber)' : 'var(--green)');
    return `<div class="nc-dim"><div class="nc-dim-label">${label} <span>${val}</span></div><div class="bar-track"><div class="bar-fill" style="width:${val}%;background:${color};"></div></div><div class="nc-dim-sub">${c.dimsSub[k]}</div></div>`;
  }).join('');

  document.getElementById('copilotoTimeline').innerHTML = c.eventos.map(ev => `
    <div class="co-event ${ev.tipo}">
      <span class="co-time">${ev.hora}</span>
      <span class="co-dot"></span>
      <div><div class="co-title">${ev.ordem}. ${ev.evento}</div><div class="co-detail">${ev.detalhe}</div></div>
    </div>
  `).join('');

  // reset action state
  document.getElementById('outEmail').classList.add('hidden');
  document.getElementById('outCrm').classList.add('hidden');
  document.getElementById('resultButtons').classList.add('hidden');
  const be = document.getElementById('btnGerarEmail'); be.disabled = false; be.textContent = 'Gerar mensagem personalizada';
  const bc = document.getElementById('btnGerarCrm'); bc.disabled = false; bc.textContent = 'Criar alerta no CRM';
  const bs = document.getElementById('btnSendEmail'); bs.disabled = false; bs.textContent = 'Enviar agora';
  coCanalAtivo = 'email';
  document.querySelectorAll('#canalTabs .tab-btn').forEach(t => t.classList.toggle('active', t.getAttribute('data-canal') === 'email'));

  renderCaseQueue();
}

document.getElementById('caseQueuePrev').addEventListener('click', () => { coCaseIndex = (coCaseIndex - 1 + copilotoCases.length) % copilotoCases.length; renderCase(); });
document.getElementById('caseQueueNext').addEventListener('click', () => { coCaseIndex = (coCaseIndex + 1) % copilotoCases.length; renderCase(); });

document.querySelectorAll('#canalTabs .tab-btn').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('#canalTabs .tab-btn').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    coCanalAtivo = this.getAttribute('data-canal');
    if (!document.getElementById('outEmail').classList.contains('hidden')) loadCanalIntoEditor();
  });
});

function loadCanalIntoEditor() {
  const c = copilotoCases[coCaseIndex];
  const canal = c.canais[coCanalAtivo];
  const subjectWrap = document.getElementById('coMsgSubjectWrap');
  if (canal.subject) {
    subjectWrap.style.display = '';
    document.getElementById('coMsgSubject').textContent = canal.subject;
  } else {
    subjectWrap.style.display = 'none';
  }
  document.getElementById('coMsgBody').value = canal.body;
}

const btnGerarEmail = document.getElementById('btnGerarEmail');
btnGerarEmail.addEventListener('click', () => {
  loadCanalIntoEditor();
  document.getElementById('outEmail').classList.remove('hidden');
  showToast('Mensagem gerada pelo Agente de IA');
  btnGerarEmail.disabled = true;
  btnGerarEmail.textContent = 'Mensagem gerada ✓';
});

const btnGerarCrm = document.getElementById('btnGerarCrm');
btnGerarCrm.addEventListener('click', () => {
  document.getElementById('outCrm').classList.remove('hidden');
  showToast('Alerta de prioridade alta criado no CRM');
  btnGerarCrm.disabled = true;
  btnGerarCrm.textContent = 'Alerta criado ✓';
});

document.getElementById('btnRegenEmail').addEventListener('click', () => {
  loadCanalIntoEditor();
  showToast('Nova versão da mensagem gerada');
});

document.getElementById('btnSendEmail').addEventListener('click', function() {
  const c = copilotoCases[coCaseIndex];
  this.textContent = 'Enviado ✓';
  this.disabled = true;
  showToast('Mensagem enviada via ' + (coCanalAtivo === 'email' ? c.email : coCanalAtivo === 'whatsapp' ? 'WhatsApp' : 'roteiro de ligação'));
  document.getElementById('resultButtons').classList.remove('hidden');
});

document.querySelectorAll('[data-result]').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('[data-result]').forEach(b => { b.disabled = true; b.style.opacity = '0.5'; });
    this.style.opacity = '1';
    this.style.outline = '2px solid currentColor';
    showToast('Resultado registrado: ' + this.textContent);
  });
});

renderCase();

let chartsBuilt = false;
function getChartGridColor() {
  return document.getElementById('screenApp').classList.contains('dark-mode') ? '#1B2030' : '#E5E9F4';
}
function getChartTickColor() {
  return document.getElementById('screenApp').classList.contains('dark-mode') ? '#9297AC' : '#7A88B2';
}

function buildCharts() {
  if (chartsBuilt) return;
  chartsBuilt = true;

  const isDark = document.getElementById('screenApp').classList.contains('dark-mode');
  Chart.defaults.color = isDark ? '#9297AC' : '#7A88B2';
  Chart.defaults.font.family = "Inter, sans-serif";
  Chart.defaults.font.size = 11;
  const gridColor = getChartGridColor();
  const blue = '#8DC63F', red = '#F0475A', green = '#8DC63F', amber = '#F5A623', purple = '#FDC82F';

  function lineDataset(label, color, data) {
    return { label, data, borderColor: color, backgroundColor: color + '22', tension: 0.35, borderWidth: 2.5, pointRadius: 3, pointBackgroundColor: color, pointBorderColor: '#0A0D16', pointBorderWidth: 1.5, fill: true };
  }

  renderEvolucaoChart('dia');

  new Chart(document.getElementById('chartPorte'), {
    type: 'bar',
    data: { labels: ['Micro','Pequeno','Médio','Grande','Corporativo'], datasets: [{ label: 'Engajado', data: [8,14,22,17,9], backgroundColor: purple, borderRadius: 5, barPercentage: 0.55 }, { label: 'Novo', data: [5,9,7,4,3], backgroundColor: amber, borderRadius: 5, barPercentage: 0.55 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, border: { display: false } }, y: { grid: { color: gridColor }, border: { display: false } } } }
  });

  new Chart(document.getElementById('chartHumanBot'), {
    type: 'doughnut',
    data: { datasets: [{ data: [86,14], backgroundColor: [red, blue], borderWidth: 0, spacing: 2 }] },
    options: { responsive: true, maintainAspectRatio: false, cutout: '72%', plugins: { legend: { display: false } } }
  });

  renderTrendChart('dia');
}

/* Build charts right after successful MFA (app becomes visible) */
document.getElementById('mfaSubmit').addEventListener('click', () => setTimeout(buildCharts, 50));

/* ======================== TOGGLE MODO CLARO / ESCURO ======================== */
function rebuildAllCharts() {
  // Destroy all existing chart instances before rebuilding
  const canvasIds = ['chartEvolucao', 'chartHumanBot', 'chartPorte', 'chartTrafficTrend',
                     'chartJornada', 'chartEngage', 'chartRisk', 'chartSegComparison'];
  canvasIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) { const c = Chart.getChart(el); if (c) c.destroy(); }
  });
  chartsBuilt = false;
  evolucaoChart = null;
  if (typeof trendChart !== 'undefined') trendChart = null;
  const isDark = document.getElementById('screenApp').classList.contains('dark-mode');
  Chart.defaults.color = isDark ? '#9297AC' : '#7A88B2';
  setTimeout(buildCharts, 30);
}

document.getElementById('themeToggleBtn').addEventListener('click', function() {
  const app = document.getElementById('screenApp');
  const goingDark = app.classList.toggle('dark-mode');
  const icon = document.getElementById('themeIcon');
  icon.className = goingDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  this.title = goingDark ? 'Mudar para modo claro' : 'Mudar para modo escuro';
  try { localStorage.setItem('petronect-theme', goingDark ? 'dark' : 'light'); } catch(e) {}
  rebuildAllCharts();
});

// Restaura o tema salvo ao carregar
(function() {
  let saved;
  try { saved = localStorage.getItem('petronect-theme'); } catch(e) {}
  if (saved === 'dark') {
    document.getElementById('screenApp').classList.add('dark-mode');
    const icon = document.getElementById('themeIcon');
    if (icon) icon.className = 'fa-solid fa-sun';
    const btn = document.getElementById('themeToggleBtn');
    if (btn) btn.title = 'Mudar para modo claro';
  }
})();

/* ---------- Reengajamento automático por tempo (exemplo ao vivo) ---------- */
(function() {
  const nudge = document.getElementById('reengageNudge');
  let shown = false;
  function maybeArm() {
    if (shown) return;
    const app = document.getElementById('screenApp');
    if (app && !app.classList.contains('hidden')) {
      shown = true;
      setTimeout(() => nudge.classList.remove('hidden'), 6000);
    }
  }
  new MutationObserver(maybeArm).observe(document.getElementById('screenApp'), { attributes: true, attributeFilter: ['class'] });
  maybeArm();

  document.getElementById('reengageCloseBtn').addEventListener('click', () => nudge.classList.add('hidden'));
  document.getElementById('reengageDismissBtn').addEventListener('click', () => nudge.classList.add('hidden'));
  document.getElementById('reengageActionBtn').addEventListener('click', () => {
    nudge.classList.add('hidden');
    document.getElementById('resumeDrawerBody').classList.remove('hidden');
    document.getElementById('resumeDrawerSuccess').classList.add('hidden');
    document.getElementById('resumeSubmitBtn').disabled = false;
    document.getElementById('resumeSubmitBtn').innerHTML = 'Concluir e enviar proposta <i class="fa-solid fa-paper-plane"></i>';
    document.getElementById('resumeDrawerOverlay').classList.add('show');
  });
})();

/* ---------- Drawer: retomar preenchimento da proposta ---------- */
(function() {
  const overlay = document.getElementById('resumeDrawerOverlay');
  const close = () => overlay.classList.remove('show');
  document.getElementById('resumeDrawerClose').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.getElementById('resumeSubmitBtn').addEventListener('click', function() {
    this.disabled = true;
    this.innerHTML = 'Enviando... <i class="fa-solid fa-spinner fa-spin"></i>';
    const valor = document.getElementById('resumeValorInput').value.trim() || 'R$ 420.000,00';
    setTimeout(() => {
      document.getElementById('resumeValorConfirmado').textContent = valor;
      document.getElementById('resumeDrawerBody').classList.add('hidden');
      document.getElementById('resumeDrawerSuccess').classList.remove('hidden');
      showToast('Proposta do Edital EDT-2026-1024 enviada com sucesso');
    }, 900);
  });

  /* Trocar arquivo anexado (simulado) */
  document.getElementById('resumeTrocarArquivoBtn').addEventListener('click', () => {
    document.getElementById('resumeArquivoNome').textContent = 'certidao_negativa_falencia_v2.pdf';
    showToast('Novo arquivo anexado (1,8MB · dentro do limite)');
  });

  /* Marcar/desmarcar documentos exigidos */
  document.querySelectorAll('#resumeDocList [data-doc-toggle]').forEach(row => {
    row.addEventListener('click', function() {
      const status = this.querySelector('span:last-child');
      const anexado = status.innerHTML.includes('Anexado');
      if (anexado) {
        status.innerHTML = '<i class="fa-regular fa-circle"></i> Pendente';
        status.style.color = 'var(--text-3)';
      } else {
        status.innerHTML = '<i class="fa-solid fa-check"></i> Anexado';
        status.style.color = 'var(--green)';
      }
    });
  });
})();

