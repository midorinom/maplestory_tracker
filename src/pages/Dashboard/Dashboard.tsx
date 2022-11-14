import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { userActions } from "../../store/user";
import { GetCharactersRes } from "../../types/types";
import HaveChars from "./components/HaveChars";
import NoChars from "./components/NoChars";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  // =========
  // Variables
  // =========
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.userData);

  // ==========
  // useEffects
  // ==========
  useEffect(() => {
    getCharacters();
  }, []);

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

      dispatch(
        userActions.setUserData({
          characters: response.characters,
        })
      );
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
    </div>
  );
};

export default Dashboard;
