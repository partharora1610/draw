"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateRoomID } from "@/lib/generateRoomId";

export function CreateRoomForm({ socket, setUser, user }: any) {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      roomId,
      name: username,
      host: true,
      userId: "123", // fake ID
      presenter: true,
    };

    setUser(data);
    socket.emit("join-room", data);

    navigate(`/room/${roomId}`);

    setUsername("");
    setRoomId("");
  };

  const linkGenerateHandler = (e: any) => {
    e.preventDefault();
    const randomRoomLink = generateRoomID();
    setRoomId(randomRoomLink);
  };

  const linkCopyHandler = async (e: any) => {
    e.preventDefault();
    if (!roomId) {
      return;
    }
    await navigator.clipboard.writeText(roomId);
  };

  return (
    <div>
      <form className="mt-6" action="submit" onSubmit={(e) => onSubmit(e)}>
        <div className="flex flex-col mb-4">
          <Label>Room Name</Label>
          <div className="flex gap-4">
            <Input
              disabled
              onChange={(e) => {
                setRoomId(e.target.value);
              }}
              value={roomId}
              id="roomId"
              placeholder="Enter room name"
              type="text"
            />

            <div className="flex gap-2">
              <Button variant="secondary" onClick={linkGenerateHandler}>
                Generate
              </Button>

              <Button variant="link" onClick={linkCopyHandler}>
                Copy
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <Label>User Name</Label>
          <Input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            id="username"
            placeholder="Enter your name"
            type="text"
          />
        </div>
        <Button className="w-full" type="submit">
          Join Room
        </Button>
      </form>
    </div>
  );
}
