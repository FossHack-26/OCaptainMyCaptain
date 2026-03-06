"use client";
import { useState } from "react";
import { useHotel } from "@/context/HotelContext";
import { ROOM_PREVIEWS } from "@/lib/hotelData";
import DoorUnit from "@/components/hotel/DoorUnit";
import CreateDoorModal from "@/components/hotel/CreateDoorModal";

export default function HallwayScreen({ active }) {
  const { guest, allRooms, customRooms, enterRoom, createCustomRoom } = useHotel();
  const [modalOpen, setModalOpen] = useState(false);

  const presetDoors = ROOM_PREVIEWS.map((room) => ({
    ...allRooms[room.id],
    id: room.id,
    doorColor: room.doorColor,
    crackLight: room.crackLight,
    wall: room.wall,
    floor: room.floor,
    winlight: room.winlight,
    glow: room.glow,
    pc: room.pc,
    label: room.label,
    sub: room.sub,
    books1: room.books1,
    books2: room.books2,
  }));

  const customDoors = Object.entries(customRooms).map(([id, room]) => ({
    ...room,
    id,
    doorColor: room.palette?.door,
    crackLight: room.palette?.crack,
    books1: room.s1?.slice(0, 4).map((b) => ({ c: b.c, h: b.h })) || [],
    books2: room.s2?.slice(0, 3).map((b) => ({ c: b.c, h: b.h })) || [],
  }));

  return (
    <>
      <div className={`screen${active ? " active" : ""}`} id="s-hallway">
        <div className="hall-header">
          <p className="hall-hotel-name">✦ &nbsp; O Captain &nbsp; ✦</p>
          <p className="hall-welcome">
            Good evening, <span id="guestNameDisplay">{guest.guestName || "wanderer"}</span>
          </p>
        </div>

        <div className="doors-row">
          {presetDoors.map((room) => (
            <DoorUnit
              key={room.id}
              room={room}
              roomId={room.id}
              isBooked={guest.bookedRoom === room.id}
              onClick={() => enterRoom(room.id)}
            />
          ))}
          {customDoors.map((room) => (
            <DoorUnit
              key={room.id}
              room={room}
              roomId={room.id}
              isBooked={guest.bookedRoom === room.id}
              onClick={() => enterRoom(room.id)}
            />
          ))}
          <DoorUnit roomId="__add__" onClick={() => setModalOpen(true)} />
        </div>
      </div>

      <CreateDoorModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={(roomData) => createCustomRoom(roomData)}
      />
    </>
  );
}
