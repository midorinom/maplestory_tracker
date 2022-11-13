import { useAppSelector } from "./store/hooks";
import { Route, Routes } from "react-router-dom";
import NavBar from "./pages/NavBar/NavBar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";

function App() {
  const userData = useAppSelector((state) => state.user.userData);

  return (
    <>
      {userData.username && <NavBar />}
      <Routes>
        <Route
          path="/"
          element={userData.username ? <Dashboard /> : <Login />}
        />
      </Routes>
    </>
  );
}

export default App;
