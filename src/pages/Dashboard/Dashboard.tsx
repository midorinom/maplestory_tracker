import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { userActions } from "../../store/user";
import { Character, GetCharactersRes } from "../../types/types";
import HaveChars from "./components/HaveChars";
import NoChars from "./components/NoChars";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  // =========
  // Variables
  // =========
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.userData);
  const [char, setChar] = useState<Character>();
  const [charImg, setCharImg] = useState<any>();

  // ==========
  // useEffects
  // ==========
  useEffect(() => {
    getCharacters();
  }, []);

  useEffect(() => {
    if (char) {
      getImage();
    }
  }, [char]);

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
        dispatch(
          userActions.setUserData({
            characters: response.characters,
            main: response.main,
          })
        );
        setChar(response.characters[0]);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const getImage = async () => {
    try {
      if (char) {
        const res = await fetch(
          `http://127.0.0.1:5000/characters/get-image/${char.uuid}`,
          {
            method: "POST",
          }
        );
        const response: any = await res.blob();
        const image = URL.createObjectURL(response);

        setCharImg(image);
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
      {userData.characters.length > 0 ? <HaveChars /> : <NoChars />}
      {charImg && <img src={charImg} alt="img" />}
    </div>
  );
};

export default Dashboard;
