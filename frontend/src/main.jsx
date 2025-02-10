import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from "./pages/home";
import About from "./pages/about";
import { Play } from "./pages/play";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UploadChallenge from "./pages/admin/UploadChallenge";
import EditChallenge from "./pages/admin/EditChallenge";
import DeleteChallenge from "./pages/admin/DeleteChallenge";
import AddVocab from "./pages/admin/AddVocab";

import App, { AdminProtectedRoute } from "./app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/play/:challengeId", element: <Play /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/admin",
        element: <AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>,
      },
      {
        path: "/admin/upload",
        element: <AdminProtectedRoute><UploadChallenge /></AdminProtectedRoute>,
      },
      {
        path: "/admin/edit/:id",
        element: <AdminProtectedRoute><EditChallenge /></AdminProtectedRoute>,
      },
      {
        path: "/admin/delete/:id",
        element: <AdminProtectedRoute><DeleteChallenge /></AdminProtectedRoute>,
      },
      {
        path: "/admin/add-vocab/:id",
        element: <AdminProtectedRoute><AddVocab /></AdminProtectedRoute>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
