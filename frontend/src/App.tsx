import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import CanvasPage from "./pages/CanvasPage";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const server = "http://localhost:3000";

export const socket = io(server);

function App() {
  const [user, setUser] = useState<any>(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home socket={socket} setUser={setUser} user={user} />,
        },
        {
          path: "/room/:id",
          element: <CanvasPage socket={socket} user={user} />,
        },
      ],
    },
  ]);

  useEffect(() => {
    socket.on("userJoined", (data: any) => {
      if (data.success) {
        console.log("Joined the room");
      } else {
        console.log("Failed to join the room");
      }
    });
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
