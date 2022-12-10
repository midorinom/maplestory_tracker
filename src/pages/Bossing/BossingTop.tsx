import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { bossingActions } from "../../store/bossing";
import { Character, GetCharactersRes } from "../../types/types";
import CharacterCard from "./components/CharacterCard";
import moment from "moment";
import styles from "./Bossing.module.css";
import { IconButton } from "@mui/material";
import LeftArrowIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import RightArrowIcon from "@mui/icons-material/ArrowForwardIosOutlined";

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
  const [showPageArrows, setShowPageArrows] = useState<boolean>(false);
  const charactersCurrentPage = useAppSelector(
    (state) => state.bossing.charactersCurrentPage
  );
  const [characterCards, setCharacterCards] = useState<any>();

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
          characters.slice(page * 4 - 4, page * 4)
        )
      );
    }
  }, [page]);

  useEffect(() => {
    if (charactersCurrentPage.length > 0) {
      setCharacterCards(
        charactersCurrentPage.map((element) => {
          return <CharacterCard character={element} />;
        })
      );
    }
  }, [charactersCurrentPage]);

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

  // ======
  // Return
  // ======
  return (
    <div className={styles.top_ctn}>
      <div className={styles.top_left_ctn}>Reset {weeklyDate}</div>
      <div
        onMouseEnter={() => setShowPageArrows(true)}
        onMouseLeave={() => setShowPageArrows(false)}
        className={styles.top_right_ctn}
      >
        {showPageArrows && page > 1 && (
          <IconButton
            style={{
              position: "absolute",
              top: "40%",
              left: "0%",
              zIndex: "1",
              backgroundColor: "#def4c6",
            }}
            onClick={prevPage}
            size="small"
          >
            <LeftArrowIcon fontSize="large" />
          </IconButton>
        )}
        {characterCards && characterCards}
        {showPageArrows && characters && characters.length / 4 > page && (
          <IconButton
            style={{
              position: "absolute",
              top: "40%",
              right: "0%",
              zIndex: "1",
              backgroundColor: "#def4c6",
            }}
            onClick={nextPage}
            size="small"
          >
            <RightArrowIcon fontSize="large" />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default BossingTop;
