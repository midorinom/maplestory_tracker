import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { bossingActions } from "../../../store/bossing";
import moment from "moment";
import styles from "../Bossing.module.css";
import { GetCharactersRes } from "../../../types/types";

const BossingTop = () => {
  // =========
  // Variables
  // =========
  const url = process.env.REACT_APP_API_ENDPOINT;
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state: any) => state.user.userData);
  const [weeklyDate, setWeeklyDate] = useState<string>();
  const [characters, setCharacters] = useState<any>();

  // =========
  // Functions
  // =========
  function getDate() {
    if (userData.role === "GMS") {
      setWeeklyDate(moment.utc().day(11).fromNow());
    }
    if (userData.role === "MSEA") {
      setWeeklyDate(moment().day(11).fromNow());
    }
  }

  // =========
  // useEffect
  // =========
  useEffect(() => {
    getCharactersTracking();
    getDate();
  }, [userData]);

  // ===============
  // Fetch Functions
  // ===============
  const getCharactersTracking = async () => {
    try {
      const res = await fetch(`${url}/characters/get/tracking`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: userData.username,
          tracking: "bossing",
        }),
      });
      const response: GetCharactersRes = await res.json();

      if (res.ok) {
        // Set Characters and Featured Char
        dispatch(bossingActions.setCharacters(response.characters));
        setCharacters(response.characters);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  // ======
  // Return
  // ======
  return (
    <div className={styles.top_ctn}>
      <div className={styles.top_left_ctn}>Reset {weeklyDate}</div>
      <div className={styles.top_right_ctn}>{JSON.stringify(characters)}</div>
    </div>
  );
};

export default BossingTop;
