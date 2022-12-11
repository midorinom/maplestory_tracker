import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { bossingActions } from "../../store/bossing";
import {
  Bossing,
  Character,
  GetBossingRes,
  GetCharactersRes,
} from "../../types/types";
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
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(0);
  const [showPageArrows, setShowPageArrows] = useState<boolean>(false);
  const charactersCurrentPage = useAppSelector(
    (state) => state.bossing.charactersCurrentPage
  );
  const [characterCards, setCharacterCards] = useState<any>();
  const [todayDate, setTodayDate] = useState<string>("");
  const [allBossing, setAllBossing] = useState<Bossing[]>([]);
  const [getBossingDone, setGetBossingDone] = useState<boolean>(false);

  // =========
  // Functions
  // =========
  function getDate() {
    let today: string = "";

    if (userData.role === "GMS") {
      today = moment.utc().toISOString();
    }
    if (userData.role === "MSEA") {
      today = moment().toISOString();
    }

    setTodayDate(today.slice(0, 10));
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

    return () => {
      dispatch(bossingActions.setCharactersCurrentPage([]));
      dispatch(bossingActions.setBossingCurrentPage([]));
    };
  }, [userData]);

  useEffect(() => {
    if (characters.length > 0) {
      setPage(1);
    }
  }, [characters]);

  useEffect(() => {
    if (page > 0 && characters.length > 0) {
      dispatch(
        bossingActions.setCharactersCurrentPage(
          characters.slice(page * 4 - 4, page * 4)
        )
      );
    }
  }, [page]);

  useEffect(() => {
    if (charactersCurrentPage.length > 0) {
      // Set Character Cards
      setCharacterCards(
        charactersCurrentPage.map((element) => {
          return (
            <CharacterCard
              character={element}
              todayDate={todayDate}
              key={Math.random()}
            />
          );
        })
      );
    }

    // Get Bossing
    for (const character of charactersCurrentPage) {
      getBossing(character);
    }

    return () => {
      dispatch(bossingActions.setBossingCurrentPage([]));
      setAllBossing([]);
    };
  }, [charactersCurrentPage]);

  useEffect(() => {
    if (getBossingDone) {
      dispatch(bossingActions.setBossingCurrentPage(allBossing));
      setGetBossingDone(false);
    }
  }, [getBossingDone]);

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
        setCharacters(response.characters);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const getBossing = async (character: Character) => {
    try {
      const res = await fetch(`${url}/bossing/get`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          character: character.uuid,
          date: todayDate,
          role: userData.role,
          level: character.level,
        }),
      });
      const response: GetBossingRes = await res.json();

      if (res.ok) {
        setAllBossing((prevState) => {
          return [...prevState, response.bossing];
        });

        // Finished fetching for all characters
        if (
          charactersCurrentPage[charactersCurrentPage.length - 1].uuid ===
          character.uuid
        ) {
          setGetBossingDone(true);
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
    <div
      className={styles.top_ctn}
      onMouseEnter={() => setShowPageArrows(true)}
      onMouseLeave={() => setShowPageArrows(false)}
    >
      {characterCards && characterCards}
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
  );
};

export default BossingTop;
