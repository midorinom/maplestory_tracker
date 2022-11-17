import React from "react";
import { Link } from "react-router-dom";
import styles from "../Dashboard.module.css";
import { Button } from "@mui/material";
import { useAppSelector } from "../../../store/hooks";
import CharCard from "./CharCard";

const CharsList = () => {
  const userData = useAppSelector((state) => state.user.userData);
  let characters = userData.characters;

  const charCards = characters.map((element) => {
    return <CharCard character={element} key={Math.random()} />;
  });

  return (
    <div className={styles.chars_list_ctn}>
      <Button
        component={Link}
        to={"/add-characters"}
        className={styles.chars_list_add_btn}
        size="large"
        variant="contained"
        color="info"
      >
        Add Characters
      </Button>
      <div className={styles.char_cards_ctn}>
        {userData.characters.length > 0 && charCards}
      </div>
    </div>
  );
};

export default CharsList;
