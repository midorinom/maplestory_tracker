import React, { useState, useEffect } from "react";
import { Character } from "../../../types/types";
import defaultChar from "../../../images/default_char.png";
import EditCharacter from "./EditCharacter";
import styles from "../Bossing.module.css";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = (props) => {
  // =========
  // Variables
  // =========
  const url = process.env.REACT_APP_API_ENDPOINT;
  const [charImg, setCharImg] = useState<any>();
  const [showEditIcon, setShowEditIcon] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // ==============
  // Event Handlers
  // ==============
  function handleEdit() {
    setIsEditing(true);
  }

  // ==========
  // useEffects
  // ==========
  useEffect(() => {
    getImage();

    if (isEditing) {
      setIsEditing(false);
    }
  }, [props.character.uuid]);

  // ===============
  // Fetch Functions
  // ===============
  const getImage = async () => {
    try {
      const res = await fetch(
        `${url}/characters/get-image/${props.character.uuid}`,
        {
          method: "GET",
        }
      );
      const response: any = await res.blob();
      const image = URL.createObjectURL(response);

      // Check if image is empty
      if (response.size > 0) {
        setCharImg(image);
      } else {
        setCharImg(defaultChar);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  // ======
  // Return
  //=======
  return (
    <>
      {!isEditing && (
        <div
          onMouseEnter={() => setShowEditIcon(true)}
          onMouseLeave={() => setShowEditIcon(false)}
          className={styles.character_ctn}
        >
          {showEditIcon && (
            <IconButton
              style={{ position: "absolute", top: "1%", right: "2%" }}
              onClick={handleEdit}
              size="small"
            >
              <EditIcon fontSize="large" />
            </IconButton>
          )}
          <div className={styles.character_image_ctn}>
            <img
              className={styles.character_image}
              src={charImg}
              alt="character img"
            />
          </div>
          <div className={styles.character_ign_class}>
            <div className={styles.character_ign}>{props.character.ign}</div>
            <p className={styles.character_level_class}>
              {props.character.class_name}
            </p>
            <p
              className={styles.character_level_class}
            >{`Lv ${props.character.level}`}</p>
          </div>
        </div>
      )}
      {isEditing && <EditCharacter setIsEditing={setIsEditing} />}
    </>
  );
};

export default CharacterCard;
