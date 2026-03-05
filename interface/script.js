/* ══════════════════════════════════
   STATE
══════════════════════════════════ */
const state = {
  guestName: "",
  alias: "",
  quote: "",
  bookedRoom: null,
  mode: "explore",
  books: [],
  music: [],
};

/* ══════════════════════════════════
   ROOM DATA
══════════════════════════════════ */
const ROOMS = {
  amber: {
    wall: "#231a0f",
    floor: "#3a2410",
    win: "rgba(245,195,90,0.5)",
    curtain: "rgba(120,60,20,0.7)",
    glow: "rgba(245,170,45,0.3)",
    pc: "#c47838",
    accent: "#f0b84a",
    duvet: "#7a3820",
    lampshade: "rgba(220,160,60,0.85)",
    lampglow: "rgba(245,195,80,0.5)",
    rug: "rgba(180,100,40,0.3)",
    alias: "the midnight reader",
    quote: '"I read to know I am not alone."',
    track: "Kind of Blue",
    artist: "Miles Davis",
    s1: [
      { c: "#8b2020", h: 72, t: "Middlemarch" },
      { c: "#1a3a5c", h: 58, t: "Giovanni's Room" },
      { c: "#2d5a1a", h: 76, t: "Beloved" },
      { c: "#6b1a3a", h: 54, t: "Pachinko" },
      { c: "#4a3a10", h: 66, t: "The Goldfinch" },
      { c: "#1a4a3a", h: 61, t: "On Earth" },
      { c: "#5c2a0a", h: 68, t: "Wide Sargasso" },
      { c: "#2a2a5c", h: 51, t: "A Room" },
    ],
    s2: [
      { c: "#3a1a10", h: 61, t: "The Hours" },
      { c: "#1a1a1a", h: 56, t: "Beloved" },
      { c: "#4a2a18", h: 68, t: "Sebald" },
      { c: "#1a3a2a", h: 51, t: "Sontag" },
      { c: "#2a1a3a", h: 64, t: "Borges" },
      { c: "#3a2a08", h: 58, t: "Woolf" },
      { c: "#1a2a1a", h: 54, t: "Baldwin" },
    ],
  },
  blue: {
    wall: "#0c1520",
    floor: "#0a1018",
    win: "rgba(118,184,224,0.48)",
    curtain: "rgba(20,40,80,0.75)",
    glow: "rgba(65,148,212,0.22)",
    pc: "#3a7a9a",
    accent: "#78c0e0",
    duvet: "#1a2a4a",
    lampshade: "rgba(80,140,200,0.8)",
    lampglow: "rgba(100,170,220,0.45)",
    rug: "rgba(30,60,120,0.25)",
    alias: "stranger no. 7",
    quote: '"The unexamined life is not worth living."',
    track: "Kid A",
    artist: "Radiohead",
    s1: [
      { c: "#1a1a3a", h: 74, t: "Being & Time" },
      { c: "#2a1a1a", h: 56, t: "The Stranger" },
      { c: "#0a2a1a", h: 68, t: "Nausea" },
      { c: "#3a2a0a", h: 51, t: "Nietzsche" },
      { c: "#1a2a3a", h: 64, t: "Meditations" },
      { c: "#2a0a2a", h: 58, t: "Camus" },
      { c: "#0a1a2a", h: 71, t: "Kierkegaard" },
    ],
    s2: [
      { c: "#0a0a2a", h: 56, t: "Kafka" },
      { c: "#2a1a2a", h: 64, t: "Dostoevsky" },
      { c: "#1a2a1a", h: 48, t: "Chekhov" },
      { c: "#2a0a0a", h: 68, t: "Woolf" },
      { c: "#1a1a2a", h: 54, t: "Beckett" },
      { c: "#0a2a2a", h: 61, t: "Plath" },
      { c: "#2a2a1a", h: 58, t: "Pessoa" },
    ],
  },
  green: {
    wall: "#101808",
    floor: "#0c1608",
    win: "rgba(148,204,88,0.44)",
    curtain: "rgba(30,70,20,0.7)",
    glow: "rgba(108,178,48,0.2)",
    pc: "#5a9a28",
    accent: "#98d050",
    duvet: "#2a4a1a",
    lampshade: "rgba(120,180,60,0.8)",
    lampglow: "rgba(140,200,70,0.4)",
    rug: "rgba(60,110,30,0.28)",
    alias: "the sleepless archivist",
    quote: '"Tell me, what is it you plan to do with your one wild and precious life?"',
    track: "Carrie & Lowell",
    artist: "Sufjan Stevens",
    s1: [
      { c: "#2a4a1a", h: 68, t: "Mary Oliver" },
      { c: "#3a1a2a", h: 56, t: "Ariel" },
      { c: "#1a3a2a", h: 74, t: "Devotions" },
      { c: "#4a3a0a", h: 51, t: "Milk & Honey" },
      { c: "#1a1a3a", h: 64, t: "Wild Geese" },
      { c: "#3a2a1a", h: 58, t: "Rupi Kaur" },
      { c: "#1a3a1a", h: 70, t: "Sun & Flowers" },
    ],
    s2: [
      { c: "#2a1a3a", h: 54, t: "Folklore" },
      { c: "#1a2a2a", h: 61, t: "Punisher" },
      { c: "#3a1a1a", h: 66, t: "Fleet Foxes" },
      { c: "#1a1a2a", h: 48, t: "Big Thief" },
      { c: "#2a3a1a", h: 58, t: "Bon Iver" },
      { c: "#1a2a1a", h: 64, t: "boygenius" },
      { c: "#3a2a2a", h: 54, t: "Phoebe B" },
    ],
  },
};

/* Rotating quotes for reception */
const quotes = [
  '"I am not afraid of storms, for I am learning how to sail my ship."',
  '"Not all those who wander are lost."',
  '"We read to know we are not alone."',
  '"A reader lives a thousand lives before he dies."',
  '"There is no friend as loyal as a book."',
  '"I took a deep breath and listened to the old brag of my heart: I am, I am, I am."',
];

/* ══════════════════════════════════
   RECEPTION UI
══════════════════════════════════ */
let selectedRoom = null;

document.getElementById("qotn-text").textContent =
  quotes[Math.floor(Math.random() * quotes.length)];

function switchTab(tab) {
  document.getElementById("tab-explore").classList.toggle("active", tab === "explore");
  document.getElementById("tab-book").classList.toggle("active", tab === "book");
  document.getElementById("sec-explore").classList.toggle("visible", tab === "explore");
  document.getElementById("sec-book").classList.toggle("visible", tab === "book");
}

function pickRoom(el, roomId) {
  document.querySelectorAll(".room-pick").forEach((r) => r.classList.remove("selected"));
  el.classList.add("selected");
  selectedRoom = roomId;
}

function ringBell() {
  const bell = document.getElementById("deskBell");
  const toast = document.getElementById("dingToast");
  bell.classList.remove("ding");
  void bell.offsetWidth;
  bell.classList.add("ding");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

/* ── TAGS ── */
const tags = { book: [], music: [] };

function addTag(type) {
  const input = document.getElementById(type === "book" ? "bookInput" : "musicInput");
  const val = input.value.trim();
  if (!val) return;
  tags[type].push(val);
  renderTags(type);
  input.value = "";
  input.focus();
}

function removeTag(type, i) {
  tags[type].splice(i, 1);
  renderTags(type);
}

function renderTags(type) {
  const container = document.getElementById(type === "book" ? "bookTags" : "musicTags");
  container.innerHTML = tags[type]
    .map(
      (t, i) =>
        `<div class="coll-tag">${t}<button onclick="removeTag('${type}',${i})">×</button></div>`
    )
    .join("");
}

function handleTagEnter(e, type) {
  if (e.key === "Enter") {
    e.preventDefault();
    addTag(type);
  }
}

/* ══════════════════════════════════
   NAVIGATION
══════════════════════════════════ */
function enterHotel(mode) {
  const name =
    mode === "explore"
      ? document.getElementById("exploreNameInput").value.trim() || "wanderer"
      : document.getElementById("bookName").value.trim() || "wanderer";

  state.guestName = name;
  state.mode = mode;
  state.books = [...tags.book];
  state.music = [...tags.music];

  if (mode === "book") {
    state.bookedRoom = document.getElementById("bookRoom").value || null;
    state.alias = document.getElementById("bookAlias").value.trim();
    state.quote = document.getElementById("bookQuote").value.trim();
    if (state.bookedRoom) {
      document.getElementById("badge-" + state.bookedRoom).style.display = "flex";
    }
  } else {
    state.bookedRoom = selectedRoom;
    if (selectedRoom) {
      document.getElementById("badge-" + selectedRoom).style.display = "flex";
    }
  }

  document.getElementById("guestNameDisplay").textContent = name;

  flash(() => {
    showScreen("s-hallway");
  });
}

function enterRoom(id) {
  const d = ROOMS[id];
  flash(() => {
    buildRoom(d, id);
    positionFurniture();
    showScreen("s-room");
  });
}

function exitRoom() {
  flash(() => showScreen("s-hallway"));
}

/* ══════════════════════════════════
   DOOR CREATION SYSTEM
══════════════════════════════════ */
const DOOR_PALETTES = [
  {
    id: "crimson",
    door: "#3d1515",
    crack: "#e87070",
    wall: "#1f0e0e",
    floor: "#2e1010",
    win: "rgba(230,110,110,0.5)",
    glow: "rgba(200,70,70,0.25)",
    pc: "#b84040",
    accent: "#e87070",
    duvet: "#5a1a1a",
    lamp: "rgba(200,100,80,0.85)",
    lampg: "rgba(220,110,80,0.45)",
    rug: "rgba(160,50,50,0.28)",
  },
  {
    id: "amber",
    door: "#5c3318",
    crack: "#f5c060",
    wall: "#231a0f",
    floor: "#3a2410",
    win: "rgba(245,195,90,0.5)",
    glow: "rgba(245,170,45,0.3)",
    pc: "#c47838",
    accent: "#f0b84a",
    duvet: "#7a3820",
    lamp: "rgba(220,160,60,0.85)",
    lampg: "rgba(245,195,80,0.5)",
    rug: "rgba(180,100,40,0.3)",
  },
  {
    id: "violet",
    door: "#2a1838",
    crack: "#c090f0",
    wall: "#180e24",
    floor: "#200e30",
    win: "rgba(180,130,240,0.5)",
    glow: "rgba(150,90,220,0.25)",
    pc: "#9060c0",
    accent: "#c090f0",
    duvet: "#3a1a5a",
    lamp: "rgba(160,100,220,0.8)",
    lampg: "rgba(180,120,240,0.45)",
    rug: "rgba(100,50,160,0.28)",
  },
  {
    id: "blue",
    door: "#1c2c3a",
    crack: "#80c4e8",
    wall: "#0c1520",
    floor: "#0a1018",
    win: "rgba(118,184,224,0.48)",
    glow: "rgba(65,148,212,0.22)",
    pc: "#3a7a9a",
    accent: "#78c0e0",
    duvet: "#1a2a4a",
    lamp: "rgba(80,140,200,0.8)",
    lampg: "rgba(100,170,220,0.45)",
    rug: "rgba(30,60,120,0.25)",
  },
  {
    id: "green",
    door: "#1c2e14",
    crack: "#a0d060",
    wall: "#101808",
    floor: "#0c1608",
    win: "rgba(148,204,88,0.44)",
    glow: "rgba(108,178,48,0.2)",
    pc: "#5a9a28",
    accent: "#98d050",
    duvet: "#2a4a1a",
    lamp: "rgba(120,180,60,0.8)",
    lampg: "rgba(140,200,70,0.4)",
    rug: "rgba(60,110,30,0.28)",
  },
  {
    id: "rose",
    door: "#3a1828",
    crack: "#f0a0c0",
    wall: "#200e18",
    floor: "#2a1020",
    win: "rgba(240,160,190,0.5)",
    glow: "rgba(210,100,150,0.25)",
    pc: "#c05080",
    accent: "#f0a0c0",
    duvet: "#5a1a38",
    lamp: "rgba(210,130,160,0.8)",
    lampg: "rgba(230,150,180,0.45)",
    rug: "rgba(160,70,110,0.28)",
  },
  {
    id: "teal",
    door: "#0e2828",
    crack: "#60d4c8",
    wall: "#081818",
    floor: "#061a1a",
    win: "rgba(90,210,200,0.48)",
    glow: "rgba(50,180,170,0.22)",
    pc: "#30a09a",
    accent: "#60d4c8",
    duvet: "#0e3030",
    lamp: "rgba(60,180,170,0.8)",
    lampg: "rgba(80,210,200,0.45)",
    rug: "rgba(20,110,100,0.28)",
  },
  {
    id: "gold",
    door: "#3a2c08",
    crack: "#f0d050",
    wall: "#201808",
    floor: "#281e06",
    win: "rgba(240,210,80,0.5)",
    glow: "rgba(210,180,40,0.25)",
    pc: "#c0a020",
    accent: "#f0d050",
    duvet: "#503808",
    lamp: "rgba(210,180,60,0.85)",
    lampg: "rgba(240,210,80,0.45)",
    rug: "rgba(160,130,20,0.3)",
  },
];

let newDoorTags = { book: [], music: [] };
let pickedPalette = DOOR_PALETTES[1];

function addRoomPrompt() {
  newDoorTags = { book: [], music: [] };
  pickedPalette = DOOR_PALETTES[1];
  renderPaletteSwatches();
  applyDoorPreview(pickedPalette);
  ["ndRoomName", "ndAlias", "ndQuote", "ndBookInput", "ndMusicInput"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  ["ndBookTags", "ndMusicTags"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = "";
  });
  const nm = document.getElementById("cdmNameplateTxt");
  if (nm) nm.textContent = "your room";
  document.getElementById("createDoorModal").classList.add("open");
}

function closeCreateModal() {
  document.getElementById("createDoorModal").classList.remove("open");
}

function renderPaletteSwatches() {
  const wrap = document.getElementById("paletteSwatches");
  if (!wrap) return;
  wrap.innerHTML = DOOR_PALETTES.map(
    (p) =>
      `<div class="cdm-color-swatch${p.id === pickedPalette.id ? " picked" : ""}"
      style="background:${p.crack};box-shadow:0 0 0 3px ${p.door} inset;"
      onclick="selectPalette('${p.id}')" title="${p.id}"></div>`
  ).join("");
}

function selectPalette(id) {
  pickedPalette = DOOR_PALETTES.find((p) => p.id === id);
  renderPaletteSwatches();
  applyDoorPreview(pickedPalette);
}

function applyDoorPreview(p) {
  const setEl = (id, prop, val) => {
    const el = document.getElementById(id);
    if (el) el.style[prop] = val;
  };
  setEl("cdmRoomBg", "background", p.wall);
  setEl("cdmRoomFloor", "background", p.floor);
  setEl("cdmRoomWin", "background", p.win);
  setEl("cdmRoomWin", "boxShadow", `0 0 14px 6px ${p.win}`);
  setEl("cdmDoorPanel", "background", p.door);
  setEl("cdmCrack", "background", p.crack);
  setEl("cdmFloorGlow", "background", p.crack);
}

function generateMiniBooks(p) {
  const colors = [p.door, p.wall, p.floor, "#4a2a18", "#1a3a2a", "#2a1a3a", "#3a1a1a", "#1a2a3a"];
  const heights = [28, 22, 30, 26, 24, 20, 27, 25];
  let html = "";
  for (let i = 0; i < 4; i++) {
    const c = colors[Math.floor(Math.random() * colors.length)];
    const h = heights[Math.floor(Math.random() * heights.length)];
    html += `<div class="r-book" style="--bc:${c};--bh:${h}px"></div>`;
  }
  return html;
}

function generateShelfBooks(p) {
  const palette = [
    p.door,
    p.accent + "55",
    "#8b2020",
    "#1a3a5c",
    "#2d5a1a",
    "#4a3a10",
    "#1a4a3a",
    "#5c2a0a",
    "#2a2a5c",
    "#3a1a10",
    "#0a2a1a",
    "#2a0a2a",
  ];
  return Array.from({ length: 7 }, () => ({
    c: palette[Math.floor(Math.random() * palette.length)],
    h: 48 + Math.floor(Math.random() * 30),
    t: newDoorTags.book[Math.floor(Math.random() * Math.max(newDoorTags.book.length, 1))] || "—",
  }));
}

function ndAddTag(type) {
  const id = type === "book" ? "ndBookInput" : "ndMusicInput";
  const inp = document.getElementById(id);
  if (!inp) return;
  const val = inp.value.trim();
  if (!val) return;
  newDoorTags[type].push(val);
  ndRenderTags(type);
  inp.value = "";
  inp.focus();
}
function ndRemoveTag(type, i) {
  newDoorTags[type].splice(i, 1);
  ndRenderTags(type);
}
function ndRenderTags(type) {
  const id = type === "book" ? "ndBookTags" : "ndMusicTags";
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = newDoorTags[type]
    .map(
      (t, i) =>
        `<div class="cdm-tag">${t}<button onclick="ndRemoveTag('${type}',${i})">×</button></div>`
    )
    .join("");
}
function ndTagEnter(e, type) {
  if (e.key === "Enter") {
    e.preventDefault();
    ndAddTag(type);
  }
}

function updateNameplate() {
  const val = document.getElementById("ndRoomName").value.trim() || "your room";
  const el = document.getElementById("cdmNameplateTxt");
  if (el) el.textContent = val;
}

function createCustomDoor() {
  const rawName = document.getElementById("ndRoomName").value.trim();
  const alias = document.getElementById("ndAlias").value.trim();
  const quote = document.getElementById("ndQuote").value.trim();
  const roomName = rawName || "the unnamed room";
  const p = pickedPalette;
  const roomId = "custom_" + Date.now();

  ROOMS[roomId] = {
    wall: p.wall,
    floor: p.floor,
    win: p.win,
    curtain: p.door,
    glow: p.glow,
    pc: p.pc,
    accent: p.accent,
    duvet: p.duvet,
    lampshade: p.lamp,
    lampglow: p.lampg,
    rug: p.rug,
    alias: alias || roomName,
    quote: quote ? `"${quote}"` : `"a room of one's own."`,
    track: "—",
    artist: "",
    s1: generateShelfBooks(p),
    s2: generateShelfBooks(p),
  };

  const doorHTML = `
    <div class="door-unit custom-door" onclick="enterRoom('${roomId}')"
      style="--door-color:${p.door};--crack-light:${p.crack};--wall:${p.wall};--floor:${p.floor};--winlight:${p.win};--glow:${p.glow};--pc:${p.pc};">
      <div class="door-scene">
        <div class="door-frame-outer">
          <div class="room-behind"><div class="room-scene">
            <div class="r-wall"></div><div class="r-floor"></div><div class="r-window"></div>
            <div class="r-shelf-unit">
              <div class="r-shelf"><div class="r-books">${generateMiniBooks(p)}</div><div class="r-shelf-plank"></div></div>
              <div class="r-shelf"><div class="r-books">${generateMiniBooks(p)}</div><div class="r-shelf-plank"></div></div>
            </div>
            <div class="r-player"><div class="r-platter" style="--pc:${p.pc}"></div><div class="r-tonearm"></div></div>
            <div class="r-glow"></div>
          </div></div>
          <div class="door-panel">
            <div class="door-face">
              <div class="dpi dpi-t"></div><div class="dpi dpi-b"></div>
              <div class="door-knob"></div><div class="door-crack"></div>
            </div>
          </div>
          <div class="door-nameplate"><p class="nameplate-txt">${roomName}</p></div>
        </div>
        <div class="door-floor-glow"></div>
      </div>
      <div class="door-lbl">${roomName} <small>yours · open</small></div>
    </div>`;

  document.querySelector(".door-add").insertAdjacentHTML("beforebegin", doorHTML);
  closeCreateModal();
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => {
    s.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

function flash(cb) {
  const f = document.getElementById("flash");
  f.classList.add("on");
  setTimeout(() => {
    cb();
    setTimeout(() => f.classList.remove("on"), 80);
  }, 280);
}

/* ══════════════════════════════════
   ROOM BUILDER
══════════════════════════════════ */
function buildRoom(d, roomId) {
  const r = document.getElementById("s-room");

  // Use guest's personalized alias/quote if booked into this room
  let alias = d.alias;
  let quote = d.quote;
  if (state.bookedRoom === roomId) {
    if (state.alias) alias = state.alias;
    if (state.quote) quote = `"${state.quote}"`;
  }

  r.style.setProperty("--rwall", d.wall);
  r.style.setProperty("--rfloor", d.floor);
  r.style.setProperty("--rwinlight", d.win);
  r.style.setProperty("--rglow", d.glow);
  r.style.setProperty("--rpc", d.pc);
  r.style.setProperty("--raccent", d.accent);
  r.style.setProperty("--raccent-dim", d.rug);
  r.style.setProperty("--rlampshade", d.lampshade);
  r.style.setProperty("--rlampglow", d.lampglow);
  r.style.setProperty("--rduvet", d.duvet);
  r.style.setProperty("--rcurtain", d.curtain);

  document.getElementById("rWall").style.background = d.wall;
  document.getElementById("rFloor").style.background = d.floor;
  const win = document.getElementById("rWin");
  win.style.background = `linear-gradient(160deg, ${d.win} 0%, rgba(255,255,255,0.04) 100%)`;
  win.style.boxShadow = `0 0 90px 35px ${d.win}, inset 0 0 30px rgba(255,255,255,0.04)`;
  document.getElementById("rWinFloor").style.background = d.win;
  document.getElementById("rCurtL").style.background = d.curtain;
  document.getElementById("rCurtR").style.background = d.curtain;
  document.getElementById("rAmbient").style.background =
    `radial-gradient(ellipse 60% 70% at 50% 50%, ${d.glow}, transparent 65%)`;
  document.getElementById("rRug").style.background =
    `repeating-linear-gradient(90deg, ${d.rug} 0, ${d.rug} 4px, transparent 4px, transparent 20px), ${d.floor}`;
  document.getElementById("rRug").style.borderColor = d.rug;
  document.getElementById("bedDuvet").style.background = d.duvet;
  document.getElementById("bLampShade").style.background = d.lampshade;
  document.getElementById("bLampGlow").style.background = d.lampglow;
  document.getElementById("fLampShade").style.background = d.lampshade;
  document.getElementById("fLampGlow").style.background = d.lampglow;
  document.getElementById("rAlias").textContent = alias;
  document.getElementById("rAlias").style.color = d.accent;
  document.getElementById("rQuote").textContent = quote;
  document.getElementById("rpTrack").textContent = d.track;
  document.getElementById("rpArtist").textContent = d.artist;
  document.getElementById("rpBtn").style.background = d.pc;
  document.getElementById("rpBtn").style.boxShadow = `0 0 5px ${d.pc}`;
  document.getElementById("rPlatter").style.background =
    `radial-gradient(circle,#111 26%,#1e1e1e 27%,${d.pc} 28%,${d.pc} 74%,#111 75%,#080808 100%)`;

  const mkBooks = (arr) =>
    arr
      .map((b) => `<div class="sbook" style="--bc:${b.c};--bh:${b.h}px" data-t="${b.t}"></div>`)
      .join("");
  document.getElementById("sBooks1").innerHTML = mkBooks(d.s1);
  document.getElementById("sBooks2").innerHTML = mkBooks(d.s2);

  // Populate personal collection panel
  buildCollectionPanel(roomId);
}

function buildCollectionPanel(roomId) {
  const panel = document.getElementById("rcpItems");
  const isPersonalRoom = state.bookedRoom === roomId;
  const allItems = [];

  if (isPersonalRoom) {
    state.books.forEach((b, i) => allItems.push({ label: b, type: "book", id: `book-${i}` }));
    state.music.forEach((m, i) => allItems.push({ label: m, type: "music", id: `music-${i}` }));
  }

  if (allItems.length === 0) {
    panel.innerHTML = `<div style="font-family:'IM Fell English',serif;font-style:italic;font-size:0.75rem;color:rgba(253,248,240,0.2);">nothing yet</div>`;
    return;
  }

  panel.innerHTML = allItems
    .map(
      (item) =>
        `<div class="rcp-item" data-id="${item.id}" data-type="${item.type}" onclick="window.OCaptain && window.OCaptain.openItem && window.OCaptain.openItem('${item.id}','${item.type}')">
      <span style="font-size:0.62rem;opacity:0.4;margin-right:4px;">${item.type === "book" ? "📖" : "♪"}</span>${item.label}
    </div>`
    )
    .join("");
}

/* ══════════════════════════════════
   FURNITURE POSITIONING
══════════════════════════════════ */
function positionFurniture() {
  const w = window.innerWidth;
  const bedW = Math.min(280, w * 0.24);

  document.getElementById("rmBed").style.width = bedW + "px";
  document.getElementById("rmBed").style.left = w * 0.03 + "px";

  const bsideW = Math.min(55, w * 0.06);
  const bside = document.getElementById("rmBedside");
  bside.style.width = bsideW + "px";
  bside.style.left = w * 0.03 + bedW + 6 + "px";

  const blamp = document.getElementById("rmBlamp");
  const blampW = Math.min(56, w * 0.06);
  blamp.style.left = w * 0.03 + bedW + 6 + bsideW / 2 - blampW / 2 + "px";

  document.getElementById("rmFlamp").style.right = w * 0.05 + 160 + "px";

  const deskW = Math.min(260, w * 0.28);
  const desk = document.getElementById("rmDesk");
  desk.style.width = deskW + "px";
  desk.style.left = w / 2 - deskW / 2 + "px";

  document.getElementById("rmShelf").style.right = w * 0.04 + "px";
}

window.addEventListener("resize", () => {
  if (document.getElementById("s-room").classList.contains("active")) positionFurniture();
});

/* ══════════════════════════════════
   BACKEND BRIDGE — window.OCaptain
   Backend developer: attach your
   implementations here.
══════════════════════════════════ */
window.OCaptain = {
  /**
   * Called when user clicks a collection item (book or music)
   * @param {string} id     — e.g. "book-0", "music-2"
   * @param {string} type   — "book" | "music"
   */
  openItem: function (id, type) {
    console.log("[OCaptain] openItem:", id, type);
    // BACKEND: implement your modal / panel / player here
  },

  /**
   * Update the record player display
   * @param {string} title
   * @param {string} artist
   */
  setTrack: function (title, artist) {
    document.getElementById("rpTrack").textContent = title;
    document.getElementById("rpArtist").textContent = artist;
    document.getElementById("nowPlayingOverlay").classList.add("visible");
  },

  /**
   * Update now-playing seek bar (0–100)
   * @param {number} percent
   */
  setProgress: function (percent) {
    document.getElementById("npoProgress").style.width = percent + "%";
  },

  /**
   * Get the current guest state (name, room, collections)
   * @returns {object}
   */
  getGuestState: function () {
    return { ...state };
  },

  /**
   * Add items to user's collection from backend
   * @param {'book'|'music'} type
   * @param {string[]} items
   */
  addToCollection: function (type, items) {
    if (type === "book") state.books.push(...items);
    if (type === "music") state.music.push(...items);
  },

  /**
   * Register a click handler for the play/prev/next buttons
   * @param {'play'|'prev'|'next'} btn
   * @param {function} handler
   */
  onPlayerBtn: function (btn, handler) {
    const ids = { play: "rpBtn", prev: "rpBtnPrev", next: "rpBtnNext" };
    const el = document.getElementById(ids[btn]);
    if (el) el.addEventListener("click", handler);
  },
};
