import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { NavCustom } from "./components/NavCustom";

const AdminProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  return user.isAdmin ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <div>
      <NavCustom />
      <Outlet />
    </div>
  );
};

export { AdminProtectedRoute };
export default App;
