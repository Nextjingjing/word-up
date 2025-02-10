import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// import pages
import Home from "./pages/home";
import About from "./pages/about";
import { Play } from "./pages/play";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import UploadChallenge from "./pages/UploadChallenge";

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
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: <UploadChallenge />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <NavCustom />
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
