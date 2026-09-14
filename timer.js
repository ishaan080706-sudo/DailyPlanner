/* ─────────────────────────────────────────────────────────────────────────────
   timer.js  ·  Focus Session Timer  +  Planned vs Actual
   ───────────────────────────────────────────────────────────────────────────── */
const SESSIONS_KEY = 'tt_sessions_v1';

function sessStore()   { try{return JSON.parse(localStorage.getItem(SESSIONS_KEY))||{};}catch{return{};} }
function saveSess(s)   { localStorage.setItem(SESSIONS_KEY,JSON.stringify(s)); }

let _tmr = { active:false, remaining:0, planned:0, interval:null,
             dayKey:'', idx:-1, name:'', startTs:0 };

/* ── OPEN MODAL ─────────────────────────────────────────────────────────── */
function showTimerModal(name, dayKey, idx) {
  _tmr = { ..._tmr, name, dayKey, idx, active:false, remaining:0 };
  clearInterval(_tmr.interval);
  const el = document.getElementById('timerModal');
  if (!el) return;
  document.getElementById('tmrName').textContent   = name;
  document.getElementById('tmrDisplay').textContent = '00:00';
  document.getElementById('tmrStatus').textContent  = 'Pick a duration and start.';
  document.querySelectorAll('.tm-dur-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tmrStop').disabled     = true;
  document.getElementById('tmrCustom').value      = '';
  el.classList.add('open');
}
function closeTimerModal() {
  if (_tmr.active) finishTimer(false);
  document.getElementById('timerModal').classList.remove('open');
}

/* ── START / STOP ───────────────────────────────────────────────────────── */
function startFocus(mins, btn) {
  if (_tmr.active) return;
  document.querySelectorAll('.tm-dur-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  _tmr.active    = true;
  _tmr.planned   = mins;
  _tmr.remaining = mins * 60;
  _tmr.startTs   = Date.now();
  updateTimerDisplay();
  _tmr.interval = setInterval(timerTick, 1000);
  document.getElementById('tmrStatus').textContent = `⏱️ ${mins} min session running…`;
  document.getElementById('tmrStop').disabled = false;
}

function startCustomFocus() {
  const v = parseInt(document.getElementById('tmrCustom').value);
  if (!v || v < 1 || v > 300) { showToast('Enter 1–300 min'); return; }
  startFocus(v, null);
}

function timerTick() {
  _tmr.remaining = Math.max(0, _tmr.remaining - 1);
  updateTimerDisplay();
  if (_tmr.remaining <= 0) finishTimer(true);
}

function updateTimerDisplay() {
  const m = String(Math.floor(_tmr.remaining/60)).padStart(2,'0');
  const s = String(_tmr.remaining%60).padStart(2,'0');
  document.getElementById('tmrDisplay').textContent = `${m}:${s}`;
}

function finishTimer(completed) {
  clearInterval(_tmr.interval);
  _tmr.active = false;
  const actual = Math.max(1, Math.round((_tmr.planned*60 - _tmr.remaining) / 60));
  _logSession(_tmr.dayKey, _tmr.idx, _tmr.planned, actual);
  const msg = completed
    ? `✅ Session complete! ${actual} min logged.`
    : `⏹️ Stopped — ${actual} min logged.`;
  document.getElementById('tmrStatus').textContent = msg;
  document.getElementById('tmrStop').disabled = true;
  document.querySelectorAll('.tm-dur-btn').forEach(b => b.classList.remove('active'));
  showToast(`⏱️ ${actual} min logged for "${_tmr.name}"`);
  if (completed) _playChime();
  renderPvA();
  if (typeof checkAchievements === 'function') checkAchievements();
}

function stopTimer() { if (_tmr.active) finishTimer(false); }

function _playChime() {
  try {
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    [523,659,784].forEach((freq,i) => {
      const o=ctx.createOscillator(), g=ctx.createGain();
      o.frequency.value=freq; g.gain.setValueAtTime(.3,ctx.currentTime+i*.15);
      g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+i*.15+.4);
      o.connect(g); g.connect(ctx.destination);
      o.start(ctx.currentTime+i*.15); o.stop(ctx.currentTime+i*.15+.4);
    });
  } catch {}
}

/* ── STORAGE ────────────────────────────────────────────────────────────── */
function _logSession(dayKey, idx, planned, actual) {
  const s = sessStore();
  const key = `${currentWeek}__${dayKey}__${idx}`;
  if (!s[key]) s[key] = [];
  s[key].push({ planned, actual, ts: Date.now() });
  saveSess(s);
}

function getTotalSessions() {
  return Object.values(sessStore()).reduce((a,arr)=>a+arr.length, 0);
}

/* ── PLANNED vs ACTUAL ──────────────────────────────────────────────────── */
const CAT_PLANNED = { dsa:11, skill:9, college:7, read:2.25, gym:12, leisure:11.75 };
const CAT_META = [
  {k:'dsa',    label:'🧩 DSA',       color:'var(--dsa)'},
  {k:'skill',  label:'💻 Skill Dev', color:'var(--skill)'},
  {k:'college',label:'📘 College',   color:'var(--college)'},
  {k:'gym',    label:'🏋️ Gym',       color:'var(--gym)'},
  {k:'read',   label:'📖 Reading',   color:'var(--read)'},
  {k:'leisure',label:'🎮 Leisure',   color:'var(--leisure)'},
];

function getActualHours(week) {
  const s = sessStore();
  const res = {dsa:0,skill:0,college:0,read:0,gym:0,leisure:0};
  Object.entries(s).forEach(([key,sessions]) => {
    const [wk,dk,idx] = key.split('__');
    if (wk !== week) return;
    const slot = SCHEDULE[dk]?.slots[parseInt(idx)];
    if (!slot || !(slot.c in res)) return;
    res[slot.c] += sessions.reduce((a,b)=>a+b.actual,0)/60;
  });
  return res;
}

function renderPvA() {
  const el = document.getElementById('pvaContent'); if (!el) return;
  const actual = getActualHours(currentWeek);
  const hasAny = Object.values(actual).some(v=>v>0);
  if (!hasAny) {
    el.innerHTML = `<div class="pva-empty">Start a ⏱️ Focus Session on any task to track actual time here.</div>`;
    return;
  }
  el.innerHTML = `
    <table class="pva-table">
      <thead><tr><th>Category</th><th>Planned</th><th>Actual</th><th>Efficiency</th></tr></thead>
      <tbody>${CAT_META.map(c=>{
        const p=CAT_PLANNED[c.k], a=actual[c.k]||0;
        const eff=p>0?Math.round(a/p*100):0;
        const col=eff>=90?'var(--green)':eff>=60?'var(--accent2)':'#f87171';
        const bar=Math.min(100,eff);
        return `<tr>
          <td><span class="pva-dot" style="background:${c.color}"></span>${c.label}</td>
          <td>${p}h</td>
          <td><strong style="color:${c.color}">${a.toFixed(1)}h</strong></td>
          <td>
            <div class="pva-bar-wrap">
              <div class="pva-bar" style="width:${bar}%;background:${col}"></div>
            </div>
            <span style="color:${col};font-weight:800;font-size:.85rem">${eff}%</span>
          </td>
        </tr>`;
      }).join('')}</tbody>
    </table>`;
}

/* ── INJECT FOCUS BUTTON ON MAJOR SLOTS ─────────────────────────────────── */
/* Called from showDay override in features.js — patches after render */
function injectFocusButtons(dayKey) {
  const container = document.getElementById('sched-'+dayKey); if (!container) return;
  SCHEDULE[dayKey].slots.forEach((s,i)=>{
    if (!s.major) return;
    const slotEls = [...container.querySelectorAll('.slot')];
    const el = slotEls.find(e=>e.querySelector('.slot-name')?.textContent===s.name);
    if (!el || el.querySelector('.focus-btn')) return;
    const btn = document.createElement('button');
    btn.className = 'focus-btn'; btn.textContent = '▶';
    btn.title = `Start focus session: ${s.name}`;
    btn.onclick = e => { e.stopPropagation(); showTimerModal(s.name, dayKey, i); };
    el.querySelector('.slot-body').appendChild(btn);
  });
}
