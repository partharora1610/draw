import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import CanvasPage from "./pages/CanvasPage";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/room",
        element: <CanvasPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
