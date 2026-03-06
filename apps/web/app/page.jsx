"use client";
import { HotelProvider, useHotel } from "@/context/HotelContext";
import Flash from "@/components/hotel/Flash";
import ReceptionScreen from "@/components/hotel/ReceptionScreen";
import HallwayScreen from "@/components/hotel/HallwayScreen";
import RoomScreen from "@/components/hotel/RoomScreen";

// ═══════════════════════════════════════════
// HOTEL PAGE — Root orchestrator
// Manages screen state, flash transitions
// ═══════════════════════════════════════════
//
// Place at: apps/web/app/hotel/page.jsx
//
// Required global CSS (add to globals.css or layout):
//   @import '../../styles/hotel.css';
//
// Required fonts in layout.tsx <head>:
//   <link href="https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Special+Elite&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
//
// BACKEND HOOKS:
//   window.OCaptain is available via HotelContext for backend integration.
//   See context/HotelContext.jsx for the full OCaptain bridge API.
//   Key methods:
//     OCaptain.openItem(id, type)          — called when user clicks a collection item
//     OCaptain.setTrack(title, artist)     — update now-playing display
//     OCaptain.setProgress(percent)        — update seek bar (0-100)
//     OCaptain.addToCollection(type, items) — add items programmatically
//     OCaptain.getGuestState()             — read current guest state
// ═══════════════════════════════════════════

function HotelScreens() {
  const { screen, isFlashing } = useHotel();

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", background: "#0c0806" }}>
      {/* Grain overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0.32,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Flash transition */}
      <Flash active={isFlashing} />

      {/* Screens */}
      {screen === "reception" && <ReceptionScreen />}
      <HallwayScreen active={screen === "hallway"} />
      <RoomScreen active={screen === "room"} />
    </div>
  );
}

export default function HotelPage() {
  return (
    <HotelProvider>
      <HotelScreens />
    </HotelProvider>
  );
}
