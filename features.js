/* features.js — Streak · Energy Log · Miss Reasons · Export · Analytics */

const MOOD_KEY   = 'tt_mood_v1';
const REASON_KEY = 'tt_reasons_v1';

const REASONS = [
  {id:'tired',   icon:'😴', label:'Tired'},
  {id:'busy',    icon:'📚', label:'Too Busy'},
  {id:'forgot',  icon:'🤔', label:'Forgot'},
  {id:'skipped', icon:'⏭️', label:'Skipped it'},
  {id:'other',   icon:'✏️', label:'Other'},
];

function moodStore()   { try{return JSON.parse(localStorage.getItem(MOOD_KEY))||{};}catch{return{};} }
function saveMood(s)   { localStorage.setItem(MOOD_KEY,JSON.stringify(s)); }
function reasonStore() { try{return JSON.parse(localStorage.getItem(REASON_KEY))||{};}catch{return{};} }
function saveReason(s) { localStorage.setItem(REASON_KEY,JSON.stringify(s)); }

// ── STREAK ──────────────────────────────────────────────────────────────────
function calcStreak() {
  const store = loadStore();
  const today = new Date();
  const todayIdx = (today.getDay()+6)%7;
  const todayWk  = getISOWeek(today);
  const weeks = [...new Set([todayWk,...Object.keys(store).map(k=>k.split('__')[0])])].sort().reverse();
  let streak=0, going=true;
  for(const wk of weeks) {
    if(!going) break;
    const maxD = wk===todayWk ? todayIdx : 6;
    for(let d=maxD; d>=0; d--) {
      const {total,done}=countDay(store,wk,DAY_KEYS[d]);
      if(!total) continue;
      if(pct(done,total)>=70) streak++;
      else { going=false; break; }
    }
  }
  return streak;
}

function updateStreakUI() {
  const s=calcStreak();
  const el=document.getElementById('streakNum');  if(!el) return;
  el.textContent=s;
  const icon=document.getElementById('streakIcon');
  if(icon) icon.textContent = s>=14?'🔥🔥🔥':s>=7?'🔥🔥':s>=3?'🔥':s>0?'✨':'💤';
  const sub=document.getElementById('streakSub');
  if(sub) sub.textContent = s===0?'Start your streak!':s===1?'1 day going!':s+' days going!';
  const card=document.getElementById('streakCard');
  if(card) {
    if(s>=7) card.style.borderColor='rgba(34,197,94,0.4)';
    else if(s>=3) card.style.borderColor='rgba(251,146,60,0.4)';
    else card.style.borderColor='var(--border)';
  }
}

// ── ENERGY LOG ──────────────────────────────────────────────────────────────
function setEnergy(week,day,val) {
  const s=moodStore();
  const cur=s[`${week}__${day}`];
  s[`${week}__${day}`] = (cur===val ? 0 : val); // toggle off if same
  saveMood(s);
  paintEnergy(day);
  if(document.getElementById('view-analytics')?.classList.contains('active')) renderAnalytics();
}

function getEnergy(day) { return moodStore()[`${currentWeek}__${day}`]||0; }

function paintEnergy(day) {
  const val=getEnergy(day);
  document.querySelectorAll(`#erg-${day} .e-btn`).forEach((b,i)=>b.classList.toggle('lit',i<val));
  const lb=document.getElementById('elb-'+day);
  if(!lb) return;
  lb.textContent=['','😴 Low','😐 Okay','😊 Good','💪 High','⚡ Peak'][val]||'—';
  lb.style.color=['','#f87171','#fb923c','#fde68a','#4ade80','#6ee7b7'][val]||'var(--muted)';
}

function buildEnergyRow(dk) {
  if(document.getElementById('erg-row-'+dk)) { paintEnergy(dk); return; }
  const anchor=document.querySelector(`#panel-${dk} .day-prog-wrap`);
  if(!anchor) return;
  const div=document.createElement('div');
  div.className='energy-row'; div.id='erg-row-'+dk;
  div.innerHTML=`<span class="erg-title">⚡ Energy:</span>
    <div class="erg-bolts" id="erg-${dk}">
      ${[1,2,3,4,5].map(v=>`<button class="e-btn" onclick="setEnergy('${currentWeek}','${dk}',${v})" title="${['','Low','Okay','Good','High','Peak'][v]}">⚡</button>`).join('')}
    </div>
    <span class="erg-label" id="elb-${dk}">—</span>`;
  anchor.after(div);
  paintEnergy(dk);
}

// ── MISS REASON MODAL ───────────────────────────────────────────────────────
let _pend=null;

function showReasonModal(dk,idx,slotEl,store) {
  _pend={dk,idx,slotEl,store};
  document.getElementById('reasonModal').classList.add('open');
}
function closeReasonModal() { document.getElementById('reasonModal').classList.remove('open'); _pend=null; }

function selectReason(rid) {
  if(!_pend) return;
  const {dk,idx,slotEl,store}=_pend;
  const rs=reasonStore(); rs[`${currentWeek}__${dk}__${idx}`]=rid; saveReason(rs);
  _doUntick(dk,idx,slotEl,store);
  _applyBadge(slotEl,rid);
  const r=REASONS.find(x=>x.id===rid);
  showToast(`↩️ ${r?r.icon+' '+r.label:'Missed'}`);
  closeReasonModal();
  if(document.getElementById('view-analytics')?.classList.contains('active')) renderAnalytics();
}
function skipReason() {
  if(!_pend) return;
  const {dk,idx,slotEl,store}=_pend;
  _doUntick(dk,idx,slotEl,store);
  showToast('↩️ Unmarked');
  closeReasonModal();
}
function _doUntick(dk,idx,slotEl,store) {
  toggleCheck(store,currentWeek,dk,idx);
  slotEl.classList.remove('is-done');
  const btn=slotEl.querySelector('.slot-tick');
  if(btn){btn.classList.remove('ticked');btn.title='Mark done';}
  updateAllProgress(store); updateStreakUI();
}
function _applyBadge(slotEl,rid) {
  const r=REASONS.find(x=>x.id===rid); if(!r) return;
  let b=slotEl.querySelector('.slot-reason-badge');
  if(!b){b=document.createElement('span');b.className='slot-reason-badge';}
  b.textContent=`${r.icon} ${r.label}`;
  const tick=slotEl.querySelector('.slot-tick');
  slotEl.querySelector('.slot-body').insertBefore(b,tick||null);
}
function applyReasonBadges(dk) {
  const rs=reasonStore();
  SCHEDULE[dk].slots.forEach((s,i)=>{
    if(!s.major) return;
    const rid=rs[`${currentWeek}__${dk}__${i}`]; if(!rid) return;
    const all=[...document.querySelectorAll(`#sched-${dk} .slot`)];
    const el=all.find(e=>e.querySelector('.slot-name')?.textContent===s.name);
    if(el) _applyBadge(el,rid);
  });
}

// Override handleTick from app.js
function handleTick(dk,idx,slotEl,store) {
  if(isChecked(store,currentWeek,dk,idx)) {
    showReasonModal(dk,idx,slotEl,store);
  } else {
    toggleCheck(store,currentWeek,dk,idx);
    slotEl.classList.add('is-done');
    const btn=slotEl.querySelector('.slot-tick');
    if(btn){btn.classList.add('ticked');btn.title='Undo';}
    const b=slotEl.querySelector('.slot-reason-badge'); if(b) b.remove();
    const rs=reasonStore(); delete rs[`${currentWeek}__${dk}__${idx}`]; saveReason(rs);
    updateAllProgress(store); updateStreakUI();
    if(document.getElementById('view-analytics')?.classList.contains('active')) renderAnalytics();
    showToast('✅ Done!');
  }
}

// ── EXPORT / SHARE ──────────────────────────────────────────────────────────
function showExportModal() { buildExportCard(); document.getElementById('exportModal').classList.add('open'); }
function closeExportModal() { document.getElementById('exportModal').classList.remove('open'); }

function buildExportCard() {
  const store=loadStore();
  const {total,done}=countWeek(store,currentWeek);
  const p=pct(done,total);
  const streak=calcStreak();
  const ms=moodStore();
  let eS=0,eC=0;
  DAY_KEYS.forEach(dk=>{const v=ms[`${currentWeek}__${dk}`];if(v){eS+=v;eC++;}});
  const avgE=eC?(eS/eC).toFixed(1):'—';
  const col=p>=80?'#22c55e':p>=50?'#a78bfa':'#f87171';
  document.getElementById('exportCard').innerHTML=`
    <div class="xc-head"><div class="xc-title">📅 Weekly Report</div><div class="xc-sub">${weekToLabel(currentWeek)}</div></div>
    <div class="xc-main"><div class="xc-pct" style="color:${col}">${p}%</div><div class="xc-pct-label">${done} / ${total} major tasks completed</div></div>
    <div class="xc-stats">
      <div class="xc-stat"><div class="xc-sv">🔥 ${streak}</div><div class="xc-sl">Day Streak</div></div>
      <div class="xc-stat"><div class="xc-sv">⚡ ${avgE}</div><div class="xc-sl">Avg Energy</div></div>
      <div class="xc-stat"><div class="xc-sv">${p>=70?'✅':'🔴'}</div><div class="xc-sl">${p>=70?'On Track':'Keep Going'}</div></div>
    </div>
    <div class="xc-days">${DAY_KEYS.map(dk=>{
      const {total:t,done:d}=countDay(store,currentWeek,dk);
      const pp=pct(d,t);
      const dc=pp>=80?'#22c55e':pp>=50?'#a78bfa':'#f87171';
      return `<div class="xc-day"><div class="xc-dn">${DAY_NAMES[dk].slice(0,3)}</div><div class="xc-dp" style="color:${t?dc:'#444'}">${t?pp+'%':'—'}</div></div>`;
    }).join('')}</div>
    <div class="xc-footer">My Weekly Timetable · ${new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</div>`;
}

function copyShareText() {
  const store=loadStore();
  const {total,done}=countWeek(store,currentWeek);
  const p=pct(done,total); const streak=calcStreak();
  const lines=DAY_KEYS.map(dk=>{
    const {total:t,done:d}=countDay(store,currentWeek,dk);
    const pp=pct(d,t);
    return `${DAY_NAMES[dk].slice(0,3).padEnd(4)} ${'█'.repeat(Math.round(pp/10))}${'░'.repeat(10-Math.round(pp/10))} ${t?pp+'%':'—'}`;
  }).join('\n');
  const txt=`📅 Weekly Report — ${weekToLabel(currentWeek)}\n━━━━━━━━━━━━━━━━━━━━━\n✅ Overall: ${p}% (${done}/${total})\n🔥 Streak: ${streak} day${streak!==1?'s':''}\n\n${lines}\n━━━━━━━━━━━━━━━━━━━━━\n#StudyStreak #PlacementPrep #DSA`;
  navigator.clipboard.writeText(txt).then(()=>showToast('📋 Copied to clipboard!')).catch(()=>showToast('❌ Copy failed — use Print instead'));
}
function printSummary() { buildExportCard(); window.print(); }

// ── ANALYTICS TAB ──────────────────────────────────────────────────────────
// Override switchTab to handle analytics tab too
function switchTab(tab) {
  document.querySelectorAll('.top-tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('tab-'+tab).classList.add('active');
  document.querySelectorAll('.main-view,.history-view,.analytics-view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-'+tab).classList.add('active');
  if(tab==='history') renderHistory();
  if(tab==='analytics') renderAnalytics();
}

function renderAnalytics() {
  const s=calcStreak();
  const el=document.getElementById('anaStreak');
  if(el) { el.textContent=`🔥 ${s} day${s!==1?'s':''}`; el.style.color=s>=7?'#22c55e':s>=3?'#fb923c':'var(--accent2)'; }
  const store=loadStore();
  const {total,done}=countWeek(store,currentWeek);
  const el2=document.getElementById('anaPct');
  if(el2) el2.textContent=pct(done,total)+'% this week';
  renderEnergyChart();
  renderMissChart();
}

function renderEnergyChart() {
  const el=document.getElementById('echart'); if(!el) return;
  const ms=moodStore();
  const today=new Date();
  const weeks=[];
  for(let w=3;w>=0;w--){const d=new Date(today);d.setDate(d.getDate()-w*7);weeks.push(getISOWeek(d));}
  el.innerHTML='';
  weeks.forEach(wk=>{
    const wd=document.createElement('div'); wd.className='an-week';
    const wl=document.createElement('div'); wl.className='an-wlabel'; wl.textContent='W'+wk.split('-W')[1]; wd.appendChild(wl);
    const bars=document.createElement('div'); bars.className='an-bars';
    DAY_KEYS.forEach(dk=>{
      const v=ms[`${wk}__${dk}`]||0;
      const cols=['','#f87171','#fb923c','#fde68a','#4ade80','#6ee7b7'];
      const bw=document.createElement('div'); bw.className='an-bwrap';
      bw.innerHTML=`<div class="an-bar" style="height:${v?v*14+4:4}px;background:${v?cols[v]:'rgba(255,255,255,.07)'}" title="${DAY_NAMES[dk]}: ${v?v+'/5':'Not rated'}"></div><div class="an-bl">${DAY_NAMES[dk][0]}</div>`;
      bars.appendChild(bw);
    });
    wd.appendChild(bars); el.appendChild(wd);
  });
}

function renderMissChart() {
  const el=document.getElementById('mchart'); if(!el) return;
  const rs=reasonStore();
  const counts={}; REASONS.forEach(r=>counts[r.id]=0);
  Object.values(rs).forEach(v=>{if(counts[v]!==undefined)counts[v]++;});
  const tot=Object.values(counts).reduce((a,b)=>a+b,0);
  el.innerHTML='';
  if(!tot){el.innerHTML='<div class="no-data">No missed tasks logged yet 🎉</div>';return;}
  REASONS.forEach(r=>{
    const c=counts[r.id]; if(!c) return;
    const pp=Math.round(c/tot*100);
    const row=document.createElement('div'); row.className='mr-row';
    row.innerHTML=`<div class="mr-label">${r.icon} ${r.label}</div><div class="mr-track"><div class="mr-fill" style="width:${pp}%"></div></div><div class="mr-val">${c} (${pp}%)</div>`;
    el.appendChild(row);
  });
}

// ── HOOK showDay ────────────────────────────────────────────────────────────
const _origShow=window.showDay;
window.showDay=function(dk){
  _origShow(dk);
  setTimeout(()=>{buildEnergyRow(dk);applyReasonBadges(dk);},40);
};

// ── INIT ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',()=>{
  setTimeout(()=>{
    updateStreakUI();
    buildEnergyRow('mon');
    applyReasonBadges('mon');
  },160);
});

// ── WHATSAPP / DISCORD SHARE ──────────────────────────────────────────────────
function showPartnerModal() {
  buildPartnerMessages();
  document.getElementById('partnerModal').classList.add('open');
  document.getElementById('pm-tab-wa').click();
}
function closePartnerModal() {
  document.getElementById('partnerModal').classList.remove('open');
}

function buildPartnerMessages() {
  const store = loadStore();
  const {total, done} = countWeek(store, currentWeek);
  const p = pct(done, total);
  const streak = calcStreak();
  const ms = moodStore();
  let eS=0,eC=0;
  DAY_KEYS.forEach(dk=>{const v=ms[`${currentWeek}__${dk}`];if(v){eS+=v;eC++;}});
  const avgE = eC ? (eS/eC).toFixed(1) : null;
  const weekLabel = weekToLabel(currentWeek);
  const statusEmoji = p>=80?'🔥':p>=60?'💪':p>=40?'😤':'😅';
  const statusText  = p>=80?'Crushing it!':p>=60?'Making solid progress':p>=40?'Getting there...':'Need to step it up';
  const streakMsg   = streak>=7?`🔥🔥 ${streak}-day streak — ON FIRE!`:streak>=3?`🔥 ${streak}-day streak and going`:streak===1?`Just started my streak today`:`Starting fresh this week`;

  // Day rows helper
  const dayRows = (sep, barOn) => DAY_KEYS.map(dk=>{
    const {total:t,done:d}=countDay(store,currentWeek,dk);
    const pp=pct(d,t);
    const em = pp===100?'🟢':pp>=70?'🟡':pp>=1?'🔴':'⬜';
    const bar = barOn ? ('█'.repeat(Math.round(pp/10))+'░'.repeat(10-Math.round(pp/10))) : '';
    return t ? `${DAY_NAMES[dk].slice(0,3)}${sep}${barOn?bar+' ':''}${pp}% ${em}` : `${DAY_NAMES[dk].slice(0,3)}${sep}— not tracked`;
  }).join('\n');

  // ── WHATSAPP ─────────────────────────────────────────────────────────────
  const waMsg =
`📅 *Weekly Study Update*
━━━━━━━━━━━━━━━━━━━━━
📆 ${weekLabel}

📊 *Overall: ${p}%* ${statusEmoji}
✅ ${done}/${total} major tasks done
${streakMsg}${avgE ? `\n⚡ Avg energy this week: ${avgE}/5` : ''}

📋 *Day-by-Day:*
${dayRows(' | ', false)}

💬 *${statusText}*
How was your week? Let's compare notes! 🤝

#StudyStreak #DSA #PlacementPrep`;

  // ── DISCORD ─────────────────────────────────────────────────────────────
  const dcMsg =
`📅 **Weekly Study Update**
━━━━━━━━━━━━━━━━━━━━━
**Week:** ${weekLabel}

📊 **Overall Completion: ${p}%** ${statusEmoji}
> ✅ ${done}/${total} major tasks done
> ${streakMsg}${avgE ? `\n> ⚡ Avg energy: ${avgE}/5` : ''}

📋 **Day-by-Day Breakdown:**
\`\`\`
${dayRows(' | ', true)}
\`\`\`
**${statusText}** — how was yours? Let's keep each other accountable! 💪
\`#StudyStreak #DSA #PlacementPrep\``;

  document.getElementById('pm-wa-preview').textContent  = waMsg;
  document.getElementById('pm-dc-preview').textContent  = dcMsg;

  // WhatsApp open link
  const encoded = encodeURIComponent(waMsg);
  document.getElementById('pm-wa-open').href = `https://api.whatsapp.com/send?text=${encoded}`;
  // copy buttons data
  document.getElementById('pm-wa-copy').dataset.msg = waMsg;
  document.getElementById('pm-dc-copy').dataset.msg = dcMsg;
}

function pmCopy(btnId) {
  const btn = document.getElementById(btnId);
  navigator.clipboard.writeText(btn.dataset.msg)
    .then(()=>showToast('📋 Copied! Paste into WhatsApp/Discord'))
    .catch(()=>showToast('❌ Copy failed — select text manually'));
}

function pmSwitchTab(tab) {
  ['wa','dc'].forEach(t=>{
    document.getElementById('pm-tab-'+t).classList.toggle('active', t===tab);
    document.getElementById('pm-pane-'+t).classList.toggle('active', t===tab);
  });
}

// ── OVERRIDE switchTab for all new tabs ──────────────────────────────────────
function switchTab(tab) {
  document.querySelectorAll('.top-tab').forEach(t => t.classList.remove('active'));
  const btn = document.getElementById('tab-'+tab); if (btn) btn.classList.add('active');
  document.querySelectorAll('.main-view,.history-view,.analytics-view,.heatmap-view,.achievements-view,.planner-view,.assignments-view').forEach(v=>v.classList.remove('active'));
  const view = document.getElementById('view-'+tab); if (view) view.classList.add('active');
  if (tab==='history')      renderHistory();
  if (tab==='analytics')    { renderAnalytics(); if(typeof renderPvA==='function') renderPvA(); }
  if (tab==='heatmap')      { if(typeof renderHeatmap==='function') renderHeatmap(); }
  if (tab==='achievements')  { checkAchievements(); }
  if (tab==='planner')      { if(typeof initPlanner==='function') initPlanner(); if(typeof renderHeatmap==='function') renderHeatmap(); }
  if (tab==='assignments')  { if(typeof renderAssignments==='function') renderAssignments(); }
}

// ── OVERRIDE showDay to also inject focus buttons ─────────────────────────────
const _origShowDay2 = window.showDay;
window.showDay = function(dk) {
  _origShowDay2(dk);
  setTimeout(() => {
    buildEnergyRow(dk);
    applyReasonBadges(dk);
    if (typeof injectFocusButtons === 'function') injectFocusButtons(dk);
  }, 40);
};

// ── CHECK ACHIEVEMENTS on every tick ─────────────────────────────────────────
// Patch updateAllProgress to trigger achievement check
const _origUpdateAll = window.updateAllProgress;
window.updateAllProgress = function(store) {
  _origUpdateAll(store);
  if (typeof checkAchievements === 'function') checkAchievements();
};

// ── INIT: workload check + achievements on load ───────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (typeof checkWorkload === 'function') checkWorkload();
    if (typeof checkAchievements === 'function') checkAchievements();
    if (typeof injectFocusButtons === 'function') injectFocusButtons('mon');
  }, 200);
});
