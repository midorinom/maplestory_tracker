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
      // success, warning, error
    },
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "#def4c6",
            color: "#1b512d",
            fontSize: "1rem",
          },
        },
      },
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
          <Route path="/characters" />
          <Route path="/dailies-weeklies" />
          <Route path="/bossing" />
          <Route path="/progression" />
          <Route path="/legion" />
          <Route path="/farming" />
          <Route path="/events" />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
