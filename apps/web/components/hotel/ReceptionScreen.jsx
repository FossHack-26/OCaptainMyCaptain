"use client";
import { useState, useEffect, useRef } from "react";
import { useHotel } from "../../context/HotelContext";
import { QUOTES, ROOM_PREVIEWS } from "../../lib/hotelData";
import styles from "../../styles/hotel.css"; // CSS module or global import

// ═══════════════════════════════════════════
// RECEPTION SCREEN — Screen 1
// Hotel check-in desk with explore/book tabs
// ═══════════════════════════════════════════

function Bell() {
  const [dinging, setDinging] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const ring = () => {
    setDinging(false);
    requestAnimationFrame(() => {
      setDinging(true);
      setToastVisible(true);
      setTimeout(() => {
        setDinging(false);
        setToastVisible(false);
      }, 1800);
    });
  };

  return (
    <div className="desk-bell" onClick={ring} title="Ring for attention">
      <div className={`ding-toast${toastVisible ? " show" : ""}`}>✦ &nbsp; welcome &nbsp; ✦</div>
      <div className={`bell-dome${dinging ? " ding" : ""}`} />
      <div className="bell-base" />
      <div className="bell-handle" />
    </div>
  );
}

function RoomPickCard({ room, selected, onPick }) {
  return (
    <div
      className={`room-pick${selected ? " selected" : ""}`}
      style={{ "--rc": room.accent }}
      onClick={onPick}
    >
      <div className="rp-swatch" />
      <div className="rp-name">{room.label.replace("the ", "The ")}</div>
      <div className="rp-sub">{room.sub}</div>
    </div>
  );
}

function CollectionAdder({ label, hint, tags, onAdd, onRemove, inputId }) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue("");
  };

  return (
    <div className="collection-adder">
      <label>
        {label}&nbsp;
        <span
          style={{
            opacity: 0.4,
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: "italic",
            textTransform: "none",
            letterSpacing: 0,
          }}
        >
          ({hint})
        </span>
      </label>
      <div className="add-item-row" style={{ marginTop: 8 }}>
        <input
          type="text"
          id={inputId}
          placeholder="add a title…"
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
        <button className="btn-add-tag" onClick={handleAdd}>
          + Add
        </button>
      </div>
      <div className="collection-list">
        {tags.map((t, i) => (
          <div className="coll-tag" key={i}>
            {t}
            <button onClick={() => onRemove(i)}>×</button>
          </div>
        ))}

        <div className="desk-footer">
          <p className="footer-label">guests checked in tonight</p>
          <div className="guest-dots">
            <div className="guest-dot on" />
            <div className="guest-dot on" />
            <div className="guest-dot on" />
            <div className="guest-dot" />
            <div className="guest-dot" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReceptionScreen() {
  const { enterHotel } = useHotel();
  const [tab, setTab] = useState("explore"); // 'explore' | 'book'
  const [quote, setQuote] = useState(QUOTES[0]);
  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Explore tab
  const [exploreName, setExploreName] = useState("");

  // Book tab
  const [bookName, setBookName] = useState("");
  const [bookRoom, setBookRoom] = useState("");
  const [bookAlias, setBookAlias] = useState("");
  const [bookQuote, setBookQuote] = useState("");
  const [books, setBooks] = useState([]);
  const [music, setMusic] = useState([]);

  const handleEnter = (mode) => {
    const guestName =
      mode === "explore" ? exploreName.trim() || "wanderer" : bookName.trim() || "wanderer";

    enterHotel({
      guestName,
      alias: mode === "book" ? bookAlias.trim() : "",
      quote: mode === "book" ? bookQuote.trim() : "",
      bookedRoom: mode === "book" ? bookRoom || null : selectedRoom,
      mode,
      books,
      music,
    });
  };

  return (
    <div className="screen active" id="s-reception">
      <p className="ambient-left">
        ✦ &nbsp; a room of one&apos;s own &nbsp; ✦ &nbsp; a room of one&apos;s own
      </p>
      <p className="ambient-right">
        ✦ &nbsp; every door a universe &nbsp; ✦ &nbsp; every door a universe
      </p>

      <div className="reception-desk">
        <Bell />

        <div className="desk-header">
          <p className="hotel-eyebrow">est. mmxxv &nbsp;✦&nbsp; the literary quarter</p>
          <h1 className="hotel-name">O Captain</h1>
          <p className="hotel-tagline">a hotel for those who read, listen &amp; dwell</p>
        </div>

        <div className="desk-body">
          {/* TABS */}
          <div className="checkin-tabs">
            <button
              className={`tab-btn${tab === "explore" ? " active" : ""}`}
              onClick={() => setTab("explore")}
            >
              Just Exploring
            </button>
            <button
              className={`tab-btn${tab === "book" ? " active" : ""}`}
              onClick={() => setTab("book")}
            >
              Book a Room
            </button>
          </div>

          {/* ── EXPLORE TAB ── */}
          <div className={`form-section${tab === "explore" ? " visible" : ""}`}>
            <div className="qotn">
              <p>{quote}</p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>What shall we call you tonight?</label>
                <input
                  type="text"
                  placeholder="a name, a pseudonym, anything…"
                  value={exploreName}
                  onChange={(e) => setExploreName(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="form-divider" />

            <p
              style={{
                fontFamily: '"IM Fell English", serif',
                fontStyle: "italic",
                fontSize: "0.82rem",
                color: "rgba(253,248,240,0.3)",
                marginBottom: 20,
                lineHeight: 1.7,
              }}
            >
              Choose a room to wander into. No reservation needed — just bring curiosity.
            </p>

            <div className="room-picks">
              {ROOM_PREVIEWS.map((room) => (
                <RoomPickCard
                  key={room.id}
                  room={room}
                  selected={selectedRoom === room.id}
                  onPick={() => setSelectedRoom(room.id)}
                />
              ))}
            </div>

            <button className="btn-checkin" onClick={() => handleEnter("explore")}>
              ✦ &nbsp; Enter the Hallway &nbsp; ✦
            </button>
          </div>

          {/* ── BOOK TAB ── */}
          <div className={`form-section${tab === "book" ? " visible" : ""}`}>
            <div className="form-row">
              <div className="form-group">
                <label>Your name</label>
                <input
                  type="text"
                  placeholder="how you'd like to be known"
                  value={bookName}
                  onChange={(e) => setBookName(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label>Room preference</label>
                <select value={bookRoom} onChange={(e) => setBookRoom(e.target.value)}>
                  <option value="">— let the hotel decide —</option>
                  <option value="amber">The Amber Room</option>
                  <option value="blue">The Blue Room</option>
                  <option value="green">The Green Room</option>
                </select>
              </div>
            </div>

            <div className="form-row single">
              <div className="form-group">
                <label>Your alias in this place</label>
                <input
                  type="text"
                  placeholder="the midnight reader, the sleepless archivist…"
                  value={bookAlias}
                  onChange={(e) => setBookAlias(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="form-divider" />

            <CollectionAdder
              label="Your bookshelf"
              hint="what should live on your shelf?"
              tags={books}
              onAdd={(v) => setBooks((b) => [...b, v])}
              onRemove={(i) => setBooks((b) => b.filter((_, idx) => idx !== i))}
              inputId="bookInput"
            />

            <CollectionAdder
              label="Your record crate"
              hint="albums, songs, artists"
              tags={music}
              onAdd={(v) => setMusic((m) => [...m, v])}
              onRemove={(i) => setMusic((m) => m.filter((_, idx) => idx !== i))}
              inputId="musicInput"
            />

            <div className="form-row single" style={{ marginTop: 8 }}>
              <div className="form-group">
                <label>
                  Your quote for tonight{" "}
                  <span
                    style={{
                      opacity: 0.4,
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
                  placeholder="a line that follows you…"
                  value={bookQuote}
                  onChange={(e) => setBookQuote(e.target.value)}
                  style={{ minHeight: 72 }}
                />
              </div>
            </div>

            <button className="btn-checkin" onClick={() => handleEnter("book")}>
              ✦ &nbsp; Check In &nbsp; ✦
            </button>
          </div>
        </div>

        <div className="desk-footer">
          <p className="footer-label">guests checked in tonight</p>
          <div className="guest-dots">
            <div className="guest-dot on" />
            <div className="guest-dot on" />
            <div className="guest-dot on" />
            <div className="guest-dot" />
            <div className="guest-dot" />
          </div>
        </div>
      </div>
    </div>
  );
}
