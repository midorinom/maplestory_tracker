import React from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { dailiesActions } from "../../../store/dailies";
import { Character } from "../../../types/types";
import styles from "../Dailies.module.css";

interface CharCardProps {
  character: Character;
}

const CharCard: React.FC<CharCardProps> = (props) => {
  const dispatch = useAppDispatch();
  const featuredChar = useAppSelector((state) => state.dailies.featuredChar);

  function handleClick() {
    if (featuredChar.uuid !== props.character.uuid) {
      dispatch(dailiesActions.setFeaturedChar(props.character));
    }
  }

  // ======
  // Return
  // ======
  return (
    <div onClick={handleClick} className={styles.char_card}>
      <p>{props.character.ign}</p>
      <p>{props.character.class_name}</p>
      <p>{props.character.level}</p>
    </div>
  );
};

export default CharCard;
