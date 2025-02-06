import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// import pages
import Home from "./pages/home";
import Home2 from "./pages/home2";

// import components
import { NavCustom } from "./components/NavCustom";

// ROUTER HERE!
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home2",
    element: <Home2 />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NavCustom />
    <RouterProvider router={router} />
  </StrictMode>
);
