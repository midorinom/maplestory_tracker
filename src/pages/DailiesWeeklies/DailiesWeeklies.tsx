import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { dailiesActions } from "../../store/dailies";
import { GetCharactersRes } from "../../types/types";
import styles from "./DailiesWeeklies.module.css";
import CharCard from "../Dashboard/components/CharCard";
import defaultChar from "../../images/default_char.png";

const DailiesWeeklies = () => {
  // =========
  // Variables
  // =========
  const dispatch = useAppDispatch();
  const characters = useAppSelector((state) => state.dailies.characters);
  const featuredChar = useAppSelector((state) => state.dailies.featuredChar);
  const charImg = useAppSelector((state) => state.dailies.charImg);
  const charCards = characters.map((element) => {
    return <CharCard character={element} key={Math.random()} />;
  });

  // ==========
  // useEffects
  // ==========
  // onMount and onDismount
  useEffect(() => {
    getCharactersTracking();

    return () => {
      dispatch(dailiesActions.setCharacters([]));
      dispatch(dailiesActions.setCharImg(""));
      dispatch(
        dailiesActions.setFeaturedChar({
          uuid: "",
          username: "",
          class_name: "",
          ign: "",
          level: 0,
          is_main: false,
          tracking: "",
        })
      );
    };
  }, []);

  // After featuredChar has been set
  useEffect(() => {
    if (featuredChar.uuid) {
      getImage();
    }
  }, [featuredChar]);

  // ===============
  // Fetch Functions
  // ===============
  const getCharactersTracking = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/characters/get/tracking", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          tracking: "dailies",
        }),
      });
      const response: GetCharactersRes = await res.json();

      if (res.ok) {
        // Set Characters and Featured Char
        dispatch(dailiesActions.setCharacters(response.characters));
        dispatch(dailiesActions.setFeaturedChar(response.characters[0]));
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const getImage = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/characters/get-image/${featuredChar.uuid}`,
        {
          method: "GET",
        }
      );
      const response: any = await res.blob();
      const image = URL.createObjectURL(response);

      // Check if image is empty
      if (response.size > 0) {
        dispatch(dailiesActions.setCharImg(image));
      } else {
        dispatch(dailiesActions.setCharImg(defaultChar));
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  // ======
  // Return
  // ======
  return (
    <div className={styles.parent_ctn}>
      <div>Dailies</div>
      <div>Weeklies</div>
      <div>
        <div className={styles.right_ctn}>
          <img
            className={styles.featured_image}
            src={charImg}
            alt="character img"
          />
        </div>
        <div className={styles.featured_ign_class}>
          {featuredChar.uuid && (
            <div className={styles.featured_ign}>{featuredChar.ign}</div>
          )}
          {featuredChar.uuid && (
            <p
              className={styles.featured_level_class}
            >{`Lv ${featuredChar.level} ${featuredChar.class_name}`}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailiesWeeklies;
