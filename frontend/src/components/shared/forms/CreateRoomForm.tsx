"use client";

import { z } from "zod";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

// use this to validate the form inputs
const formSchema = z.object({
  roomID: z.string(),
  username: z.string(),
});

export function CreateRoomForm() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  function onSubmit(e: any) {
    e.preventDefault();

    console.log({
      roomId,
      username,
    });

    setUsername("");
    setRoomId("");
  }

  const linkGenerateHandler = () => {
    // const randomRoomLink =
  };

  const linkCopyHandler = () => {};

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
