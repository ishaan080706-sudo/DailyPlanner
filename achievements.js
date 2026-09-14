/* ─────────────────────────────────────────────────────────────────────────────
   achievements.js  ·  Badge / Achievement System
   ───────────────────────────────────────────────────────────────────────────── */
const ACHIEVE_KEY = 'tt_achievements_v1';

const ACHIEVEMENTS = [
  { id:'first_tick',  icon:'🌱', name:'First Step',      rarity:'common',
    desc:'Complete your very first task',
    check:(s)=>Object.values(s).some(Boolean) },

  { id:'streak3',     icon:'🔥', name:'On Fire',          rarity:'common',
    desc:'Reach a 3-day streak',
    check:(s,m,streak)=>streak>=3 },

  { id:'streak7',     icon:'🏆', name:'Week Warrior',     rarity:'rare',
    desc:'Maintain a 7-day streak',
    check:(s,m,streak)=>streak>=7 },

  { id:'streak14',    icon:'💎', name:'Unstoppable',      rarity:'epic',
    desc:'14 consecutive days ≥70%',
    check:(s,m,streak)=>streak>=14 },

  { id:'perfect_day', icon:'💯', name:'Perfect Day',      rarity:'rare',
    desc:'100% completion in a single day',
    check:(s)=>{
      const weeks=[...new Set(Object.keys(s).map(k=>k.split('__')[0]))];
      return weeks.some(wk=>DAY_KEYS.some(dk=>{
        const {total,done}=countDay(s,wk,dk);
        return total>0&&pct(done,total)===100;
      }));
    }},

  { id:'perfect_week',icon:'🌟', name:'Perfect Week',     rarity:'epic',
    desc:'100% completion all 7 days in a week',
    check:(s)=>{
      const weeks=[...new Set(Object.keys(s).map(k=>k.split('__')[0]))];
      return weeks.some(wk=>{
        const {total,done}=countWeek(s,wk);
        return total>0&&pct(done,total)===100;
      });
    }},

  { id:'dsa_week',    icon:'🧩', name:'DSA Dominator',    rarity:'rare',
    desc:'Complete all DSA tasks in a week',
    check:(s)=>{
      const wk=getISOWeek(new Date());
      return DAY_KEYS.every(dk=>{
        const dsaSlots=SCHEDULE[dk].slots.filter(sl=>sl.c==='dsa'&&sl.major);
        return dsaSlots.every(sl=>isChecked(s,wk,dk,SCHEDULE[dk].slots.indexOf(sl)));
      });
    }},

  { id:'reader',      icon:'📚', name:'Bookworm',         rarity:'common',
    desc:'Complete all Reading tasks in a week',
    check:(s)=>{
      const wk=getISOWeek(new Date());
      return DAY_KEYS.every(dk=>{
        const rs=SCHEDULE[dk].slots.filter(sl=>sl.c==='read'&&sl.major);
        return !rs.length||rs.every(sl=>isChecked(s,wk,dk,SCHEDULE[dk].slots.indexOf(sl)));
      });
    }},

  { id:'peak5',       icon:'⚡', name:'Peak Performer',   rarity:'rare',
    desc:'Log 5 days with Peak (5/5) energy this week',
    check:(s,mood)=>{
      const wk=getISOWeek(new Date());
      return DAY_KEYS.filter(dk=>mood[`${wk}__${dk}`]===5).length>=5;
    }},

  { id:'consistent4', icon:'🗓️', name:'Consistent',       rarity:'rare',
    desc:'Have data tracked for 4 or more weeks',
    check:(s)=>[...new Set(Object.keys(s).map(k=>k.split('__')[0]))].length>=4 },

  { id:'tasks50',     icon:'🎯', name:'Half Century',     rarity:'common',
    desc:'Complete 50 tasks in total',
    check:(s)=>Object.values(s).filter(Boolean).length>=50 },

  { id:'tasks100',    icon:'🏅', name:'Centurion',        rarity:'rare',
    desc:'Complete 100 tasks in total',
    check:(s)=>Object.values(s).filter(Boolean).length>=100 },

  { id:'tasks200',    icon:'🔱', name:'Legend',           rarity:'epic',
    desc:'Complete 200 tasks in total',
    check:(s)=>Object.values(s).filter(Boolean).length>=200 },

  { id:'no_excuse',   icon:'✨', name:'No Excuses',       rarity:'rare',
    desc:'Complete a week without logging any missed reasons',
    check:(s,mood,streak,reasons)=>{
      const wk=getISOWeek(new Date());
      const {total,done}=countWeek(s,wk);
      return total>0&&!Object.keys(reasons).some(k=>k.startsWith(wk));
    }},

  { id:'timer5',      icon:'⏱️', name:'Time Lord',        rarity:'common',
    desc:'Log 5 or more focus sessions',
    check:()=>getTotalSessions()>=5 },

  { id:'timer20',     icon:'🕐', name:'Focus Master',     rarity:'rare',
    desc:'Log 20 focus sessions',
    check:()=>getTotalSessions()>=20 },
];

function achieveStore() { try{return JSON.parse(localStorage.getItem(ACHIEVE_KEY))||{};}catch{return{};} }
function saveAchieve(s) { localStorage.setItem(ACHIEVE_KEY,JSON.stringify(s)); }

/* ── CHECK ─────────────────────────────────────────────────────────────── */
function checkAchievements() {
  const s       = loadStore();
  const mood    = typeof moodStore  ==='function'?moodStore():{};
  const reasons = typeof reasonStore==='function'?reasonStore():{};
  const streak  = typeof calcStreak ==='function'?calcStreak():0;
  const as      = achieveStore();
  const earned  = [];

  ACHIEVEMENTS.forEach(a => {
    if (as[a.id]) return;
    try {
      if (a.check(s, mood, streak, reasons)) {
        as[a.id] = { earned: Date.now() };
        earned.push(a);
      }
    } catch {}
  });

  if (earned.length) {
    saveAchieve(as);
    earned.forEach((a,i) => setTimeout(()=>_achToast(a), i*1200));
  }

  if (document.getElementById('view-achievements')?.classList.contains('active'))
    renderAchievements();
}

function _achToast(a) {
  const t = document.getElementById('achToast'); if (!t) return;
  const rarityCol = {common:'#a78bfa',rare:'#60a5fa',epic:'#facc15'}[a.rarity]||'#a78bfa';
  t.style.borderColor = rarityCol;
  t.innerHTML = `<div style="font-size:1.4rem">${a.icon}</div>
    <div><div style="font-weight:800;color:${rarityCol}">Achievement Unlocked!</div>
    <div style="font-size:.8rem;opacity:.85">${a.name} — ${a.desc}</div></div>`;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 4000);
}

/* ── RENDER GRID ───────────────────────────────────────────────────────── */
function renderAchievements() {
  const el = document.getElementById('achGrid'); if (!el) return;
  const as = achieveStore();
  const rarityCol = {common:'rgba(167,139,250,.2)',rare:'rgba(96,165,250,.2)',epic:'rgba(250,204,21,.2)'};
  const rarityBorder = {common:'rgba(167,139,250,.35)',rare:'rgba(96,165,250,.35)',epic:'rgba(250,204,21,.35)'};

  el.innerHTML = ACHIEVEMENTS.map(a => {
    const got = as[a.id];
    const col = rarityCol[a.rarity];
    const brd = rarityBorder[a.rarity];
    const dateStr = got ? new Date(got.earned).toLocaleDateString('en-IN',{day:'numeric',month:'short'}) : '';
    return `<div class="ach-card ${got?'earned':'locked'}" style="${got?`background:${col};border-color:${brd}`:''}">
      <div class="ach-icon">${got?a.icon:'🔒'}</div>
      <div class="ach-name">${a.name}</div>
      <div class="ach-desc">${a.desc}</div>
      <div class="ach-rarity ${a.rarity}">${a.rarity.toUpperCase()}</div>
      ${got?`<div class="ach-date">✅ ${dateStr}</div>`:''}
    </div>`;
  }).join('');

  const count = Object.keys(as).length;
  const pctDone = Math.round(count/ACHIEVEMENTS.length*100);
  const counter = document.getElementById('achCounter');
  if (counter) counter.textContent = `${count} / ${ACHIEVEMENTS.length} unlocked (${pctDone}%)`;

  const bar = document.getElementById('achProgressBar');
  if (bar) bar.style.width = pctDone+'%';
}
