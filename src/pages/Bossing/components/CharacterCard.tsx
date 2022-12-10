import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../store/hooks";
import { Character, GetBossingRes } from "../../../types/types";
import moment from "moment";
import defaultChar from "../../../images/default_char.png";
import EditCharacter from "./EditCharacter";
import styles from "../Bossing.module.css";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface CharacterCardProps {
  character: Character;
  todayDate: string;
}

const CharacterCard: React.FC<CharacterCardProps> = (props) => {
  // =========
  // Variables
  // =========
  const url = process.env.REACT_APP_API_ENDPOINT;
  const [charImg, setCharImg] = useState<any>();
  const [showEditIcon, setShowEditIcon] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const userData = useAppSelector((state) => state.user.userData);

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
    getBossing();

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

  const getBossing = async () => {
    try {
      const res = await fetch(`${url}/bossing/get`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          character: props.character.uuid,
          date: props.todayDate,
          role: userData.role,
          level: props.character.level,
        }),
      });
      const response: GetBossingRes = await res.json();

      if (res.ok) {
        console.log("got bossing");
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
