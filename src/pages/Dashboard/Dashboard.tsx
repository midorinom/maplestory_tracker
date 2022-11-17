import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { userActions } from "../../store/user";
import { dashboardActions } from "../../store/dashboard";
import { isEditingActions } from "../../store/isEditing";
import { Character, GetCharactersRes } from "../../types/types";
import styles from "./Dashboard.module.css";
import NoChars from "./NoChars";
import FeaturedChar from "./components/FeaturedChar";
import CharsList from "./components/CharsList";
import Charts from "./components/Charts";
import EditFeaturedChar from "./components/EditFeaturedChar";

const Dashboard = () => {
  // =========
  // Variables
  // =========
  const dispatch = useAppDispatch();
  const [firstRenderDone, setFirstRenderDone] = useState<boolean>(false);
  const userData = useAppSelector((state) => state.user.userData);
  const featuredChar = useAppSelector((state) => state.dashboard.featuredChar);
  const isEditing = useAppSelector((state) => state.dashboard.isEditing);

  // ==========
  // useEffects
  // ==========
  // onMount and onDismount
  useEffect(() => {
    getCharacters();

    return () => {
      dispatch(dashboardActions.setIsEditing(false));

      dispatch(
        dashboardActions.setFeaturedChar({
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

  // Re-fetch whenever FeaturedChar changes
  useEffect(() => {
    if (firstRenderDone) {
      reGetCharacters();
    }
  }, [featuredChar]);

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
        // Set characters
        dispatch(
          userActions.setUserData({
            characters: response.characters,
          })
        );

        // Set featuredCharacters
        if (response.characters.length > 0) {
          let featuredCharacter: Character;

          featuredCharacter = response.characters[0];
          dispatch(dashboardActions.setFeaturedChar(featuredCharacter));
        }
      }
      if (!firstRenderDone) {
        setFirstRenderDone(true);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const reGetCharacters = async () => {
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
          })
        );
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
          {isEditing ? <EditFeaturedChar /> : <FeaturedChar />}
          <CharsList />
          <Charts />
        </div>
      )}
    </>
  );
};

export default Dashboard;
