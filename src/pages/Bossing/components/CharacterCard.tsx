import React, { useState, useEffect } from "react";
import { Character } from "../../../types/types";
import defaultChar from "../../../images/default_char.png";
import styles from "../Bossing.module.css";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = (props) => {
  // =========
  // Variables
  // =========
  const url = process.env.REACT_APP_API_ENDPOINT;
  const [charImg, setCharImg] = useState<any>();

  // ==========
  // useEffects
  // ==========
  // onMount
  useEffect(() => {
    getImage();
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
    <div className={styles.character_ctn}>
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
  );
};

export default CharacterCard;
