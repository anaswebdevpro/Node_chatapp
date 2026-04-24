import { useSelector } from "react-redux";

function Home() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Home</h1>
      {isAuthenticated ? (
        <p>Welcome {user.name}</p>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}

export default Home;