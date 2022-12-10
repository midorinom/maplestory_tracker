import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { bossingActions } from "../../store/bossing";
import moment from "moment";
import styles from "./Bossing.module.css";
import { Character, GetCharactersRes } from "../../types/types";

const BossingTop = () => {
  // =========
  // Variables
  // =========
  const url = process.env.REACT_APP_API_ENDPOINT;
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state: any) => state.user.userData);
  const [weeklyDate, setWeeklyDate] = useState<string>();
  const [characters, setCharacters] = useState<Character[]>();
  const [page, setPage] = useState<number>(0);

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

  // ==============
  // Event Handlers
  // ==============
  function prevPage() {
    setPage((prevState) => prevState - 1);
  }

  function nextPage() {
    setPage((prevState) => prevState + 1);
  }

  // =========
  // useEffect
  // =========
  useEffect(() => {
    getCharactersTracking();
    getDate();
  }, [userData]);

  useEffect(() => {
    if (page > 0 && characters) {
      dispatch(
        bossingActions.setCharactersCurrentPage(
          characters.slice(page * 5 - 5, page * 5)
        )
      );
    }
  }, [page]);

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
        // Set Characters and Page
        setCharacters(response.characters);
        setPage(1);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const charsCurrentPg = useAppSelector(
    (state) => state.bossing.charactersCurrentPage
  );

  // ======
  // Return
  // ======
  return (
    <div className={styles.top_ctn}>
      <div className={styles.top_left_ctn}>Reset {weeklyDate}</div>
      <div className={styles.top_right_ctn}>
        {page > 1 && <button onClick={prevPage}>Prev</button>}
        <div>{JSON.stringify(charsCurrentPg)}</div>
        {characters && characters.length / 5 > page && (
          <button onClick={nextPage}>Next</button>
        )}
      </div>
    </div>
  );
};

export default BossingTop;
