import { createTheme, ThemeProvider } from "@mui/material";
import { useAppSelector } from "./store/hooks";
import { Route, Routes } from "react-router-dom";
import NavBar from "./pages/NavBar/NavBar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";

function App() {
  // Material UI colours
  const theme = createTheme({
    palette: {
      primary: {
        main: "#def4c6",
        contrastText: "#1b512d",
      },
      secondary: {
        main: "#b1cf5f",
        contrastText: "#1b512d",
      },
      info: {
        main: "#9ac4f8",
        contrastText: "#1b512d",
      },
      // error, warrning, success
    },
  });

  const userData = useAppSelector((state) => state.user.userData);

  return (
    <>
      <ThemeProvider theme={theme}>
        {userData.username && <NavBar />}
        <Routes>
          <Route
            path="/"
            element={userData.username ? <Dashboard /> : <Login />}
          />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
