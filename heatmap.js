/* ─────────────────────────────────────────────────────────────────────────────
   heatmap.js  ·  GitHub-style Productivity Heatmap (24 weeks)
   ───────────────────────────────────────────────────────────────────────────── */

function renderHeatmap() {
  const grid   = document.getElementById('hmGrid');     if (!grid)   return;
  const months = document.getElementById('hmMonths');
  const store  = loadStore();
  const today  = new Date();
  const NUM_WEEKS = 24;

  /* Build list of ISO week strings, oldest first */
  const weeks = [];
  for (let w = NUM_WEEKS-1; w >= 0; w--) {
    const d = new Date(today);
    d.setDate(d.getDate() - w*7);
    weeks.push({ iso: getISOWeek(d), date: new Date(d) });
  }

  /* Month label row */
  if (months) {
    months.innerHTML = '';
    let lastM = -1;
    weeks.forEach(({date}) => {
      const m = date.getMonth();
      const span = document.createElement('span');
      span.className = 'hm-month-cell';
      if (m !== lastM) { span.textContent = date.toLocaleDateString('en-IN',{month:'short'}); lastM=m; }
      months.appendChild(span);
    });
  }

  /* Day-label column */
  const dayCol = document.getElementById('hmDayLabels');
  if (dayCol) {
    dayCol.innerHTML = '';
    ['Mon','','Wed','','Fri','','Sun'].forEach(d=>{
      const s=document.createElement('span'); s.textContent=d; dayCol.appendChild(s);
    });
  }

  /* Main grid: one column per week */
  grid.innerHTML = '';
  let totalPerfect = 0, totalTracked = 0, bestStreak = 0, curS = 0;

  weeks.forEach(({iso}) => {
    const col = document.createElement('div');
    col.className = 'hm-col';
    DAY_KEYS.forEach(dk => {
      const {total,done} = countDay(store,iso,dk);
      const p = total ? pct(done,total) : -1;
      if (p >= 0) totalTracked++;
      if (p === 100) totalPerfect++;
      /* streak counting */
      if (p >= 70) curS++; else { bestStreak=Math.max(bestStreak,curS); curS=0; }

      const cell = document.createElement('div');
      cell.className = 'hm-cell';
      const lvl = p<0?0:p>=90?4:p>=70?3:p>=40?2:p>=1?1:0;
      cell.dataset.lvl = lvl;
      if (p===100) cell.classList.add('perfect');
      cell.title = p<0?`${DAY_NAMES[dk]} — no data yet`:`${DAY_NAMES[dk]} W${iso.split('-W')[1]}: ${p}% (${done}/${total})`;
      col.appendChild(cell);
    });
    grid.appendChild(col);
  });
  bestStreak = Math.max(bestStreak, curS);

  /* Update summary stats */
  _hmStat('hmStatTracked', totalTracked+' days');
  _hmStat('hmStatPerfect', totalPerfect+' days');
  _hmStat('hmStatBest',    bestStreak+' days');

  /* Semester mini-view (for Planner tab) */
  renderSemesterMini(store, weeks);
}

function _hmStat(id, val) {
  const el=document.getElementById(id); if(el) el.textContent=val;
}

/* ── SEMESTER MINI-VIEW ────────────────────────────────────────────────── */
function renderSemesterMini(store, weeks) {
  const el = document.getElementById('semGrid'); if (!el) return;
  el.innerHTML = '';
  const last16 = weeks.slice(-16);
  last16.forEach(({iso}) => {
    DAY_KEYS.forEach(dk=>{
      const {total,done}=countDay(store,iso,dk);
      const p=total?pct(done,total):-1;
      const cell=document.createElement('div');
      cell.className='sem-cell';
      const lvl=p<0?0:p>=90?4:p>=70?3:p>=40?2:p>=1?1:0;
      cell.dataset.lvl=lvl;
      cell.title=`${DAY_NAMES[dk]} W${iso.split('-W')[1]}: ${p<0?'—':p+'%'}`;
      el.appendChild(cell);
    });
  });
}
