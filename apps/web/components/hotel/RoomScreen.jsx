"use client";
import { useEffect, useRef } from "react";
import { useHotel } from "@/context/HotelContext";

// ═══════════════════════════════════════════
// ROOM SCREEN — Screen 3
// Full immersive room: bed, shelf, desk, player
// ═══════════════════════════════════════════

function ShelfBooks({ books }) {
  return (
    <>
      {books.map((b, i) => (
        <div key={i} className="sbook" style={{ "--bc": b.c, "--bh": `${b.h}px` }} data-t={b.t} />
      ))}
    </>
  );
}

function CollectionPanel({ items, onOpenItem }) {
  if (!items || items.length === 0) {
    return (
      <div
        style={{
          fontFamily: '"IM Fell English", serif',
          fontStyle: "italic",
          fontSize: "0.75rem",
          color: "rgba(253,248,240,0.2)",
        }}
      >
        nothing yet
      </div>
    );
  }

  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className="rcp-item"
          data-id={item.id}
          data-type={item.type}
          onClick={() => onOpenItem(item.id, item.type)}
        >
          <span style={{ fontSize: "0.62rem", opacity: 0.4, marginRight: 4 }}>
            {item.type === "book" ? "📖" : "♪"}
          </span>
          {item.label}
        </div>
      ))}
    </>
  );
}

export default function RoomScreen({ active }) {
  const { guest, allRooms, activeRoomId, exitRoom, OCaptain } = useHotel();
  const roomRef = useRef(null);

  const roomData = activeRoomId ? allRooms[activeRoomId] : null;

  // Use guest's personalized alias/quote if this is their booked room
  const alias =
    guest.bookedRoom === activeRoomId && guest.alias ? guest.alias : roomData?.alias || "";
  const quote =
    guest.bookedRoom === activeRoomId && guest.quote ? `"${guest.quote}"` : roomData?.quote || "";

  // Personal collection items for this room
  const isPersonalRoom = guest.bookedRoom === activeRoomId;
  const collectionItems = isPersonalRoom
    ? [
        ...guest.books.map((b, i) => ({ label: b, type: "book", id: `book-${i}` })),
        ...guest.music.map((m, i) => ({ label: m, type: "music", id: `music-${i}` })),
      ]
    : [];

  // Responsive furniture positioning
  useEffect(() => {
    if (!active || !roomRef.current) return;

    const position = () => {
      const w = window.innerWidth;
      const room = roomRef.current;
      if (!room) return;

      const bed = room.querySelector("#rmBed");
      const bedside = room.querySelector("#rmBedside");
      const blamp = room.querySelector("#rmBlamp");
      const flamp = room.querySelector("#rmFlamp");
      const desk = room.querySelector("#rmDesk");
      const shelf = room.querySelector("#rmShelf");

      if (bed) {
        const bedW = Math.min(280, w * 0.24);
        bed.style.width = bedW + "px";
        bed.style.left = w * 0.03 + "px";

        if (bedside) {
          const bsideW = Math.min(55, w * 0.06);
          bedside.style.width = bsideW + "px";
          bedside.style.left = w * 0.03 + bedW + 6 + "px";

          if (blamp) {
            const blampW = Math.min(56, w * 0.06);
            blamp.style.left = w * 0.03 + bedW + 6 + bsideW / 2 - blampW / 2 + "px";
          }
        }
      }

      if (flamp) flamp.style.right = w * 0.05 + 160 + "px";

      if (desk) {
        const deskW = Math.min(260, w * 0.28);
        desk.style.width = deskW + "px";
        desk.style.left = w / 2 - deskW / 2 + "px";
      }

      if (shelf) shelf.style.right = w * 0.04 + "px";
    };

    position();
    window.addEventListener("resize", position);
    return () => window.removeEventListener("resize", position);
  }, [active]);

  if (!roomData) return null;

  const d = roomData;
  const accentColor = d.accent || "#f0b84a";
  const platterBg = `radial-gradient(circle,#111 26%,#1e1e1e 27%,${d.pc} 28%,${d.pc} 74%,#111 75%,#080808 100%)`;
  const rugBg = `repeating-linear-gradient(90deg, ${d.rug} 0, ${d.rug} 4px, transparent 4px, transparent 20px), ${d.floor}`;
  const ambientBg = `radial-gradient(ellipse 60% 70% at 50% 50%, ${d.glow}, transparent 65%)`;
  const winBg = `linear-gradient(160deg, ${d.win} 0%, rgba(255,255,255,0.04) 100%)`;
  const winShadow = `0 0 90px 35px ${d.win}, inset 0 0 30px rgba(255,255,255,0.04)`;

  return (
    <div
      ref={roomRef}
      className={`screen${active ? " active" : ""}`}
      id="s-room"
      style={{
        "--rwall": d.wall,
        "--rfloor": d.floor,
        "--rwinlight": d.win,
        "--rglow": d.glow,
        "--rpc": d.pc,
        "--raccent": accentColor,
        "--raccent-dim": d.rug,
        "--rlampshade": d.lampshade,
        "--rlampglow": d.lampglow,
        "--rduvet": d.duvet,
        "--rcurtain": d.curtain,
      }}
    >
      {/* ENVIRONMENT */}
      <div className="rm-wall" id="rWall" style={{ background: d.wall }} />
      <div className="rm-ceiling" />
      <div className="rm-ceiling-light" />
      <div className="rm-floor" id="rFloor" style={{ background: d.floor }} />
      <div className="rm-rug" id="rRug" style={{ background: rugBg, borderColor: d.rug }} />
      <div className="rm-window" id="rWin" style={{ background: winBg, boxShadow: winShadow }} />
      <div className="rm-curtain-l" id="rCurtL" style={{ background: d.curtain }} />
      <div className="rm-curtain-r" id="rCurtR" style={{ background: d.curtain }} />
      <div className="rm-win-floor" id="rWinFloor" style={{ background: d.win }} />
      <div className="rm-ambient" id="rAmbient" style={{ background: ambientBg }} />

      {/* ROOM IDENTITY */}
      <div className="room-id">
        <div className="room-alias-txt" id="rAlias" style={{ color: accentColor }}>
          {alias}
        </div>
        <div className="room-q" id="rQuote">
          {quote}
        </div>
      </div>

      {/* BED */}
      <div className="rm-bed" id="rmBed">
        <div className="bed-headboard">
          <div className="headboard-panel" />
          <div className="headboard-panel" />
        </div>
        <div className="bed-pillows">
          <div className="bed-pillow" />
          <div className="bed-pillow" />
        </div>
        <div className="bed-duvet" id="bedDuvet" style={{ background: d.duvet }} />
        <div className="bed-frame" />
        <div className="bed-mattress" />
        <div className="bed-legs">
          <div className="bed-leg" />
          <div className="bed-leg" />
        </div>
      </div>

      {/* BEDSIDE TABLE */}
      <div className="rm-bedside" id="rmBedside">
        <div className="bedside-top" />
        <div className="bedside-body" />
        <div className="bedside-legs">
          <div className="bedside-leg" />
          <div className="bedside-leg" />
        </div>
      </div>

      {/* BEDSIDE LAMP */}
      <div className="rm-bedside-lamp" id="rmBlamp">
        <div className="blamp-glow" id="bLampGlow" style={{ background: d.lampglow }} />
        <div className="blamp-shade" id="bLampShade" style={{ background: d.lampshade }} />
        <div className="blamp-pole" />
        <div className="blamp-base" />
      </div>

      {/* FLOOR LAMP */}
      <div className="rm-floor-lamp" id="rmFlamp">
        <div className="flamp-glow" id="fLampGlow" style={{ background: d.lampglow }} />
        <div className="flamp-shade" id="fLampShade" style={{ background: d.lampshade }} />
        <div className="flamp-pole" />
        <div className="flamp-base" />
      </div>

      {/* BOOKSHELF */}
      <div className="rm-shelf" id="rmShelf">
        <div className="shelf-top-decor">
          <div className="shelf-plant" />
          <div className="shelf-frame" />
          <div className="shelf-candle-sm" />
        </div>
        <div className="shelf-row">
          <div className="shelf-books" id="sBooks1">
            <ShelfBooks books={d.s1 || []} />
          </div>
        </div>
        <div className="shelf-row">
          <div className="shelf-books" id="sBooks2">
            <ShelfBooks books={d.s2 || []} />
          </div>
        </div>
      </div>

      {/* DESK + RECORD PLAYER */}
      <div className="rm-desk-area" id="rmDesk">
        <div className="desk-top-items">
          {/* RECORD PLAYER */}
          <div className="rplayer" id="rPlayer">
            <div className="rplatter" id="rPlatter" style={{ background: platterBg }} />
            <div className="rarm" />
            <div className="rpinfo">
              <div className="rpnow">now playing</div>
              <div className="rptrack" id="rpTrack">
                {d.track}
              </div>
              <div className="rpartist" id="rpArtist">
                {d.artist}
              </div>
              <div className="rpbtns">
                {/* BACKEND HOOK: wire via OCaptain.onPlayerBtn */}
                <div className="rpbtn" id="rpBtnPrev" title="Previous" />
                <div
                  className="rpbtn on"
                  id="rpBtn"
                  title="Play/Pause"
                  style={{ background: d.pc, boxShadow: `0 0 5px ${d.pc}` }}
                />
                <div className="rpbtn" id="rpBtnNext" title="Next" />
              </div>
            </div>
          </div>

          {/* DESK OBJECTS */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            <div className="d-mug" />
            <div className="d-books-stack">
              <div className="d-book-h" style={{ width: 36, background: "#4a2a18" }} />
              <div className="d-book-h" style={{ width: 34, background: "#1a3a2a" }} />
              <div className="d-book-h" style={{ width: 38, background: "#1a1a3a" }} />
            </div>
          </div>
          <div className="d-candle" />
        </div>
        <div className="desk-surface" />
        <div className="desk-legs-row">
          <div className="desk-leg-p" />
          <div className="desk-leg-p" />
        </div>
      </div>

      {/* PERSONAL COLLECTION PANEL */}
      {/* BACKEND HOOK: populate with user's saved books/music via OCaptain.addToCollection */}
      <div className="room-collection-panel" id="roomCollectionPanel">
        <div className="rcp-label">your collection</div>
        <div className="rcp-items" id="rcpItems">
          <CollectionPanel
            items={collectionItems}
            onOpenItem={(id, type) => OCaptain.openItem(id, type)}
          />
        </div>
      </div>

      {/* NOW PLAYING BAR */}
      {/* BACKEND HOOK: show via OCaptain.setTrack(title, artist) */}
      <div id="nowPlayingOverlay">
        <div className="npo-label">now playing</div>
        <div className="npo-bar">
          <div className="npo-progress" id="npoProgress" />
        </div>
      </div>

      <button className="room-back" onClick={exitRoom}>
        ← back to hallway
      </button>
    </div>
  );
}
