import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { userActions } from "../../store/user";
import { dashboardActions } from "../../store/dashboard";
import { Character, GetCharactersRes } from "../../types/types";
import styles from "./Dashboard.module.css";
import NoChars from "./NoChars";
import FeaturedChar from "./components/FeaturedChar";
import CharsList from "./components/CharsList";
import Charts from "./components/Charts";

const Dashboard = () => {
  // =========
  // Variables
  // =========
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.userData);
  const [characters, setCharacters] = useState<Character[]>();
  const [charImg, setCharImg] = useState<any>();

  // ==========
  // useEffects
  // ==========
  useEffect(() => {
    getCharacters();
  }, []);

  useEffect(() => {
    if (characters) {
      getImage();
    }
  }, [characters]);

  // ===============
  // Fetch Functions
  // ===============
  const getCharacters = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/characters/get/all", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: userData.username,
        }),
      });
      const response: GetCharactersRes = await res.json();

      if (res.ok) {
        // Set userData.characters
        dispatch(
          userActions.setUserData({
            characters: response.characters,
            main: response.main,
          })
        );
        setCharacters(response.characters);

        // Set dashboard.featuredCharacters
        if (response.characters.length > 0) {
          let featuredChar: Character;

          if (response.main) {
            // If the player has set a main character
            featuredChar = response.main;
          } else {
            // Take the highest level character
            featuredChar = response.characters[0];
          }

          dispatch(
            dashboardActions.setDashboard({
              featuredChar: featuredChar,
            })
          );
        }
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const getImage = async () => {
    try {
      if (characters && characters.length > 0) {
        const res = await fetch(
          `http://127.0.0.1:5000/characters/get-image/${characters[0].uuid}`,
          {
            method: "GET",
          }
        );
        const response: any = await res.blob();
        const image = URL.createObjectURL(response);

        // Check if image is empty
        if (response.size > 0) {
          setCharImg(image);
        }
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  // ======
  // Return
  // ======
  return (
    <>
      {userData.characters.length === 0 ? (
        <NoChars />
      ) : (
        <div className={styles.parent_ctn}>
          <FeaturedChar />
          <CharsList />
          <Charts />
        </div>
      )}
    </>
  );
};

export default Dashboard;
