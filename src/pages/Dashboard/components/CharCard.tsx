import React from "react";
import { Character } from "../../../types/types";
import styles from "../Dashboard.module.css";

interface CharCardProps {
  character: Character;
}

const CharCard: React.FC<CharCardProps> = (props) => {
  return (
    <div className={styles.char_card}>
      <p>{props.character.ign}</p>
      <p>{props.character.class_name}</p>
      <p>{props.character.level}</p>
    </div>
  );
};

export default CharCard;
