import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";

function Login() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(
      loginUser({
        email: "test@gmail.com",
        password: "123456",
      })
    );
  };

  return (
    <div>
      <h1>Login</h1>

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;