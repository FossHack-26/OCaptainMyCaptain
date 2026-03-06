"use client";
import { useState, useEffect } from "react";
import { DOOR_PALETTES } from "@/lib/hotelData";

// ═══════════════════════════════════════════
// CREATE DOOR MODAL — Custom room builder
// ═══════════════════════════════════════════

function TagInput({ label, placeholder, tags, onAdd, onRemove }) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue("");
  };

  return (
    <div className="cdm-field">
      <label className="cdm-label">{label}</label>
      <div className="cdm-tag-row">
        <input
          className="cdm-input"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          autoComplete="off"
        />
        <button className="cdm-tag-add" onClick={handleAdd}>
          + Add
        </button>
      </div>
      <div className="cdm-tags">
        {tags.map((t, i) => (
          <div className="cdm-tag" key={i}>
            {t}
            <button onClick={() => onRemove(i)}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function DoorPreview({ palette, roomName }) {
  const p = palette;
  return (
    <div className="cdm-preview-wrap">
      <div className="cdm-door-preview">
        <div className="cdm-door-frame">
          <div className="cdm-room-bg" style={{ background: p.wall }} />
          <div className="cdm-room-floor" style={{ background: p.floor }} />
          <div
            className="cdm-room-win"
            style={{ background: p.win, boxShadow: `0 0 14px 6px ${p.win}` }}
          />
          <div className="cdm-door-panel" style={{ background: p.door }}>
            <div className="cdm-door-knob" />
            <div className="cdm-crack" style={{ background: p.crack }} />
          </div>
          <div className="cdm-nameplate-prev">
            <span>{roomName || "your room"}</span>
          </div>
        </div>
        <div className="cdm-floor-glow" style={{ background: p.crack }} />
      </div>
    </div>
  );
}

export default function CreateDoorModal({ open, onClose, onCreate }) {
  const [palette, setPalette] = useState(DOOR_PALETTES[1]);
  const [roomName, setRoomName] = useState("");
  const [alias, setAlias] = useState("");
  const [quote, setQuote] = useState("");
  const [books, setBooks] = useState([]);
  const [music, setMusic] = useState([]);

  // Reset on open
  useEffect(() => {
    if (open) {
      setPalette(DOOR_PALETTES[1]);
      setRoomName("");
      setAlias("");
      setQuote("");
      setBooks([]);
      setMusic([]);
    }
  }, [open]);

  const handleCreate = () => {
    onCreate({
      palette,
      name: roomName || "the unnamed room",
      alias,
      quote,
      books,
      music,
    });
    onClose();
  };

  return (
    <div id="createDoorModal" className={open ? "open" : ""}>
      <div className="cdm-card">
        <div className="cdm-header">
          <button className="cdm-close" onClick={onClose}>
            ✕ close
          </button>
          <div className="cdm-title">Hang Your Door</div>
          <div className="cdm-sub">build a room that&apos;s entirely yours</div>
        </div>

        <div className="cdm-body">
          {/* PALETTE PICKER */}
          <label className="cdm-label">Choose your room&apos;s colour</label>
          <div className="cdm-colors">
            {DOOR_PALETTES.map((p) => (
              <div
                key={p.id}
                className={`cdm-color-swatch${p.id === palette.id ? " picked" : ""}`}
                style={{
                  background: p.crack,
                  boxShadow: `0 0 0 3px ${p.door} inset`,
                }}
                onClick={() => setPalette(p)}
                title={p.id}
              />
            ))}
          </div>

          {/* LIVE PREVIEW */}
          <DoorPreview palette={palette} roomName={roomName} />

          {/* ROOM NAME */}
          <div className="cdm-field">
            <label className="cdm-label">Room name</label>
            <input
              className="cdm-input"
              type="text"
              placeholder="the velvet room, the fog room…"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* ALIAS */}
          <div className="cdm-field">
            <label className="cdm-label">Your alias in this room</label>
            <input
              className="cdm-input"
              type="text"
              placeholder="the late-night cartographer…"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* QUOTE */}
          <div className="cdm-field">
            <label className="cdm-label">
              A quote for the door{" "}
              <span
                style={{
                  opacity: 0.45,
                  fontFamily: '"Cormorant Garamond", serif',
                  fontStyle: "italic",
                  textTransform: "none",
                  letterSpacing: 0,
                }}
              >
                (optional)
              </span>
            </label>
            <textarea
              className="cdm-textarea"
              placeholder="a line that lives above your bed…"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
            />
          </div>

          <div className="cdm-divider" />

          {/* BOOKS */}
          <TagInput
            label="Books for your shelf"
            placeholder="add a title…"
            tags={books}
            onAdd={(v) => setBooks((b) => [...b, v])}
            onRemove={(i) => setBooks((b) => b.filter((_, idx) => idx !== i))}
          />

          {/* MUSIC */}
          <TagInput
            label="Records for your player"
            placeholder="add an album or song…"
            tags={music}
            onAdd={(v) => setMusic((m) => [...m, v])}
            onRemove={(i) => setMusic((m) => m.filter((_, idx) => idx !== i))}
          />

          <button className="cdm-create-btn" onClick={handleCreate}>
            ✦ &nbsp; Hang This Door &nbsp; ✦
          </button>
        </div>
      </div>
    </div>
  );
}
