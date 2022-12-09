import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { userActions } from "./store/user";
import { UserData } from "./types/types";
import NavBar from "./pages/NavBar/NavBar";
import LogOutBtn from "./pages/LogOutBtn/LogOutBtn";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddCharacters from "./pages/AddCharacters/AddCharacters";
import Dailies from "./pages/Dailies/Dailies";
import Bossing from "./pages/Bossing/Bossing";
import UnderConstruction from "./pages/UnderConstruction/UnderConstruction";

function App() {
  // ==============================
  // Configuring Material UI styles
  // ==============================
  const theme = createTheme({
    palette: {
      primary: {
        main: "#fbc3bc",
        contrastText: "#def4c6",
      },
      secondary: {
        main: "#b1c000",
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
  const dispatch = useAppDispatch();
  const [triggerRender, setTriggerRender] = useState<boolean>(false);
  let userData: UserData = useAppSelector((state) => state.user.userData);
  const savedUser = localStorage.getItem("user");

  function getIndex() {
    if (userData && userData.username) {
      return <Dashboard />;
    } else {
      return <Login />;
    }
  }
  const index = getIndex();

  // ==========
  // useEffects
  // ==========
  // onMount
  useEffect(() => {
    if (savedUser) {
      const retrievedUser: UserData = JSON.parse(savedUser);

      dispatch(userActions.setUserData(retrievedUser));
      userData = retrievedUser;
      triggerRender ? setTriggerRender(false) : setTriggerRender(true);
    }
  }, []);

  // When userData changes
  useEffect(() => {
    if (userData.username) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }, [userData]);

  // ======
  // Return
  // ======
  return (
    <>
      <ThemeProvider theme={theme}>
        {savedUser && <NavBar />}
        <Routes>
          <Route path="/" element={index} />
          <Route
            path="/add-characters"
            element={savedUser ? <AddCharacters /> : <Navigate to="/" />}
          />
          <Route
            path="/dailies-weeklies"
            element={savedUser ? <Dailies /> : <Navigate to="/" />}
          />
          <Route
            path="/bossing"
            element={savedUser ? <UnderConstruction /> : <Navigate to="/" />}
          />
          <Route
            path="/progression"
            element={savedUser ? <UnderConstruction /> : <Navigate to="/" />}
          />
          <Route
            path="/legion"
            element={savedUser ? <UnderConstruction /> : <Navigate to="/" />}
          />
          <Route
            path="/farming"
            element={savedUser ? <UnderConstruction /> : <Navigate to="/" />}
          />
          <Route
            path="/events"
            element={savedUser ? <UnderConstruction /> : <Navigate to="/" />}
          />
        </Routes>
        {savedUser && <LogOutBtn />}
      </ThemeProvider>
    </>
  );
}

export default App;
