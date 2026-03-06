"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { ROOMS, DOOR_PALETTES } from "@/lib/hotelData";

// ═══════════════════════════════════════════
// O CAPTAIN — HOTEL CONTEXT
// Manages all guest state and navigation
// ═══════════════════════════════════════════

const HotelContext = createContext(null);

export function HotelProvider({ children }) {
  // ── SCREEN ──────────────────────────────
  const [screen, setScreen] = useState("reception"); // 'reception' | 'hallway' | 'room'
  const [isFlashing, setIsFlashing] = useState(false);
  const [activeRoomId, setActiveRoomId] = useState(null);

  // ── GUEST STATE ──────────────────────────
  const [guest, setGuest] = useState({
    guestName: "",
    alias: "",
    quote: "",
    bookedRoom: null,
    mode: "explore", // 'explore' | 'book'
    books: [],
    music: [],
  });

  // ── CUSTOM ROOMS ─────────────────────────
  const [customRooms, setCustomRooms] = useState({});

  // All rooms combined
  const allRooms = { ...ROOMS, ...customRooms };

  // ── FLASH TRANSITION ─────────────────────
  const flash = useCallback((cb) => {
    setIsFlashing(true);
    setTimeout(() => {
      cb();
      setTimeout(() => setIsFlashing(false), 80);
    }, 280);
  }, []);

  // ── NAVIGATION ───────────────────────────
  const enterHotel = useCallback(
    (guestData) => {
      setGuest(guestData);
      flash(() => setScreen("hallway"));
    },
    [flash]
  );

  const enterRoom = useCallback(
    (roomId) => {
      flash(() => {
        setActiveRoomId(roomId);
        setScreen("room");
      });
    },
    [flash]
  );

  const exitRoom = useCallback(() => {
    flash(() => setScreen("hallway"));
  }, [flash]);

  // ── CUSTOM ROOM CREATION ─────────────────
  const createCustomRoom = useCallback((roomData) => {
    const roomId = "custom_" + Date.now();
    const p = roomData.palette;

    const generateShelfBooks = () =>
      Array.from({ length: 7 }, () => {
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
        ];
        return {
          c: palette[Math.floor(Math.random() * palette.length)],
          h: 48 + Math.floor(Math.random() * 30),
          t: roomData.books[Math.floor(Math.random() * Math.max(roomData.books.length, 1))] || "—",
        };
      });

    const newRoom = {
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
      alias: roomData.alias || roomData.name,
      quote: roomData.quote ? `"${roomData.quote}"` : '"a room of one\'s own."',
      track: "—",
      artist: "",
      s1: generateShelfBooks(),
      s2: generateShelfBooks(),
      palette: p,
      name: roomData.name || "the unnamed room",
      books: roomData.books,
      music: roomData.music,
    };

    setCustomRooms((prev) => ({ ...prev, [roomId]: newRoom }));
    return roomId;
  }, []);

  // ── OCaptain bridge (for backend integration) ──
  const OCaptain = {
    openItem: (id, type) => console.log("[OCaptain] openItem:", id, type),
    setTrack: () => {},
    setProgress: () => {},
    getGuestState: () => ({ ...guest }),
    addToCollection: (type, items) => {
      setGuest((prev) => ({
        ...prev,
        books: type === "book" ? [...prev.books, ...items] : prev.books,
        music: type === "music" ? [...prev.music, ...items] : prev.music,
      }));
    },
  };

  const value = {
    screen,
    isFlashing,
    activeRoomId,
    guest,
    allRooms,
    customRooms,
    DOOR_PALETTES,
    enterHotel,
    enterRoom,
    exitRoom,
    createCustomRoom,
    OCaptain,
  };

  return <HotelContext.Provider value={value}>{children}</HotelContext.Provider>;
}

export const useHotel = () => {
  const ctx = useContext(HotelContext);
  if (!ctx) throw new Error("useHotel must be used within HotelProvider");
  return ctx;
};
