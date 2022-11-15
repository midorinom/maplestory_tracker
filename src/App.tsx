import { createTheme, ThemeProvider } from "@mui/material";
import { useAppSelector } from "./store/hooks";
import { Route, Routes } from "react-router-dom";
import NavBar from "./pages/NavBar/NavBar";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import NoChars from "./pages/Dashboard/NoChars";
import AddCharacters from "./pages/AddCharacters/AddCharacters";

function App() {
  // ==============================
  // Configuring Material UI styles
  // ==============================
  const theme = createTheme({
    palette: {
      primary: {
        main: "#fbc3bc",
        contrastText: "#9ac4f8",
      },
      secondary: {
        main: "#b1cf5f",
        contrastText: "#1b512d",
      },
      info: {
        main: "#def4c6",
        contrastText: "#1b512d",
      },
      // additional button types: success, warning, error
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
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });

  // =========
  // Variables
  // =========
  const userData = useAppSelector((state) => state.user.userData);

  function getIndex() {
    if (userData.role) {
      if (userData.characters) {
        return <Dashboard />;
      } else {
        return <NoChars />;
      }
    } else {
      return <Login />;
    }
  }
  const index = getIndex();

  // ======
  // Return
  // ======
  return (
    <>
      <ThemeProvider theme={theme}>
        {userData.username && <NavBar />}
        <Routes>
          <Route path="/" element={index} />
          <Route path="/add-characters" element={<AddCharacters />} />
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
