import React from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { dashboardActions } from "../../../store/dashboard";
import { isEditingActions } from "../../../store/isEditing";
import { Character } from "../../../types/types";
import styles from "../Dashboard.module.css";

interface CharCardProps {
  character: Character;
}

const CharCard: React.FC<CharCardProps> = (props) => {
  const dispatch = useAppDispatch();
  const featuredChar = useAppSelector((state) => state.dashboard.featuredChar);
  const isEditing = useAppSelector((state) => state.dashboard.isEditing);

  function handleClick() {
    if (featuredChar.uuid !== props.character.uuid) {
      dispatch(dashboardActions.setFeaturedChar(props.character));
      if (isEditing) {
        dispatch(dashboardActions.setIsEditing(false));
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
