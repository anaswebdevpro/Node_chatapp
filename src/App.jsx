import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { getCurrentUser, setAuthChecked } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const { isAuthChecked } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only verify on initial app load
    const token = localStorage.getItem("token");
    console.log("[App] Auth status check. Has Token?", !!token);

    if (token) {
      dispatch(getCurrentUser());
    } else {
      dispatch(setAuthChecked());
    }
  }, [dispatch]);

  // 🔥 BLOCK UI until auth check completes
  if (!isAuthChecked) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-xl font-medium animate-pulse">
          Loading your workspace...
        </p>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
