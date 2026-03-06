"use client";
// ═══════════════════════════════════════════
// DOOR UNIT — Individual door in the hallway
// Used for both preset and custom rooms
// ═══════════════════════════════════════════

function MiniBooks({ books }) {
  return books.map((b, i) => (
    <div key={i} className="r-book" style={{ "--bc": b.c, "--bh": `${b.h}px` }} />
  ));
}

export default function DoorUnit({ room, roomId, isBooked, onClick }) {
  const isAdd = roomId === "__add__";

  const cssVars = {
    "--door-color": room?.doorColor || room?.palette?.door || "transparent",
    "--crack-light": room?.crackLight || room?.palette?.crack || "rgba(184,134,42,0.4)",
    "--wall": room?.wall || room?.palette?.wall || "#0c0806",
    "--floor": room?.floor || room?.palette?.floor || "#0c0806",
    "--winlight": room?.winlight || room?.win || room?.palette?.win || "transparent",
    "--glow": room?.glow || room?.palette?.glow || "transparent",
    "--pc": room?.pc || room?.palette?.pc || "#c47838",
  };

  const label = room?.label || room?.name || room?.alias || roomId;
  const sub = room?.sub || "yours · open";

  if (isAdd) {
    return (
      <div
        className="door-unit door-add"
        style={{ "--door-color": "transparent", "--crack-light": "rgba(184,134,42,0.4)" }}
        onClick={onClick}
      >
        <div className="door-scene">
          <div className="door-frame-outer" style={{ borderColor: "rgba(184,134,42,0.14)" }}>
            <div className="door-panel">
              <div className="door-face">
                <div className="add-plus">+</div>
              </div>
            </div>
          </div>
        </div>
        <div className="door-lbl" style={{ opacity: 0.22 }}>
          your door <small>begin here</small>
        </div>
      </div>
    );
  }

  const books1 = room?.books1 || [];
  const books2 = room?.books2 || [];
  const pc = room?.pc || cssVars["--pc"];

  return (
    <div
      className={`door-unit${roomId?.startsWith("custom_") ? " custom-door" : ""}`}
      onClick={onClick}
      style={cssVars}
    >
      <div className="door-scene">
        <div className="door-frame-outer">
          <div className="room-behind">
            <div className="room-scene">
              <div className="r-wall" />
              <div className="r-floor" />
              <div className="r-window" />
              <div className="r-shelf-unit">
                <div className="r-shelf">
                  <div className="r-books">
                    <MiniBooks books={books1} />
                  </div>
                  <div className="r-shelf-plank" />
                </div>
                <div className="r-shelf">
                  <div className="r-books">
                    <MiniBooks books={books2} />
                  </div>
                  <div className="r-shelf-plank" />
                </div>
              </div>
              <div className="r-player">
                <div className="r-platter" style={{ "--pc": pc }} />
                <div className="r-tonearm" />
              </div>
              <div className="r-glow" />
            </div>
          </div>

          <div className="door-panel">
            <div className="door-face">
              <div className="dpi dpi-t" />
              <div className="dpi dpi-b" />
              <div className="door-knob" />
              <div className="door-crack" />
            </div>
          </div>

          <div className="door-nameplate">
            <p className="nameplate-txt">{label}</p>
          </div>

          {isBooked && (
            <div className="booked-badge">
              <span>your room</span>
            </div>
          )}
        </div>
        <div className="door-floor-glow" />
      </div>

      <div className="door-lbl">
        {label} <small>{sub}</small>
      </div>
    </div>
  );
}
