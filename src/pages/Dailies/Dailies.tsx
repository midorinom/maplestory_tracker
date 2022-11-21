import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { dailiesActions } from "../../store/dailies";
import {
  GetCharactersRes,
  GetDailiesRes,
  GetUrsusTourRes,
  GetWeekliesRes,
  Dailies,
} from "../../types/types";
import styles from "./Dailies.module.css";
import CharCard from "./components/CharCard";
import defaultChar from "../../images/default_char.png";
import moment from "moment";
import { Button } from "@mui/material";
import DailiesCard from "./components/DailiesCard";
import WeekliesCard from "./components/WeekliesCard";
import UrsusTourCard from "./components/UrsusTourCard";

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
  const [dailiesCards, setDailiesCards] = useState<any>();
  const [weekliesCards, setWeekliesCards] = useState<any>();
  const [ursusTourCards, setUrsusTourCards] = useState<any>();
  const [dailiesPrevClicked, setDailiesPrevClicked] = useState<boolean>();
  const [weekliesPrevClicked, setWeekliesPrevClicked] = useState<boolean>();

  const [dailies, setDailies] = useState<Dailies>();
  const [weeklies, setWeeklies] = useState<Dailies>();
  const [ursusTour, setUrsusTour] = useState<Dailies>();

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
        moment.utc().startOf("isoWeek").day(1).add(1, "weeks").fromNow()
      );
    }

    // MSEA
    if (userData.role === "MSEA") {
      today = moment().toISOString();
      setDailyDate(moment().endOf("day").fromNow());
      setWeeklyDate(
        moment().startOf("isoWeek").day(1).add(1, "weeks").fromNow()
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

  // Set Dailies Cards
  useEffect(() => {
    if (dailies) {
      const cards = Object.keys(dailies).map((element: string) => {
        return (
          <DailiesCard
            dailies={dailies}
            name={element}
            handleDailiesChange={handleDailiesChange}
            key={Math.random()}
          />
        );
      });
      setDailiesCards(cards);
    } else {
      setDailiesCards(undefined);
    }
  }, [dailies]);

  // Set Weeklies Cards
  useEffect(() => {
    if (weeklies) {
      const cards = Object.keys(weeklies).map((element: string) => {
        return (
          <WeekliesCard
            weeklies={weeklies}
            name={element}
            handleWeekliesChange={handleWeekliesChange}
            key={Math.random()}
          />
        );
      });
      setWeekliesCards(cards);
    } else {
      setWeekliesCards(undefined);
    }
  }, [weeklies]);

  // Set UrsusTour Cards
  useEffect(() => {
    if (ursusTour) {
      const ursusTourArr: string[] = ["ursus"];
      if (userData.role === "GMS") {
        ursusTourArr.push("tour");
      }

      const cards = ursusTourArr.map((element: string) => {
        return (
          <UrsusTourCard
            ursusTour={ursusTour}
            name={element}
            handleUrsusTourChange={handleUrsusTourChange}
            key={Math.random()}
          />
        );
      });
      setUrsusTourCards(cards);
    } else {
      setUrsusTour(undefined);
    }
  }, [ursusTour]);

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
      // Fetch
      const res = await fetch("http://127.0.0.1:5000/dailies/get", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          character: featuredChar.uuid,
          date: todayDate,
        }),
      });
      const response: GetDailiesRes = await res.json();

      // Set Dailies
      if (response.dailies.dailies_list) {
        const dailiesArr = response.dailies.dailies_list.split("@");
        const dailiesObjArr = dailiesArr.map((element) => {
          return [
            element,
            response.dailies.dailies_done.split("@").includes(element),
          ];
        });
        setDailies(Object.fromEntries(dailiesObjArr));
      } else {
        setDailies(undefined);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const getWeeklies = async () => {
    try {
      // Fetch
      const res = await fetch("http://127.0.0.1:5000/weeklies/get", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          character: featuredChar.uuid,
          date: todayDate,
        }),
      });
      const response: GetWeekliesRes = await res.json();

      // Set Weeklies
      if (response.weeklies.weeklies_list) {
        const weekliesArr = response.weeklies.weeklies_list.split("@");
        const weekliesObjArr = weekliesArr.map((element) => {
          return [
            element,
            response.weeklies.weeklies_done.split("@").includes(element),
          ];
        });
        setWeeklies(Object.fromEntries(weekliesObjArr));
      } else {
        setWeeklies(undefined);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const getUrsusTour = async () => {
    try {
      // Fetch
      const res = await fetch("http://127.0.0.1:5000/ursus-tour/get", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: userData.username,
          date: todayDate,
        }),
      });
      const response: GetUrsusTourRes = await res.json();

      // Set UrsusTour
      setUrsusTour({
        ursus: Boolean(response.ursus_tour.ursus),
        tour: Boolean(response.ursus_tour.tour),
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  // ======
  // Return
  // ======
  return (
    <div className={styles.parent_ctn}>
      <div className={styles.left_ctn}>
        <div className={styles.dailies_ctn}>
          <p className={styles.dailies_title}>Dailies</p>
          <div className={styles.dailies_options}>
            {dailiesCards && dailiesCards}
            {ursusTourCards && ursusTourCards}
          </div>
          <div className={styles.dailies_btm}>
            <Button
              onClick={handleDailiesPrevBtn}
              style={{ width: "40%" }}
              variant="contained"
              color="info"
              size="medium"
            >
              {dailiesPrevClicked ? " View Today" : "View Prev"}
            </Button>
            <p>Reset {dailyDate}</p>
          </div>
        </div>
        <div className={styles.dailies_ctn}>
          <p className={styles.dailies_title}>Weeklies</p>
          <div className={styles.dailies_options}>
            {weekliesCards && weekliesCards}
          </div>
          <div className={styles.dailies_btm}>
            <Button
              onClick={handleWeekliesPrevBtn}
              style={{ width: "40%" }}
              variant="contained"
              color="info"
              size="medium"
            >
              {weekliesPrevClicked ? " This Week" : "View Prev"}
            </Button>
            <p>Reset {weeklyDate}</p>
          </div>
        </div>
      </div>
      <div className={styles.right_ctn}>
        <div className={styles.featured_ctn}>
          <div className={styles.featured_image_ctn}>
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
        <div className={styles.char_cards_ctn}>{charCards}</div>
      </div>
    </div>
  );
};

export default DailiesWeeklies;
