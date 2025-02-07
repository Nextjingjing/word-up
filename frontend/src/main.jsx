import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// import pages
import Home from "./pages/home";
import About from "./pages/about";
import { Play } from "./pages/play";

// import components
import { NavCustom } from "./components/NavCustom";

// ROUTER HERE!
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/play/:challengeId",
    element: <Play />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NavCustom />
    <RouterProvider router={router} />
  </StrictMode>
);
