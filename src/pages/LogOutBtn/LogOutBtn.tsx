import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { Button } from "@mui/material";
import { userActions } from "../../store/user";

const LogOutBtn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    dispatch(
      userActions.setUserData({
        username: "",
        role: "",
        characters: [],
      })
    );
    navigate("/");
  }

  return (
    <Button
      style={{
        fontSize: "2.5vh",
        position: "absolute",
        bottom: "0",
        left: "0.5rem",
      }}
      onClick={logout}
      variant="text"
    >
      Log Out
    </Button>
  );
};

export default LogOutBtn;
