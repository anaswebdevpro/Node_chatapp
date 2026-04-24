import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <h2>App Layout (Navbar later)</h2>
      <Outlet />
    </div>
  );
}

export default MainLayout;