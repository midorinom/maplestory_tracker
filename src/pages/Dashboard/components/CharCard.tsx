import React from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { featuredCharActions } from "../../../store/featuredChar";
import { isEditingActions } from "../../../store/isEditing";
import { Character } from "../../../types/types";
import styles from "../Dashboard.module.css";

interface CharCardProps {
  character: Character;
}

const CharCard: React.FC<CharCardProps> = (props) => {
  const dispatch = useAppDispatch();
  const featuredChar = useAppSelector(
    (state) => state.featuredChar.featuredChar
  );
  const isEditing = useAppSelector((state) => state.isEditing.isEditing);

  function handleClick() {
    if (featuredChar.uuid !== props.character.uuid) {
      dispatch(featuredCharActions.setFeaturedChar(props.character));
      if (isEditing) {
        dispatch(isEditingActions.setIsEditing(false));
      }
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
