import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import { SocketProvider } from "./context/socketContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <SocketProvider url="http://localhost:3000"> */}
    <App />
    {/* </SocketProvider> */}
  </React.StrictMode>
);

// http://localhost:3000
