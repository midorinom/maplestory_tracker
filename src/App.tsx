import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { userActions } from "./store/user";
import { Route, Routes } from "react-router-dom";
import NavBar from "./pages/NavBar/NavBar";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddCharacters from "./pages/AddCharacters/AddCharacters";
import Dailies from "./pages/Dailies/Dailies";
import Bossing from "./pages/Bossing/Bossing";
import LogOutBtn from "./pages/LogOutBtn/LogOutBtn";
import { UserData } from "./types/types";

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
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const retrievedUser: UserData = JSON.parse(savedUser);

      dispatch(userActions.setUserData(retrievedUser));
      userData = retrievedUser;
      triggerRender ? setTriggerRender(false) : setTriggerRender(true);
    }
  }, []);

  // When userData changes
  useEffect(() => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }, [userData]);

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
          <Route path="/dailies-weeklies" element={<Dailies />} />
          <Route path="/bossing" element={<Bossing />} />
          <Route path="/progression" element={<Bossing />} />
          <Route path="/legion" element={<Bossing />} />
          <Route path="/farming" element={<Bossing />} />
          <Route path="/events" element={<Bossing />} />
        </Routes>
        {userData.username && <LogOutBtn />}
      </ThemeProvider>
    </>
  );
}

export default App;
