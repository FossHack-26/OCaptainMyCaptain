"use client";
// ═══════════════════════════════════════════
// FLASH — Screen transition overlay
// ═══════════════════════════════════════════

export default function Flash({ active }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0c0806",
        zIndex: 5000,
        pointerEvents: "none",
        opacity: active ? 1 : 0,
        transition: "opacity 0.28s ease",
      }}
    />
  );
}
