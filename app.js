// ════════════════════════════════════════════════════════════════════════════
// SCHEDULE DATA
// major:true = trackable (DSA, Skill Dev, College Work, Reading, Gym)
// Categories: routine, class, dsa, skill, college, read, leisure, break, gym, nap
// ════════════════════════════════════════════════════════════════════════════

// ── NORMAL MODE SCHEDULE ────────────────────────────────────────────────────
const SCHEDULE_NORMAL = {
  mon: {
    slots: [
      { time:'5:00–5:30',  icon:'🌅', name:'Wake Up · Washroom · Brush',      c:'routine', tag:'Morning'   },
      { time:'5:30–7:30',  icon:'🏋️', name:'Gym — 2 Hours',                   c:'gym',     tag:'Gym',      major:true },
      { time:'7:30–7:45',  icon:'🚿', name:'Post-Gym Freshen Up',              c:'routine', tag:'Routine'   },
      { time:'7:45–8:00',  icon:'🚶', name:'Travel to College',                c:'routine', tag:'Travel'    },
      { time:'8:00–11:40', icon:'🎓', name:'College Classes',                  c:'class',   tag:'College'   },
      { time:'11:40–12:00',icon:'🚶', name:'Travel Back',                      c:'routine', tag:'Travel'    },
      { time:'12:00–12:40',icon:'🍱', name:'Lunch',                            c:'routine', tag:'Meal'      },
      { time:'12:40–1:10', icon:'😴', name:'Recovery Nap',                     c:'nap',     tag:'Recovery'  },
      { time:'1:10–1:25',  icon:'🖥️', name:'Online Class Setup',               c:'routine', tag:'Prep'      },
      { time:'1:25–2:15',  icon:'🖥️', name:'Online Class',                     c:'class',   tag:'Online'    },
      { time:'2:15–2:30',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'2:30–3:30',  icon:'🧩', name:'DSA — Problem Solving',            c:'dsa',     tag:'DSA',      major:true },
      { time:'3:30–3:45',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'3:45–4:45',  icon:'💻', name:'Skill Development — Java',         c:'skill',   tag:'Skill Dev',major:true },
      { time:'4:45–5:00',  icon:'🍫', name:'Snacks',                           c:'routine', tag:'Meal'      },
      { time:'5:00–6:00',  icon:'📘', name:'College Work / Revision',          c:'college', tag:'College',  major:true },
      { time:'6:00–7:00',  icon:'💻', name:'Skill Development — Java',         c:'skill',   tag:'Skill Dev',major:true },
      { time:'7:00–7:30',  icon:'📖', name:'Reading',                          c:'read',    tag:'Reading',  major:true },
      { time:'7:30–8:10',  icon:'🍽️', name:'Dinner',                           c:'routine', tag:'Meal'      },
      { time:'8:10–8:30',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'8:30–9:30',  icon:'🧩', name:'DSA — Practice',                   c:'dsa',     tag:'DSA',      major:true },
      { time:'9:30–10:30', icon:'🎮', name:'Leisure / Gaming / Friends',       c:'leisure', tag:'Leisure'   },
      { time:'10:30–11:00',icon:'🌙', name:'Wind Down',                        c:'leisure', tag:'Wind Down' },
      { time:'11:00–5:00', icon:'💤', name:'Sleep — 6h  (11 PM → 5 AM)',      c:'nap',     tag:'Sleep'     },
    ],
    summary: { dsa:2, skill:2, college:1, read:0.5, leisure:1.5, gym:2 }
  },

  tue: {
    slots: [
      { time:'5:00–5:30',  icon:'🌅', name:'Wake Up · Washroom',               c:'routine', tag:'Morning'   },
      { time:'5:30–7:30',  icon:'🏋️', name:'Gym — 2 Hours',                   c:'gym',     tag:'Gym',      major:true },
      { time:'7:30–8:00',  icon:'🚿', name:'Freshen Up + Breakfast',           c:'routine', tag:'Morning'   },
      { time:'8:00–9:20',  icon:'🧩', name:'DSA — Deep Work',                  c:'dsa',     tag:'DSA',      major:true },
      { time:'9:20–9:45',  icon:'👔', name:'Get Ready · Travel to College',    c:'routine', tag:'Travel'    },
      { time:'9:45–5:00',  icon:'🎓', name:'College Classes (Lunch in break)', c:'class',   tag:'College'   },
      { time:'5:00–5:20',  icon:'🚶', name:'Travel Back',                      c:'routine', tag:'Travel'    },
      { time:'5:20–5:50',  icon:'😴', name:'Recovery Nap',                     c:'nap',     tag:'Recovery'  },
      { time:'5:50–6:05',  icon:'🍫', name:'Snacks',                           c:'routine', tag:'Meal'      },
      { time:'6:05–7:05',  icon:'📘', name:'College Work / Revision',          c:'college', tag:'College',  major:true },
      { time:'7:05–8:00',  icon:'💻', name:'Skill Development — Java',         c:'skill',   tag:'Skill Dev',major:true },
      { time:'8:00–8:40',  icon:'🍽️', name:'Dinner',                           c:'routine', tag:'Meal'      },
      { time:'8:40–9:00',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'9:00–9:45',  icon:'🧩', name:'DSA — Light Problems',             c:'dsa',     tag:'DSA',      major:true },
      { time:'9:45–10:30', icon:'🎮', name:'Leisure / Free Time',              c:'leisure', tag:'Leisure'   },
      { time:'10:30–11:00',icon:'🌙', name:'Wind Down',                        c:'leisure', tag:'Wind Down' },
      { time:'11:00–5:00', icon:'💤', name:'Sleep — 6h  (11 PM → 5 AM)',      c:'nap',     tag:'Sleep'     },
    ],
    summary: { dsa:2.08, skill:0.92, college:1, read:0, leisure:1.25, gym:2 }
  },

  wed: {
    slots: [
      { time:'5:00–5:30',  icon:'🌅', name:'Wake Up · Washroom',               c:'routine', tag:'Morning'   },
      { time:'5:30–7:30',  icon:'🏋️', name:'Gym — 2 Hours',                   c:'gym',     tag:'Gym',      major:true },
      { time:'7:30–7:45',  icon:'🚿', name:'Post-Gym Freshen Up',              c:'routine', tag:'Routine'   },
      { time:'7:45–8:00',  icon:'🚶', name:'Travel to College',                c:'routine', tag:'Travel'    },
      { time:'8:00–11:40', icon:'🎓', name:'College Classes',                  c:'class',   tag:'College'   },
      { time:'11:40–12:00',icon:'🚶', name:'Travel Back',                      c:'routine', tag:'Travel'    },
      { time:'12:00–12:40',icon:'🍱', name:'Lunch',                            c:'routine', tag:'Meal'      },
      { time:'12:40–1:20', icon:'😴', name:'Recovery Nap',                     c:'nap',     tag:'Recovery'  },
      { time:'1:20–2:20',  icon:'🧩', name:'DSA — Deep Work',                  c:'dsa',     tag:'DSA',      major:true },
      { time:'2:20–2:35',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'2:35–3:35',  icon:'💻', name:'Skill Development — Java',         c:'skill',   tag:'Skill Dev',major:true },
      { time:'3:35–3:50',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'3:50–4:50',  icon:'📘', name:'College Work / Revision',          c:'college', tag:'College',  major:true },
      { time:'4:50–5:05',  icon:'🍫', name:'Snacks',                           c:'routine', tag:'Meal'      },
      { time:'5:05–6:05',  icon:'🧩', name:'DSA — Hard Problems',              c:'dsa',     tag:'DSA',      major:true },
      { time:'6:05–7:05',  icon:'💻', name:'Skill Development — Java',         c:'skill',   tag:'Skill Dev',major:true },
      { time:'7:05–7:30',  icon:'📖', name:'Reading',                          c:'read',    tag:'Reading',  major:true },
      { time:'7:30–8:10',  icon:'🍽️', name:'Dinner',                           c:'routine', tag:'Meal'      },
      { time:'8:10–8:30',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'8:30–9:30',  icon:'🧩', name:'DSA — Contest Prep',               c:'dsa',     tag:'DSA',      major:true },
      { time:'9:30–10:30', icon:'🎮', name:'Leisure / Free Time',              c:'leisure', tag:'Leisure'   },
      { time:'10:30–11:00',icon:'🌙', name:'Wind Down',                        c:'leisure', tag:'Wind Down' },
      { time:'11:00–5:00', icon:'💤', name:'Sleep — 6h  (11 PM → 5 AM)',      c:'nap',     tag:'Sleep'     },
    ],
    summary: { dsa:3, skill:2, college:1, read:0.5, leisure:1.5, gym:2 }
  },

  thu: {
    slots: [
      { time:'5:00–5:30',  icon:'🌅', name:'Wake Up · Washroom',               c:'routine', tag:'Morning'   },
      { time:'5:30–7:30',  icon:'🏋️', name:'Gym — 2 Hours',                   c:'gym',     tag:'Gym',      major:true },
      { time:'7:30–8:00',  icon:'🚿', name:'Freshen Up + Breakfast',           c:'routine', tag:'Morning'   },
      { time:'8:00–9:30',  icon:'🧩', name:'DSA — Deep Work',                  c:'dsa',     tag:'DSA',      major:true },
      { time:'9:30–9:45',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'9:45–10:45', icon:'💻', name:'Skill Development — Java',         c:'skill',   tag:'Skill Dev',major:true },
      { time:'10:45–11:00',icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'11:00–11:30',icon:'😴', name:'Short Nap',                        c:'nap',     tag:'Recovery'  },
      { time:'11:30–12:10',icon:'👔', name:'Get Ready + Snack',                c:'routine', tag:'Morning'   },
      { time:'12:10–12:30',icon:'🚶', name:'Travel to College',                c:'routine', tag:'Travel'    },
      { time:'12:30–5:00', icon:'🎓', name:'College Classes (Lunch in break)', c:'class',   tag:'College'   },
      { time:'5:00–5:20',  icon:'🚶', name:'Travel Back',                      c:'routine', tag:'Travel'    },
      { time:'5:20–5:35',  icon:'🍫', name:'Snacks',                           c:'routine', tag:'Meal'      },
      { time:'5:35–6:35',  icon:'📘', name:'College Work / Revision',          c:'college', tag:'College',  major:true },
      { time:'6:35–7:00',  icon:'🎮', name:'Leisure / Decompress',             c:'leisure', tag:'Leisure'   },
      { time:'7:00–8:00',  icon:'💻', name:'Skill Development — Project Work', c:'skill',   tag:'Skill Dev',major:true },
      { time:'8:00–8:40',  icon:'🍽️', name:'Dinner',                           c:'routine', tag:'Meal'      },
      { time:'8:40–9:00',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'9:00–10:00', icon:'🧩', name:'DSA — Practice Problems',          c:'dsa',     tag:'DSA',      major:true },
      { time:'10:00–10:30',icon:'🎮', name:'Leisure / Free Time',              c:'leisure', tag:'Leisure'   },
      { time:'10:30–11:00',icon:'🌙', name:'Wind Down',                        c:'leisure', tag:'Wind Down' },
      { time:'11:00–5:00', icon:'💤', name:'Sleep — 6h  (11 PM → 5 AM)',      c:'nap',     tag:'Sleep'     },
    ],
    summary: { dsa:2.5, skill:2, college:1, read:0, leisure:1, gym:2 }
  },

  fri: {
    slots: [
      { time:'5:00–5:30',  icon:'🌅', name:'Wake Up · Washroom',               c:'routine', tag:'Morning'   },
      { time:'5:30–7:30',  icon:'🏋️', name:'Gym — 2 Hours',                   c:'gym',     tag:'Gym',      major:true },
      { time:'7:30–8:00',  icon:'🚿', name:'Freshen Up + Breakfast',           c:'routine', tag:'Morning'   },
      { time:'8:00–9:20',  icon:'🧩', name:'DSA — Problem Solving',            c:'dsa',     tag:'DSA',      major:true },
      { time:'9:20–9:45',  icon:'👔', name:'Get Ready · Travel to College',    c:'routine', tag:'Travel'    },
      { time:'9:45–12:30', icon:'🎓', name:'College Classes',                  c:'class',   tag:'College'   },
      { time:'12:30–12:50',icon:'🚶', name:'Travel Back',                      c:'routine', tag:'Travel'    },
      { time:'12:50–1:25', icon:'🍱', name:'Lunch',                            c:'routine', tag:'Meal'      },
      { time:'1:25–2:25',  icon:'😴', name:'Recovery Nap',                     c:'nap',     tag:'Recovery'  },
      { time:'2:25–2:40',  icon:'🚶', name:'Travel to College',                c:'routine', tag:'Travel'    },
      { time:'2:40–3:10',  icon:'🚶', name:'Travel to College',                c:'routine', tag:'Travel'    },
      { time:'3:10–6:10',  icon:'🎓', name:'College Classes',                  c:'class',   tag:'College'   },
      { time:'6:10–6:30',  icon:'🚶', name:'Travel Back',                      c:'routine', tag:'Travel'    },
      { time:'6:30–6:45',  icon:'🍫', name:'Snacks',                           c:'routine', tag:'Meal'      },
      { time:'6:45–7:45',  icon:'📘', name:'College Work / Revision',          c:'college', tag:'College',  major:true },
      { time:'7:45–8:30',  icon:'💻', name:'Skill Development — Java',         c:'skill',   tag:'Skill Dev',major:true },
      { time:'8:30–9:10',  icon:'🍽️', name:'Dinner',                           c:'routine', tag:'Meal'      },
      { time:'9:10–9:30',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'9:30–10:30', icon:'🧩', name:'DSA — Light Problems',             c:'dsa',     tag:'DSA',      major:true },
      { time:'10:30–11:00',icon:'🎮', name:'Leisure / Free Time',              c:'leisure', tag:'Leisure'   },
      { time:'11:00–5:00', icon:'💤', name:'Sleep — 6h  (11 PM → 5 AM)',      c:'nap',     tag:'Sleep'     },
    ],
    summary: { dsa:2.08, skill:0.75, college:0.75, read:0, leisure:0.5, gym:2 }
  },

  sat: {
    slots: [
      { time:'5:00–5:30',  icon:'🌅', name:'Wake Up · Washroom',               c:'routine', tag:'Morning'   },
      { time:'5:30–7:30',  icon:'🏋️', name:'Gym — 2 Hours',                   c:'gym',     tag:'Gym',      major:true },
      { time:'7:30–7:45',  icon:'🚿', name:'Post-Gym Freshen Up',              c:'routine', tag:'Routine'   },
      { time:'7:45–8:00',  icon:'🚶', name:'Travel to College',                c:'routine', tag:'Travel'    },
      { time:'8:00–12:00', icon:'🎓', name:'College Classes',                  c:'class',   tag:'College'   },
      { time:'12:00–12:20',icon:'🚶', name:'Travel Back',                      c:'routine', tag:'Travel'    },
      { time:'12:20–1:00', icon:'🍱', name:'Lunch',                            c:'routine', tag:'Meal'      },
      { time:'1:00–2:30',  icon:'😴', name:'Recovery Nap',                     c:'nap',     tag:'Recovery'  },
      { time:'2:30–3:30',  icon:'📘', name:'College Work / Revision',          c:'college', tag:'College',  major:true },
      { time:'3:30–3:45',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'3:45–5:00',  icon:'🧩', name:'DSA — Deep Practice',              c:'dsa',     tag:'DSA',      major:true },
      { time:'5:00–5:15',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'5:15–6:15',  icon:'💻', name:'Skill Development — Java',         c:'skill',   tag:'Skill Dev',major:true },
      { time:'6:15–6:30',  icon:'🍫', name:'Snacks',                           c:'routine', tag:'Meal'      },
      { time:'6:30–7:30',  icon:'🎮', name:'Leisure / Free Time',              c:'leisure', tag:'Leisure'   },
      { time:'7:30–8:10',  icon:'🍽️', name:'Dinner',                           c:'routine', tag:'Meal'      },
      { time:'8:10–8:30',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'8:30–10:00', icon:'🧩', name:'DSA — Weekly Contest 🏆',           c:'dsa',     tag:'DSA',      major:true },
      { time:'10:00–10:45',icon:'🧩', name:'DSA — Contest Review',             c:'dsa',     tag:'DSA',      major:true },
      { time:'10:45–11:15',icon:'💻', name:'Skill Dev — Quick Review',         c:'skill',   tag:'Skill Dev',major:true },
      { time:'11:15–11:00',icon:'🌙', name:'Wind Down',                        c:'leisure', tag:'Wind Down' },
      { time:'11:00–5:00', icon:'💤', name:'Sleep — 6h  (11 PM → 5 AM)',      c:'nap',     tag:'Sleep'     },
    ],
    summary: { dsa:3.5, skill:1.5, college:1, read:0, leisure:1, gym:2 }
  },

  sun: {
    slots: [
      { time:'9:00–9:30',  icon:'🌅', name:'Wake Up · Washroom',               c:'routine', tag:'Morning'   },
      { time:'9:30–10:00', icon:'🍳', name:'Breakfast',                        c:'routine', tag:'Meal'      },
      { time:'10:00–11:00',icon:'🧩', name:'DSA — Weekly Mock / Contest',       c:'dsa',     tag:'DSA',      major:true },
      { time:'11:00–11:15',icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'11:15–12:15',icon:'💻', name:'Skill Development — Java',         c:'skill',   tag:'Skill Dev',major:true },
      { time:'12:15–1:00', icon:'📘', name:'College Work / Weekly Review',     c:'college', tag:'College',  major:true },
      { time:'1:00–1:45',  icon:'🍱', name:'Lunch',                            c:'routine', tag:'Meal'      },
      { time:'1:45–2:45',  icon:'😴', name:'Recovery Nap / Rest',              c:'nap',     tag:'Recovery'  },
      { time:'2:45–3:45',  icon:'💻', name:'Skill Development — Java',         c:'skill',   tag:'Skill Dev',major:true },
      { time:'3:45–4:00',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'4:00–4:45',  icon:'📖', name:'Reading',                          c:'read',    tag:'Reading',  major:true },
      { time:'4:45–5:00',  icon:'🍫', name:'Snacks',                           c:'routine', tag:'Meal'      },
      { time:'5:00–5:30',  icon:'🚿', name:'Bath',                             c:'routine', tag:'Routine'   },
      { time:'5:30–6:15',  icon:'🗓️', name:'Weekly Planning',                  c:'college', tag:'Planning', major:true },
      { time:'6:15–7:00',  icon:'🎮', name:'Leisure / Free Time',              c:'leisure', tag:'Leisure'   },
      { time:'7:00–8:00',  icon:'🧩', name:'DSA — Revision',                   c:'dsa',     tag:'DSA',      major:true },
      { time:'8:00–8:40',  icon:'🍽️', name:'Dinner',                           c:'routine', tag:'Meal'      },
      { time:'8:40–9:00',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'9:00–10:00', icon:'💻', name:'Skill Development — Light Work',   c:'skill',   tag:'Skill Dev',major:true },
      { time:'10:00–11:30',icon:'🎮', name:'Movie / Gaming / Friends',         c:'leisure', tag:'Leisure'   },
      { time:'11:30–1:00', icon:'🌙', name:'Wind Down',                        c:'leisure', tag:'Wind Down' },
      { time:'1:00–9:00',  icon:'💤', name:'Sleep — 8h  (1 AM → 9 AM)',        c:'nap',     tag:'Sleep'     },
    ],
    summary: { dsa:2, skill:3, college:1.75, read:0.75, leisure:3.5, gym:0 }
  }
};


// ── ACTIVE SCHEDULE (swapped by exam mode) ───────────────────────────────────

// ── EXAM MODE SCHEDULE ───────────────────────────────────────────────────────
const SCHEDULE_EXAM = {
  mon: {
    slots: [
      { time:'5:00-5:30',  icon:'��', name:'Wake Up � Washroom � Brush',      c:'routine', tag:'Morning'   },
      { time:'5:30-7:30',  icon:'��️', name:'Gym � 2 Hours',                   c:'gym',     tag:'Gym',      major:true },
      { time:'7:30-7:45',  icon:'��', name:'Post-Gym Freshen Up',              c:'routine', tag:'Routine'   },
      { time:'7:45-8:00',  icon:'��', name:'Travel to College',                c:'routine', tag:'Travel'    },
      { time:'8:00-11:40', icon:'��', name:'College Classes',                  c:'class',   tag:'College'   },
      { time:'11:40-12:00',icon:'��', name:'Travel Back',                      c:'routine', tag:'Travel'    },
      { time:'12:00-12:40',icon:'��', name:'Lunch',                            c:'routine', tag:'Meal'      },
      { time:'12:40-1:10', icon:'��', name:'Recovery Nap',                     c:'nap',     tag:'Recovery'  },
      { time:'1:10-1:25',  icon:'��️', name:'Online Class Setup',               c:'routine', tag:'Prep'      },
      { time:'1:25-2:15',  icon:'��️', name:'Online Class',                     c:'class',   tag:'Online'    },
      { time:'2:15-2:30',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'2:30-4:00',  icon:'��', name:'College Exam Study',               c:'college', tag:'Exam Study',major:true },
      { time:'4:00-4:15',  icon:'☕', name:'Break + Snacks',                   c:'break',   tag:'Break'     },
      { time:'4:15-5:15',  icon:'��', name:'College Exam Problems',            c:'college', tag:'Exam Study',major:true },
      { time:'5:15-6:15',  icon:'��', name:'College Work / Revision',          c:'college', tag:'College',  major:true },
      { time:'6:15-6:30',  icon:'��', name:'Snacks',                           c:'routine', tag:'Meal'      },
      { time:'6:30-8:00',  icon:'��', name:'College Revision',                 c:'college', tag:'Exam Study',major:true },
      { time:'8:00-8:40',  icon:'��️', name:'Dinner',                           c:'routine', tag:'Meal'      },
      { time:'8:40-9:00',  icon:'��', name:'Rest',                             c:'break',   tag:'Rest'      },
      { time:'9:00-10:00', icon:'��', name:'DSA � Maintenance',                c:'dsa',     tag:'DSA',      major:true },
      { time:'10:00-11:00',icon:'��', name:'Leisure / Wind Down',              c:'leisure', tag:'Leisure'   },
      { time:'11:00-12:00',icon:'��', name:'Free Time / Sleep Prep',           c:'leisure', tag:'Wind Down' },
    ],
    summary: { dsa:1, skill:0, college:5.5, read:0, leisure:2, gym:2 }
  },
  tue: {
    slots: [
      { time:'5:00-5:30',  icon:'��', name:'Wake Up � Washroom',               c:'routine', tag:'Morning'   },
      { time:'5:30-7:30',  icon:'��️', name:'Gym � 2 Hours',                   c:'gym',     tag:'Gym',      major:true },
      { time:'7:30-8:00',  icon:'��', name:'Freshen Up + Breakfast',           c:'routine', tag:'Morning'   },
      { time:'8:00-9:20',  icon:'��', name:'College Exam Study',               c:'college', tag:'Exam Study',major:true },
      { time:'9:20-9:45',  icon:'��', name:'Get Ready � Travel to College',    c:'routine', tag:'Travel'    },
      { time:'9:45-5:00',  icon:'��', name:'College Classes (Lunch in break)', c:'class',   tag:'College'   },
      { time:'5:00-5:20',  icon:'��', name:'Travel Back',                      c:'routine', tag:'Travel'    },
      { time:'5:20-5:50',  icon:'��', name:'Recovery Nap',                     c:'nap',     tag:'Recovery'  },
      { time:'5:50-6:05',  icon:'��', name:'Snacks',                           c:'routine', tag:'Meal'      },
      { time:'6:05-7:05',  icon:'��', name:'College Exam Study',               c:'college', tag:'Exam Study',major:true },
      { time:'7:05-8:00',  icon:'��', name:'College Work / Revision',          c:'college', tag:'College',  major:true },
      { time:'8:00-8:40',  icon:'��️', name:'Dinner',                           c:'routine', tag:'Meal'      },
      { time:'8:40-9:00',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'9:00-10:00', icon:'��', name:'College Revision',                 c:'college', tag:'Exam Study',major:true },
      { time:'10:00-11:00',icon:'��', name:'Leisure / Free Time',              c:'leisure', tag:'Leisure'   },
      { time:'11:00-12:00',icon:'��', name:'Wind Down',                        c:'leisure', tag:'Wind Down' },
    ],
    summary: { dsa:0, skill:0, college:4.33, read:0, leisure:2, gym:2 }
  },
  wed: {
    slots: [
      { time:'5:00-5:30',  icon:'��', name:'Wake Up � Washroom',               c:'routine', tag:'Morning'   },
      { time:'5:30-7:30',  icon:'��️', name:'Gym � 2 Hours',                   c:'gym',     tag:'Gym',      major:true },
      { time:'7:30-7:45',  icon:'��', name:'Post-Gym Freshen Up',              c:'routine', tag:'Routine'   },
      { time:'7:45-8:00',  icon:'��', name:'Travel to College',                c:'routine', tag:'Travel'    },
      { time:'8:00-11:40', icon:'��', name:'College Classes',                  c:'class',   tag:'College'   },
      { time:'11:40-12:00',icon:'��', name:'Travel Back',                      c:'routine', tag:'Travel'    },
      { time:'12:00-12:40',icon:'��', name:'Lunch',                            c:'routine', tag:'Meal'      },
      { time:'12:40-1:20', icon:'��', name:'Recovery Nap',                     c:'nap',     tag:'Recovery'  },
      { time:'1:20-3:00',  icon:'��', name:'College Exam Study',               c:'college', tag:'Exam Study',major:true },
      { time:'3:00-3:15',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'3:15-4:45',  icon:'��', name:'College Problems / Practice',      c:'college', tag:'Exam Study',major:true },
      { time:'4:45-5:00',  icon:'��', name:'Snacks',                           c:'routine', tag:'Meal'      },
      { time:'5:00-6:00',  icon:'��', name:'College Work / Revision',          c:'college', tag:'College',  major:true },
      { time:'6:00-8:00',  icon:'��', name:'College Revision',                 c:'college', tag:'Exam Study',major:true },
      { time:'8:00-8:40',  icon:'��️', name:'Dinner',                           c:'routine', tag:'Meal'      },
      { time:'8:40-9:00',  icon:'��', name:'Rest',                             c:'break',   tag:'Rest'      },
      { time:'9:00-10:00', icon:'��', name:'DSA � Maintenance',                c:'dsa',     tag:'DSA',      major:true },
      { time:'10:00-11:00',icon:'��', name:'Leisure / Free Time',              c:'leisure', tag:'Leisure'   },
      { time:'11:00-12:00',icon:'��', name:'Wind Down',                        c:'leisure', tag:'Wind Down' },
    ],
    summary: { dsa:1, skill:0, college:6.25, read:0, leisure:2, gym:2 }
  },
  thu: {
    slots: [
      { time:'5:00-5:30',  icon:'��', name:'Wake Up � Washroom',               c:'routine', tag:'Morning'   },
      { time:'5:30-7:30',  icon:'��️', name:'Gym � 2 Hours',                   c:'gym',     tag:'Gym',      major:true },
      { time:'7:30-8:00',  icon:'��', name:'Freshen Up + Breakfast',           c:'routine', tag:'Morning'   },
      { time:'8:00-9:30',  icon:'��', name:'College Exam Study',               c:'college', tag:'Exam Study',major:true },
      { time:'9:30-9:45',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'9:45-11:00', icon:'��', name:'College Quick Revision',           c:'college', tag:'Exam Study',major:true },
      { time:'11:00-11:30',icon:'��', name:'Short Nap',                        c:'nap',     tag:'Recovery'  },
      { time:'11:30-12:10',icon:'��', name:'Get Ready + Snack',                c:'routine', tag:'Morning'   },
      { time:'12:10-12:30',icon:'��', name:'Travel to College',                c:'routine', tag:'Travel'    },
      { time:'12:30-5:00', icon:'��', name:'College Classes (Lunch in break)', c:'class',   tag:'College'   },
      { time:'5:00-5:20',  icon:'��', name:'Travel Back',                      c:'routine', tag:'Travel'    },
      { time:'5:20-5:35',  icon:'��', name:'Snacks',                           c:'routine', tag:'Meal'      },
      { time:'5:35-6:35',  icon:'��', name:'College Work / Revision',          c:'college', tag:'College',  major:true },
      { time:'6:35-7:00',  icon:'��', name:'Leisure / Decompress',             c:'leisure', tag:'Leisure'   },
      { time:'7:00-8:00',  icon:'��', name:'College Exam Study',               c:'college', tag:'Exam Study',major:true },
      { time:'8:00-8:40',  icon:'��️', name:'Dinner',                           c:'routine', tag:'Meal'      },
      { time:'8:40-9:00',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'9:00-10:00', icon:'��', name:'Skill Dev � Maintenance',          c:'skill',   tag:'Skill Dev',major:true },
      { time:'10:00-11:00',icon:'��', name:'Leisure / Free Time',              c:'leisure', tag:'Leisure'   },
      { time:'11:00-12:00',icon:'��', name:'Wind Down',                        c:'leisure', tag:'Wind Down' },
    ],
    summary: { dsa:0, skill:1, college:5.5, read:0, leisure:2, gym:2 }
  },
  fri: {
    slots: [
      { time:'5:00-5:30',  icon:'��', name:'Wake Up � Washroom',               c:'routine', tag:'Morning'   },
      { time:'5:30-7:30',  icon:'��️', name:'Gym � 2 Hours',                   c:'gym',     tag:'Gym',      major:true },
      { time:'7:30-8:00',  icon:'��', name:'Freshen Up + Breakfast',           c:'routine', tag:'Morning'   },
      { time:'8:00-9:20',  icon:'��', name:'College Exam Study',               c:'college', tag:'Exam Study',major:true },
      { time:'9:20-9:45',  icon:'��', name:'Get Ready � Travel to College',    c:'routine', tag:'Travel'    },
      { time:'9:45-12:30', icon:'��', name:'College Classes',                  c:'class',   tag:'College'   },
      { time:'12:30-12:50',icon:'��', name:'Travel Back',                      c:'routine', tag:'Travel'    },
      { time:'12:50-1:25', icon:'��', name:'Lunch',                            c:'routine', tag:'Meal'      },
      { time:'1:25-2:25',  icon:'��', name:'Recovery Nap',                     c:'nap',     tag:'Recovery'  },
      { time:'2:25-3:10',  icon:'��', name:'Travel to College',                c:'routine', tag:'Travel'    },
      { time:'3:10-6:10',  icon:'��', name:'College Classes',                  c:'class',   tag:'College'   },
      { time:'6:10-6:30',  icon:'��', name:'Travel Back',                      c:'routine', tag:'Travel'    },
      { time:'6:30-6:45',  icon:'��', name:'Snacks',                           c:'routine', tag:'Meal'      },
      { time:'6:45-7:45',  icon:'��', name:'College Work / Revision',          c:'college', tag:'College',  major:true },
      { time:'7:45-8:30',  icon:'��', name:'College Exam Revision',            c:'college', tag:'Exam Study',major:true },
      { time:'8:30-9:10',  icon:'��️', name:'Dinner',                           c:'routine', tag:'Meal'      },
      { time:'9:10-9:30',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'9:30-10:30', icon:'��', name:'College Prep for Tomorrow',        c:'college', tag:'Exam Study',major:true },
      { time:'10:30-11:30',icon:'��', name:'Leisure / Free Time',              c:'leisure', tag:'Leisure'   },
      { time:'11:30-12:00',icon:'��', name:'Wind Down',                        c:'leisure', tag:'Wind Down' },
    ],
    summary: { dsa:0, skill:0, college:5.33, read:0, leisure:1.5, gym:2 }
  },
  sat: {
    slots: [
      { time:'5:00-5:30',  icon:'��', name:'Wake Up � Washroom',               c:'routine', tag:'Morning'   },
      { time:'5:30-7:30',  icon:'��️', name:'Gym � 2 Hours',                   c:'gym',     tag:'Gym',      major:true },
      { time:'7:30-7:45',  icon:'��', name:'Post-Gym Freshen Up',              c:'routine', tag:'Routine'   },
      { time:'7:45-8:00',  icon:'��', name:'Travel to College',                c:'routine', tag:'Travel'    },
      { time:'8:00-12:00', icon:'��', name:'College Classes',                  c:'class',   tag:'College'   },
      { time:'12:00-12:20',icon:'��', name:'Travel Back',                      c:'routine', tag:'Travel'    },
      { time:'12:20-1:00', icon:'��', name:'Lunch',                            c:'routine', tag:'Meal'      },
      { time:'1:00-2:30',  icon:'��', name:'Recovery Nap',                     c:'nap',     tag:'Recovery'  },
      { time:'2:30-4:00',  icon:'��', name:'College Exam Study',               c:'college', tag:'Exam Study',major:true },
      { time:'4:00-4:15',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'4:15-5:45',  icon:'��', name:'College Exam Problems',            c:'college', tag:'Exam Study',major:true },
      { time:'5:45-6:00',  icon:'��', name:'Snacks',                           c:'routine', tag:'Meal'      },
      { time:'6:00-7:30',  icon:'��', name:'College Revision',                 c:'college', tag:'Exam Study',major:true },
      { time:'7:30-8:10',  icon:'��️', name:'Dinner',                           c:'routine', tag:'Meal'      },
      { time:'8:10-8:30',  icon:'��', name:'Rest',                             c:'break',   tag:'Rest'      },
      { time:'8:30-10:00', icon:'��', name:'College Revision',                 c:'college', tag:'Exam Study',major:true },
      { time:'10:00-10:45',icon:'��', name:'DSA � Maintenance',                c:'dsa',     tag:'DSA',      major:true },
      { time:'10:45-12:00',icon:'��', name:'Leisure / Wind Down',              c:'leisure', tag:'Leisure'   },
    ],
    summary: { dsa:0.75, skill:0, college:6, read:0, leisure:1.25, gym:2 }
  },
  sun: {
    slots: [
      { time:'9:00-9:30',  icon:'��', name:'Wake Up � Washroom',               c:'routine', tag:'Morning'   },
      { time:'9:30-10:00', icon:'��', name:'Breakfast',                        c:'routine', tag:'Meal'      },
      { time:'10:00-12:00',icon:'��', name:'College Deep Study',               c:'college', tag:'Exam Study',major:true },
      { time:'12:00-12:15',icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'12:15-1:45', icon:'��', name:'College Exam Problems',            c:'college', tag:'Exam Study',major:true },
      { time:'1:45-2:30',  icon:'��', name:'Lunch',                            c:'routine', tag:'Meal'      },
      { time:'2:30-3:30',  icon:'��', name:'Recovery Nap / Rest',              c:'nap',     tag:'Recovery'  },
      { time:'3:30-5:00',  icon:'��', name:'College Theory / Notes',           c:'college', tag:'Exam Study',major:true },
      { time:'5:00-5:15',  icon:'��', name:'Snacks',                           c:'routine', tag:'Meal'      },
      { time:'5:15-5:45',  icon:'��', name:'Bath',                             c:'routine', tag:'Routine'   },
      { time:'5:45-6:45',  icon:'��', name:'College Revision',                 c:'college', tag:'Exam Study',major:true },
      { time:'6:45-7:00',  icon:'��', name:'Short Break / Fresh Air',          c:'leisure', tag:'Leisure'   },
      { time:'7:00-7:30',  icon:'��', name:'College Work / Revision',          c:'college', tag:'College',  major:true },
      { time:'7:30-8:00',  icon:'��', name:'DSA � Maintenance',                c:'dsa',     tag:'DSA',      major:true },
      { time:'8:00-8:40',  icon:'��️', name:'Dinner',                           c:'routine', tag:'Meal'      },
      { time:'8:40-9:00',  icon:'☕', name:'Break',                            c:'break',   tag:'Break'     },
      { time:'9:00-10:00', icon:'��', name:'College Prep for Tomorrow',        c:'college', tag:'Exam Study',major:true },
      { time:'10:00-11:30',icon:'��', name:'Leisure / Movie / Gaming',         c:'leisure', tag:'Leisure'   },
      { time:'11:30-1:00', icon:'��', name:'Wind Down / Free Time',            c:'leisure', tag:'Wind Down' },
    ],
    summary: { dsa:0.5, skill:0, college:7.25, read:0, leisure:2.5, gym:0 }
  }
};
let SCHEDULE = SCHEDULE_NORMAL;

const DAY_KEYS   = ['mon','tue','wed','thu','fri','sat','sun'];
const DAY_NAMES  = { mon:'Monday', tue:'Tuesday', wed:'Wednesday', thu:'Thursday', fri:'Friday', sat:'Saturday', sun:'Sunday' };
const DAY_COLORS = { mon:'#7c6aff', tue:'#4ade80', wed:'#facc15', thu:'#fb923c', fri:'#f87171', sat:'#c084fc', sun:'#a78bfa' };
const CAT_COLORS = {
  dsa:'#6ee7b7', skill:'#60a5fa', college:'#f9a8d4',
  read:'#fde68a', leisure:'#c4b5fd', routine:'#94a3b8',
  class:'#fb923c', break:'#64748b', gym:'#34d399', nap:'#818cf8'
};

// ─── STORAGE ───────────────────────────────────────────────────────────────
const LS_KEY = 'timetable_v3';
function loadStore() { try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch { return {}; } }
function saveStore(s) { localStorage.setItem(LS_KEY, JSON.stringify(s)); }
function slotKey(week, day, idx) { return `${week}__${day}__${idx}`; }
function isChecked(s, w, d, i)   { return !!s[slotKey(w,d,i)]; }
function toggleCheck(s, w, d, i) { const k=slotKey(w,d,i); s[k]=!s[k]; saveStore(s); }

// ─── WEEK PICKER ────────────────────────────────────────────────────────────
let currentWeek = '';

function getISOWeek(d) {
  const dt = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  dt.setUTCDate(dt.getUTCDate() + 4 - (dt.getUTCDay() || 7));
  const ys = new Date(Date.UTC(dt.getUTCFullYear(),0,1));
  const wn = Math.ceil((((dt-ys)/86400000)+1)/7);
  return `${dt.getUTCFullYear()}-W${String(wn).padStart(2,'0')}`;
}

function weekToLabel(ws) {
  const [year, wpart] = ws.split('-W');
  const w = parseInt(wpart);
  const jan4 = new Date(parseInt(year),0,4);
  const start = new Date(jan4);
  start.setDate(jan4.getDate() - jan4.getDay() + 1 + (w-1)*7);
  const end = new Date(start); end.setDate(end.getDate()+6);
  const o = {month:'short',day:'numeric'};
  return `${start.toLocaleDateString('en-IN',o)} – ${end.toLocaleDateString('en-IN',o)}, ${year}`;
}

function initWeekPicker() {
  const input = document.getElementById('weekPicker');
  const today = getISOWeek(new Date());
  input.value = today; currentWeek = today;
  document.getElementById('weekLabelText').textContent = weekToLabel(today);
  input.addEventListener('change', () => {
    currentWeek = input.value;
    document.getElementById('weekLabelText').textContent = weekToLabel(currentWeek);
    reRenderAll();
  });
}

// ─── COUNTS ─────────────────────────────────────────────────────────────────
function countDay(store, week, day) {
  let total=0, done=0;
  SCHEDULE[day].slots.forEach((s,i) => { if(s.major){ total++; if(isChecked(store,week,day,i)) done++; } });
  return {total, done};
}
function countWeek(store, week) {
  let total=0, done=0;
  DAY_KEYS.forEach(d => { const c=countDay(store,week,d); total+=c.total; done+=c.done; });
  return {total, done};
}
function pct(done, total) { return total ? Math.round(done/total*100) : 0; }

// ─── RENDER SCHEDULE ────────────────────────────────────────────────────────
function renderSchedule(dayKey, store) {
  const container = document.getElementById('sched-'+dayKey);
  if(!container) return;
  container.innerHTML = '';
  SCHEDULE[dayKey].slots.forEach((s,i) => {
    const checked = s.major && isChecked(store, currentWeek, dayKey, i);
    const div = document.createElement('div');
    div.className = ['slot','c-'+s.c, s.major?'is-major':'', checked?'is-done':''].filter(Boolean).join(' ');
    div.style.animationDelay = (i*0.025)+'s';
    div.innerHTML = `
      <div class="slot-time">${s.time}</div>
      <div class="slot-body">
        <span class="slot-icon">${s.icon}</span>
        <span class="slot-name">${s.name}</span>
        <span class="slot-tag">${s.tag}</span>
        ${s.major?`<button class="slot-tick${checked?' ticked':''}" title="${checked?'Undo':'Mark done'}" data-day="${dayKey}" data-idx="${i}"></button>`:''}
      </div>`;
    if(s.major) {
      div.querySelector('.slot-tick').addEventListener('click', e => {
        e.stopPropagation();
        handleTick(dayKey, i, div, store);
      });
    }
    container.appendChild(div);
  });
  renderDaySummary(dayKey, store);
}

function handleTick(dayKey, idx, slotEl, store) {
  toggleCheck(store, currentWeek, dayKey, idx);
  const checked = isChecked(store, currentWeek, dayKey, idx);
  slotEl.classList.toggle('is-done', checked);
  const btn = slotEl.querySelector('.slot-tick');
  if(btn) { btn.classList.toggle('ticked', checked); btn.title = checked?'Undo':'Mark done'; }
  updateAllProgress(store);
  showToast(checked ? '✅ Marked as done!' : '↩️ Unmarked');
}

function renderDaySummary(dayKey, store) {
  const sumEl = document.getElementById('sum-'+dayKey);
  if(!sumEl) return;
  sumEl.innerHTML = '';
  const {total, done} = countDay(store, currentWeek, dayKey);
  const p = pct(done, total);

  [
    ['dsa','DSA'],['skill','Skill Dev'],['college','College'],
    ['read','Reading'],['gym','Gym'],['leisure','Leisure']
  ].forEach(([k,label]) => {
    const hrs = SCHEDULE[dayKey].summary[k]; if(!hrs) return;
    const chip = document.createElement('div'); chip.className='ds-chip';
    chip.innerHTML = `<div class="dot" style="background:${CAT_COLORS[k]}"></div>${label}:<strong style="color:${CAT_COLORS[k]};margin-left:4px">${hrs}h</strong>`;
    sumEl.appendChild(chip);
  });

  if(total>0) {
    const chip2 = document.createElement('div'); chip2.className='ds-chip';
    chip2.style.borderColor = p===100?'rgba(34,197,94,0.4)':'var(--border)';
    chip2.innerHTML = `<span style="font-size:0.9rem">${p===100?'🎉':'📋'}</span>&nbsp;${done}/${total}&nbsp;<strong style="color:${p===100?'var(--green)':'var(--accent2)'}">${p}%</strong>`;
    sumEl.appendChild(chip2);
  }
}

// ─── UPDATE ALL PROGRESS UI ─────────────────────────────────────────────────
function updateAllProgress(store) {
  DAY_KEYS.forEach(dk => {
    const {total, done} = countDay(store, currentWeek, dk);
    const p = pct(done, total);
    const bar   = document.getElementById('daybar-'+dk);
    const label = document.getElementById('daylabel-'+dk);
    const badge = document.getElementById('pct-'+dk);
    if(bar)   bar.style.width = p+'%';
    if(label) { label.textContent = total ? `${done}/${total}` : '–'; label.style.color = p===100?'var(--green)':'var(--accent2)'; }
    if(badge) badge.textContent = total ? p+'%' : '–';
  });

  const {total, done} = countWeek(store, currentWeek);
  const p = pct(done, total);
  const circ = 2*Math.PI*33;
  const ring = document.getElementById('overallRingFill');
  if(ring) ring.style.strokeDashoffset = (circ*(1-p/100)).toFixed(2);
  const numEl = document.getElementById('overallPctNum');
  if(numEl) numEl.textContent = p+'%';
  const descEl = document.getElementById('overallDesc');
  if(descEl) {
    if(p===100) descEl.textContent = '🎉 Perfect week! Every major task completed!';
    else if(p>=75) descEl.textContent = `Great progress — ${done}/${total} tasks done. Keep it up!`;
    else if(p>=40) descEl.textContent = `${done}/${total} tasks done. Building momentum — stay consistent!`;
    else descEl.textContent = `${done}/${total} tasks done this week. Tap the ✓ circle on any task to track it.`;
  }
  renderDayRings(store);
}

function renderDayRings(store) {
  const container = document.getElementById('dayRings');
  if(!container) return;
  container.innerHTML = '';
  DAY_KEYS.forEach(dk => {
    const {total, done} = countDay(store, currentWeek, dk);
    const p = pct(done, total);
    const r=16, circ=2*Math.PI*r;
    const offset = circ*(1-p/100);
    const col = DAY_COLORS[dk];
    const wrap = document.createElement('div'); wrap.className='day-mini-ring';
    wrap.innerHTML = `
      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r="${r}" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="5"/>
        <circle cx="22" cy="22" r="${r}" fill="none" stroke="${col}" stroke-width="5"
          stroke-linecap="round"
          stroke-dasharray="${circ.toFixed(2)}"
          stroke-dashoffset="${offset.toFixed(2)}"
          style="transition:stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)"/>
      </svg>
      <span>${DAY_NAMES[dk].slice(0,3)}</span>`;
    container.appendChild(wrap);
  });
}

// ─── SHOW DAY ───────────────────────────────────────────────────────────────
function showDay(dayKey) {
  document.querySelectorAll('.day-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('panel-'+dayKey).classList.add('active');
  document.getElementById('btn-'+dayKey).classList.add('active');
  renderSchedule(dayKey, loadStore());
}

// ─── RE-RENDER ALL ───────────────────────────────────────────────────────────
function reRenderAll() {
  const store = loadStore();
  const active = document.querySelector('.day-panel.active');
  if(active) renderSchedule(active.id.replace('panel-',''), store);
  updateAllProgress(store);
}

// ─── HISTORY ─────────────────────────────────────────────────────────────────
function renderHistory() {
  const store = loadStore();
  const container = document.getElementById('historyList');
  container.innerHTML = '';
  const weeks = new Set();
  Object.keys(store).forEach(k => { const p=k.split('__'); if(p.length>=1) weeks.add(p[0]); });

  if(!weeks.size) {
    container.innerHTML = '<div class="no-history"><span>📭</span>No history yet. Tick off tasks and they\'ll appear here week by week!</div>';
    return;
  }
  [...weeks].sort().reverse().forEach((ws,wi) => {
    const {total, done} = countWeek(store, ws);
    const p = pct(done, total);
    const col = p>=80?'#22c55e':p>=50?'var(--accent2)':'#f87171';
    const div = document.createElement('div');
    div.className = 'history-week'+(wi===0?' open':'');
    div.innerHTML = `
      <div class="history-week-header" onclick="this.parentElement.classList.toggle('open')">
        <div class="hw-label">📅 ${weekToLabel(ws)}</div>
        <div class="hw-pct" style="color:${col}">${p}%</div>
        <div class="hw-chevron">▼</div>
      </div>
      <div class="history-week-body">
        ${DAY_KEYS.map(dk => {
          const {total:t,done:d} = countDay(store,ws,dk);
          const pp=pct(d,t);
          const dc=pp>=80?'#22c55e':pp>=50?'var(--accent2)':'#f87171';
          return `<div class="hw-day-row">
            <div class="hw-day-name">${DAY_NAMES[dk]}</div>
            <div class="hw-day-track"><div class="hw-day-fill" style="width:${pp}%;background:${dc}"></div></div>
            <div class="hw-day-val">${t?d+'/'+t:''}</div>
            <div class="hw-day-pct" style="color:${dc}">${t?pp+'%':'–'}</div>
          </div>`;
        }).join('')}
      </div>`;
    container.appendChild(div);
  });
}

// ─── WEEKLY FOCUS BARS ──────────────────────────────────────────────────────
// Computed dynamically from the active schedule
function getWeeklyHours() {
  const totals = {dsa:0, skill:0, college:0, read:0, leisure:0, gym:0};
  DAY_KEYS.forEach(dk => {
    const s = SCHEDULE[dk].summary;
    Object.keys(totals).forEach(k => { totals[k] += (s[k]||0); });
  });
  return totals;
}

const WEEKLY_META = [
  {key:'dsa',     label:'🧩 DSA',          max:20, color:'var(--dsa)'},
  {key:'skill',   label:'💻 Skill Dev',     max:20, color:'var(--skill)'},
  {key:'college', label:'📘 College Work',  max:25, color:'var(--college)'},
  {key:'read',    label:'📖 Reading',       max:10, color:'var(--read)'},
  {key:'gym',     label:'🏋️ Gym',           max:14, color:'var(--gym)'},
  {key:'leisure', label:'🎮 Leisure',       max:20, color:'var(--leisure)'},
];

function renderWeeklyBars() {
  const el = document.getElementById('progRows'); if(!el) return;
  el.innerHTML='';
  const hours = getWeeklyHours();
  WEEKLY_META.forEach(item => {
    const hrs = +(hours[item.key]||0).toFixed(1);
    const p = Math.min(100,(hrs/item.max*100)).toFixed(1);
    const row = document.createElement('div'); row.className='prog-row';
    row.innerHTML = `<div class="prog-label">${item.label}</div>
      <div class="prog-track"><div class="prog-fill" style="background:${item.color}" data-pct="${p}"></div></div>
      <div class="prog-val">${hrs} hrs</div>`;
    el.appendChild(row);
  });
  requestAnimationFrame(() => {
    document.querySelectorAll('.prog-fill').forEach(el => { el.style.width=el.dataset.pct+'%'; });
  });
}

// ─── STAT COUNTER ────────────────────────────────────────────────────────────
function animateCounters() {
  const hours = getWeeklyHours();
  const targets = [hours.dsa, hours.skill, hours.college, hours.read, hours.leisure];
  document.querySelectorAll('.stat-val[data-target]').forEach((el, i) => {
    const target = Math.round(targets[i] || parseInt(el.dataset.target));
    let cur=0;
    const step=Math.max(1,Math.floor(target/20));
    const t=setInterval(()=>{ cur=Math.min(cur+step,target); el.textContent=cur; if(cur>=target) clearInterval(t); },40);
  });
}

// ─── TOAST ───────────────────────────────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2000);
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  initWeekPicker();
  const store = loadStore();
  renderSchedule('mon', store);
  updateAllProgress(store);
  renderWeeklyBars();
  setTimeout(animateCounters, 300);
});
