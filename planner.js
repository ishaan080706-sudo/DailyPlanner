/* ─────────────────────────────────────────────────────────────────────────────
   planner.js  ·  Adaptive Timetable · Workload Warning · What-If · Exam Mode · Assignments
   ───────────────────────────────────────────────────────────────────────────── */
const ASSIGN_KEY = 'tt_assignments_v1';
let _examMode   = false;

// Normal-mode baseline hours (computed from schedule summaries)
const BASE_HOURS_NORMAL = {dsa:11, skill:9, college:7, read:2.25, leisure:11.75};
// Exam-mode baseline hours
const BASE_HOURS_EXAM   = {dsa:3,  skill:1.5, college:25, read:0, leisure:8.25};

let BASE_HOURS     = {...BASE_HOURS_NORMAL};
let _whatIfState   = {...BASE_HOURS_NORMAL};

/* ═══════════════════════════════════════════════════════════════════════════
   ADAPTIVE TIMETABLE
   ═══════════════════════════════════════════════════════════════════════════ */
function runAdaptive() {
  const store = loadStore();
  const today = new Date(); today.setDate(today.getDate()-7);
  const lastWk = getISOWeek(today);

  const cats = { dsa:{done:0,total:0}, skill:{done:0,total:0},
                 college:{done:0,total:0}, read:{done:0,total:0} };

  DAY_KEYS.forEach(dk => {
    SCHEDULE[dk].slots.forEach((s,i) => {
      const cat = s.c;
      if (!s.major || !(cat in cats)) return;
      cats[cat].total++;
      if (isChecked(store, lastWk, dk, i)) cats[cat].done++;
    });
  });

  const el = document.getElementById('adaptiveContent'); if (!el) return;
  const hasData = Object.values(cats).some(c=>c.total>0);
  if (!hasData) {
    el.innerHTML = `<div class="ada-empty">📭 No last-week data yet.<br/>Track tasks for a week and come back for personalized insights.</div>`;
    return;
  }

  const LABELS = {dsa:'🧩 DSA',skill:'💻 Skill Dev',college:'📘 College Work',read:'📖 Reading'};
  const COLORS  = {dsa:'var(--dsa)',skill:'var(--skill)',college:'var(--college)',read:'var(--read)'};

  const recs = Object.entries(cats).map(([cat,data])=>{
    const p = data.total ? Math.round(data.done/data.total*100) : 0;
    let action, advice, tip='';
    if      (p>=90){action='maintain';advice=`Excellent ${p}% completion — keep it up.`;}
    else if (p>=70){action='tweak';   advice=`Good progress (${p}%). Small tweaks can push this to 90%+.`;
                                      tip='💡 Try starting this earlier in the day.'; }
    else if (p>=50){action='adjust';  advice=`Moderate completion (${p}%). Sessions may be too long or poorly timed.`;
                                      tip='💡 Move sessions to Wed/Thu when you have more free time.'; }
    else           {action='reduce';  advice=`Low completion (${p}%). The current workload seems unrealistic.`;
                                      tip='💡 Reduce session length or cut one session per week.'; }
    return {cat,p,action,advice,tip};
  });

  const avg = Math.round(recs.reduce((a,r)=>a+r.p,0)/recs.length);
  const avgCol = avg>=70?'var(--green)':avg>=50?'var(--accent2)':'#f87171';

  el.innerHTML = `
    <div class="ada-header">
      <span>📅 Based on: ${weekToLabel(lastWk)}</span>
      <span style="font-weight:800;color:${avgCol}">Avg: ${avg}%</span>
    </div>
    ${recs.map(r=>`
      <div class="ada-card ada-${r.action}">
        <div class="ada-card-top">
          <span style="color:${COLORS[r.cat]};font-weight:700">${LABELS[r.cat]}</span>
          <span class="ada-badge ada-${r.action}">${{maintain:'✅ Maintain',tweak:'⚡ Tweak',adjust:'🔧 Adjust',reduce:'⬇️ Reduce'}[r.action]}</span>
          <span style="font-family:'Outfit',sans-serif;font-size:1.1rem;font-weight:800;color:${r.p>=70?'var(--green)':'#f87171'}">${r.p}%</span>
        </div>
        <p class="ada-advice">${r.advice}</p>
        ${r.tip?`<div class="ada-tip">${r.tip}</div>`:''}
      </div>`).join('')}
    <div class="ada-note">💡 These recommendations update each week based on your actual tracking data.</div>`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   WORKLOAD WARNING
   ═══════════════════════════════════════════════════════════════════════════ */
function checkWorkload() {
  const hours = typeof getWeeklyHours === 'function' ? getWeeklyHours() : BASE_HOURS;
  const studyHours = (hours.dsa||0) + (hours.skill||0) + (hours.college||0) + (hours.read||0);
  const gymHours   = hours.gym || 0;
  const ROUTINE_CLASS = 35; // ~5h/day routine+travel+meals + avg class hours
  const TOTAL_PLANNED = studyHours + gymHours + ROUTINE_CLASS;
  const AVAILABLE = 112;
  const overload  = TOTAL_PLANNED - AVAILABLE;
  const el  = document.getElementById('workloadWarn');
  const txt = document.getElementById('workloadWarnText');
  if (!el) return;

  if (overload > 10) {
    el.className = 'workload-warn danger';
    txt.innerHTML = `<strong>🚨 ${TOTAL_PLANNED}h planned</strong>, ~${AVAILABLE}h available — <strong style="color:#f87171">${overload}h overload!</strong> Consider reducing study blocks slightly.`;
    el.style.display='flex';
  } else if (overload > 0) {
    el.className = 'workload-warn caution';
    txt.innerHTML = `<strong>⚠️ ${TOTAL_PLANNED}h planned</strong>, ~${AVAILABLE}h available — ${overload}h tight. Manageable but leaves little buffer.`;
    el.style.display='flex';
  } else {
    el.style.display='none';
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   WHAT-IF PLANNER
   ═══════════════════════════════════════════════════════════════════════════ */
const WI_CATS = [
  {k:'dsa',    label:'🧩 DSA',        color:'var(--dsa)',    max:20},
  {k:'skill',  label:'💻 Skill Dev',  color:'var(--skill)',  max:20},
  {k:'college',label:'📘 College',    color:'var(--college)',max:30},
  {k:'gym',    label:'🏋️ Gym',        color:'var(--gym)',    max:14},
  {k:'read',   label:'📖 Reading',    color:'var(--read)',   max:10},
  {k:'leisure',label:'🎮 Leisure',    color:'var(--leisure)',max:20},
];

function initWhatIf() {
  _whatIfState = {...BASE_HOURS};
  renderWhatIfSliders();
}

function renderWhatIfSliders() {
  const el = document.getElementById('wiSliders'); if (!el) return;
  el.innerHTML = WI_CATS.map(c=>`
    <div class="wi-row">
      <div class="wi-label" style="color:${c.color}">${c.label}</div>
      <input type="range" class="wi-range" min="0" max="${c.max}" step="0.5"
        value="${_whatIfState[c.k]}" style="accent-color:${c.color}"
        oninput="wiChange('${c.k}',+this.value,this.nextElementSibling)"/>
      <div class="wi-val" style="color:${c.color}">${_whatIfState[c.k]}h</div>
    </div>`).join('');
  renderWhatIfImpact();
}

function wiChange(key, val, valEl) {
  _whatIfState[key] = val;
  if (valEl) valEl.textContent = val+'h';
  renderWhatIfImpact();
}

function renderWhatIfImpact() {
  const el = document.getElementById('wiImpact'); if (!el) return;
  const newTotal  = Object.values(_whatIfState).reduce((a,b)=>a+b,0);
  const baseTotal = Object.values(BASE_HOURS).reduce((a,b)=>a+b,0);
  const diff      = +(newTotal - baseTotal).toFixed(1);
  const AVAIL     = 56; // free hours (excl. classes+routine)
  const over      = +(newTotal - AVAIL).toFixed(1);

  const changes = WI_CATS.filter(c=>_whatIfState[c.k]!==BASE_HOURS[c.k]);
  el.innerHTML = `
    <div class="wi-impact-title ${over>0?'over':'ok'}">${over>0?`⚠️ ${newTotal}h/wk — ${over}h over free time`:`✅ ${newTotal}h/wk — fits within schedule`}</div>
    ${changes.length?changes.map(c=>{
      const d=+(_whatIfState[c.k]-BASE_HOURS[c.k]).toFixed(1);
      return `<div class="wi-delta" style="color:${d>0?'var(--green)':'#f87171'}">${d>0?'▲':'▼'} ${c.label}: <strong>${d>0?'+':''}${d}h</strong> (${BASE_HOURS[c.k]} → ${_whatIfState[c.k]}h)</div>`;
    }).join(''):'<div class="wi-nochange">No changes from baseline.</div>'}
    ${diff!==0?`<div class="wi-total-delta">Total change: <strong style="color:${diff>0?'#f87171':'var(--green)'}">${diff>0?'+':''}${diff}h</strong></div>`:''}`;
}

function resetWhatIf() { initWhatIf(); }

/* ═══════════════════════════════════════════════════════════════════════════
   EXAM MODE
   ═══════════════════════════════════════════════════════════════════════════ */
function toggleExamMode() {
  _examMode = !_examMode;

  // Swap the active schedule
  SCHEDULE   = _examMode ? SCHEDULE_EXAM   : SCHEDULE_NORMAL;
  BASE_HOURS = _examMode ? BASE_HOURS_EXAM : BASE_HOURS_NORMAL;
  _whatIfState = {...BASE_HOURS};

  const btn    = document.getElementById('examToggle');
  const banner = document.getElementById('examBanner');
  if (btn) {
    btn.textContent = _examMode ? '📚 EXAM MODE ON' : '🎓 Normal Mode';
    btn.classList.toggle('exam-on', _examMode);
  }
  if (banner) banner.style.display = _examMode ? 'flex' : 'none';

  // Re-render everything with new schedule
  const store = loadStore();
  DAY_KEYS.forEach(dk => renderSchedule(dk, store));
  updateAllProgress(store);
  renderWeeklyBars();
  if (typeof checkWorkload === 'function') checkWorkload();

  showToast(_examMode
    ? '📚 Exam Mode ON — College Study prioritized!'
    : '🎓 Normal Mode — Back to DSA + Skill Dev focus!');
}

/* ═══════════════════════════════════════════════════════════════════════════
   ASSIGNMENT TRACKER
   ═══════════════════════════════════════════════════════════════════════════ */
function assignStore() { try{return JSON.parse(localStorage.getItem(ASSIGN_KEY))||[];}catch{return[];} }
function saveAssign(s) { localStorage.setItem(ASSIGN_KEY,JSON.stringify(s)); }

function addAssignment() {
  const title   = document.getElementById('asgTitle')?.value.trim();
  const due     = document.getElementById('asgDue')?.value;
  const subject = document.getElementById('asgSubject')?.value.trim();
  const estH    = parseFloat(document.getElementById('asgHours')?.value)||1;
  const pri     = document.getElementById('asgPri')?.value||'medium';
  if (!title||!due) { showToast('❌ Title and due date required'); return; }

  const s = assignStore();
  s.push({ id:Date.now(), title, due, subject, estH, pri, status:0, note:'' });
  saveAssign(s);
  renderAssignments();
  document.getElementById('asgTitle').value='';
  document.getElementById('asgDue').value='';
  document.getElementById('asgSubject').value='';
  document.getElementById('asgHours').value='';
  showToast('📝 Assignment added!');
}

function setAsgStatus(id, val) {
  const s = assignStore(); const a=s.find(x=>x.id===id);
  if (a){ a.status=+val; saveAssign(s); }
  document.getElementById(`asg-pct-${id}`).textContent=val+'%';
}

function deleteAssignment(id) {
  saveAssign(assignStore().filter(x=>x.id!==id));
  renderAssignments();
  showToast('🗑️ Assignment removed');
}

function renderAssignments() {
  const el = document.getElementById('asgList'); if (!el) return;
  const list = assignStore().sort((a,b)=>new Date(a.due)-new Date(b.due));
  if (!list.length) { el.innerHTML='<div class="no-asg">No assignments yet — add one above! 📝</div>'; return; }

  const PRI_COLOR = {high:'#f87171',medium:'#fb923c',low:'#4ade80'};
  const PRI_ICON  = {high:'🔴',medium:'🟡',low:'🟢'};

  el.innerHTML = list.map(a=>{
    const dueD    = new Date(a.due);
    const todayD  = new Date(); todayD.setHours(0,0,0,0);
    const days    = Math.ceil((dueD-todayD)/86400000);
    const overdue = days<0, urgent=(days<=2&&!overdue), done=(a.status>=100);
    const dueLabel= done?'✅ Done':overdue?`⚠️ ${Math.abs(days)}d overdue`:days===0?'⏰ Due today!':urgent?`⏰ ${days}d left`:`📅 ${days}d left`;
    const dueCol  = done?'var(--green)':overdue?'#f87171':urgent?'#fb923c':'var(--muted)';
    return `<div class="asg-card ${done?'asg-done':overdue?'asg-overdue':urgent?'asg-urgent':''}">
      <div class="asg-row1">
        <div class="asg-title">${PRI_ICON[a.pri]} ${a.title}</div>
        <div class="asg-due" style="color:${dueCol}">${dueLabel}</div>
        <button class="asg-del" onclick="deleteAssignment(${a.id})">✕</button>
      </div>
      ${a.subject?`<div class="asg-subject">${a.subject} · ${a.estH}h est.</div>`:`<div class="asg-subject">${a.estH}h estimated</div>`}
      <div class="asg-prog-row">
        <input type="range" min="0" max="100" value="${a.status}" class="asg-slider"
          style="accent-color:${PRI_COLOR[a.pri]}"
          oninput="setAsgStatus(${a.id},this.value)"/>
        <span class="asg-pct" id="asg-pct-${a.id}" style="color:${PRI_COLOR[a.pri]}">${a.status}%</span>
      </div>
    </div>`;
  }).join('');

  const total=list.length, done=list.filter(a=>a.status>=100).length, overdue=list.filter(a=>{const d=new Date(a.due);return d<new Date()&&a.status<100;}).length;
  const sumEl = document.getElementById('asgSummary');
  if (sumEl) sumEl.innerHTML = `<span>${total} assignments</span><span style="color:var(--green)">${done} done</span>${overdue?`<span style="color:#f87171">${overdue} overdue</span>`:''}`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   PLANNER TAB INIT
   ═══════════════════════════════════════════════════════════════════════════ */
function initPlanner() {
  runAdaptive();
  initWhatIf();
  renderAssignments();
}
