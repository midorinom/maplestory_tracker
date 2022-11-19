import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { dailiesActions } from "../../store/dailies";
import {
  Dailies,
  GetCharactersRes,
  GetDailiesRes,
  GetUrsusTourRes,
  GetWeekliesRes,
  UrsusTour,
  Weeklies,
} from "../../types/types";
import styles from "./Dailies.module.css";
import CharCard from "./components/CharCard";
import defaultChar from "../../images/default_char.png";
import moment from "moment";
import { Button } from "@material-ui/core";
import DailiesCard from "./components/DailiesCard";
import WeekliesCard from "./components/WeekliesCard";

const DailiesWeeklies = () => {
  // =========
  // Variables
  // =========
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.userData);
  const characters = useAppSelector((state) => state.dailies.characters);
  const featuredChar = useAppSelector((state) => state.dailies.featuredChar);
  const charImg = useAppSelector((state) => state.dailies.charImg);
  const charCards = characters.map((element) => {
    return <CharCard character={element} key={Math.random()} />;
  });
  const [todayDate, setTodayDate] = useState<string>();
  const [dailyDate, setDailyDate] = useState<string>();
  const [weeklyDate, setWeeklyDate] = useState<string>();
  const [dailies, setDailies] = useState<Dailies>();
  const [dailiesCards, setDailiesCards] = useState<any>();
  const [weeklies, setWeeklies] = useState<Weeklies>();
  const [weekliesCards, setWeekliesCards] = useState<any>();
  const [ursusTour, setUrsusTour] = useState<UrsusTour>();
  const [dailiesPrevClicked, setDailiesPrevClicked] = useState<boolean>();
  const [weekliesPrevClicked, setWeekliesPrevClicked] = useState<boolean>();

  // =====
  // Dates
  // =====
  function getDates() {
    let today: string = "";

    // GMS;
    if (userData.role === "GMS") {
      today = moment.utc().toISOString();
      setDailyDate(moment.utc().endOf("day").fromNow());
      setWeeklyDate(
        moment.utc().startOf("isoWeek").day(4).add(1, "weeks").fromNow()
      );
    }

    // MSEA
    if (userData.role === "MSEA") {
      today = moment().toISOString();
      setDailyDate(moment().endOf("day").fromNow());
      setWeeklyDate(
        moment().startOf("isoWeek").day(4).add(1, "weeks").fromNow()
      );
    }

    setTodayDate(today.slice(0, 10));
  }
  // ==============
  // Event Handlers
  // ==============
  function handleDailiesPrevBtn() {
    if (dailiesPrevClicked) {
      setDailiesPrevClicked(false);
    } else {
      setDailiesPrevClicked(true);
    }
  }

  function handleWeekliesPrevBtn() {
    if (weekliesPrevClicked) {
      setWeekliesPrevClicked(false);
    } else {
      setWeekliesPrevClicked(true);
    }
  }

  function handleDailiesChange() {}

  function handleWeekliesChange() {}

  function handleUrsusTourChange() {}

  // ==========
  // useEffects
  // ==========
  // onMount and onDismount
  useEffect(() => {
    getCharactersTracking();
    getDates();

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
      getDailies();
      getWeeklies();
      getUrsusTour();
    }
  }, [featuredChar]);

  // After Dailies has been set
  useEffect(() => {
    if (dailies) {
      const cards = dailies.dailies_list.split("@").map((element: string) => {
        return (
          <DailiesCard
            dailies={dailies}
            name={element}
            handleDailiesChange={handleDailiesChange}
            handleUrsusTourChange={handleUrsusTourChange}
          />
        );
      });
      setDailiesCards(cards);
    }
  }, [dailies]);

  // After Weeklies has been set
  useEffect(() => {
    if (weeklies) {
      const cards = weeklies.weeklies_list.split("@").map((element: string) => {
        return (
          <WeekliesCard
            weeklies={weeklies}
            name={element}
            handleWeekliesChange={handleWeekliesChange}
          />
        );
      });
      setWeekliesCards(cards);
    }
  }, [weeklies]);

  // ===============
  // Fetch Functions
  // ===============
  const getCharactersTracking = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/characters/get/tracking", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: userData.username,
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

  const getDailies = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/dailies/get", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          character: featuredChar.uuid,
          date: todayDate,
        }),
      });
      const response: GetDailiesRes = await res.json();
      setDailies(response.dailies);
      console.log("dailies", response.dailies);
    } catch (err: any) {
      console.log(err);
    }
  };

  const getWeeklies = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/weeklies/get", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          character: featuredChar.uuid,
          date: todayDate,
        }),
      });
      const response: GetWeekliesRes = await res.json();
      setWeeklies(response.weeklies);
      console.log("weeklies", response.weeklies);
    } catch (err: any) {
      console.log(err);
    }
  };

  const getUrsusTour = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/ursus-tour/get", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: userData.username,
          date: todayDate,
        }),
      });
      const response: GetUrsusTourRes = await res.json();
      setUrsusTour(response.ursus_tour);
      console.log("ursus tour", response.ursus_tour);
    } catch (err: any) {
      console.log(err);
    }
  };

  // ======
  // Return
  // ======
  return (
    <div className={styles.parent_ctn}>
      <div className={styles.dailies_ctn}>
        <b>Dailies</b>
        <div className={styles.dailies_options}>{dailiesCards}</div>
        <Button
          onClick={handleDailiesPrevBtn}
          style={{ width: "30%" }}
          variant="contained"
        >
          {dailiesPrevClicked ? " Show Today" : "Show Prev"}
        </Button>
        <p>Daily Reset {dailyDate}</p>
      </div>
      <div className={styles.weeklies_ctn}>
        <b>Weeklies</b>
        <div className={styles.weeklies_options}>{weekliesCards}</div>
        <Button
          onClick={handleWeekliesPrevBtn}
          style={{ width: "30%" }}
          variant="contained"
        >
          {weekliesPrevClicked ? " Show Today" : "Show Prev"}
        </Button>
        <p>Weekly Boss Reset {weeklyDate}</p>
      </div>
      <div className={styles.right_ctn}>
        <div className={styles.featured_ctn}>
          <img className={styles.image} src={charImg} alt="character img" />
          <div className={styles.ign_class}>
            {featuredChar.uuid && (
              <div className={styles.ign}>{featuredChar.ign}</div>
            )}
            {featuredChar.uuid && (
              <p
                className={styles.level_class}
              >{`Lv ${featuredChar.level} ${featuredChar.class_name}`}</p>
            )}
          </div>
        </div>
        <div className={styles.char_cards_ctn}>{charCards}</div>
      </div>
    </div>
  );
};

export default DailiesWeeklies;
