import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { dailiesActions } from "../../store/dailies";
import {
  GetCharactersRes,
  GetDailiesRes,
  GetUrsusTourRes,
  GetWeekliesRes,
  Dailies,
  DefaultRes,
  UpdateDailies,
  UpdateUrsusTour,
} from "../../types/types";
import moment from "moment";
import CharCard from "./components/CharCard";
import DailiesCard from "./components/DailiesCard";
import WeekliesCard from "./components/WeekliesCard";
import UrsusTourCard from "./components/UrsusTourCard";
import EditDailiesCard from "./components/EditDailiesCard";
import EditWeekliesCard from "./components/EditWeekliesCard";
import styles from "./Dailies.module.css";
import { Alert, Button, IconButton, Checkbox } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import defaultChar from "../../images/default_char.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const DailiesWeeklies = () => {
  // =========
  // Variables
  // =========
  const url = process.env.REACT_APP_API_ENDPOINT;
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state: any) => state.user.userData);
  const characters = useAppSelector((state: any) => state.dailies.characters);
  const featuredChar = useAppSelector(
    (state: any) => state.dailies.featuredChar
  );
  const charImg = useAppSelector((state: any) => state.dailies.charImg);
  const editedDailies = useAppSelector(
    (state: any) => state.dailies.editedDailies
  );
  const editedWeeklies = useAppSelector(
    (state: any) => state.dailies.editedWeeklies
  );
  const charCards = characters.map((element: any) => {
    return <CharCard character={element} key={Math.random()} />;
  });
  const [todayDate, setTodayDate] = useState<string>();
  const [dailyDate, setDailyDate] = useState<string>();
  const [weeklyDate, setWeeklyDate] = useState<string>();
  const [dailies, setDailies] = useState<any>();
  const [weeklies, setWeeklies] = useState<any>();
  const [ursusTour, setUrsusTour] = useState<any>();
  const [dailiesCards, setDailiesCards] = useState<any>();
  const [weekliesCards, setWeekliesCards] = useState<any>();
  const [ursusTourCards, setUrsusTourCards] = useState<any>();
  const [dailiesPrevClicked, setDailiesPrevClicked] = useState<boolean>(false);
  const [weekliesPrevClicked, setWeekliesPrevClicked] =
    useState<boolean>(false);
  const [checkboxClicked, setCheckboxClicked] = useState<boolean>(false);
  const [showEditDailiesIcon, setShowEditDailiesIcon] =
    useState<boolean>(false);
  const [showEditWeekliesIcon, setShowEditWeekliesIcon] =
    useState<boolean>(false);
  const [isEditingDailies, setIsEditingDailies] = useState<boolean>(false);
  const [isEditingWeeklies, setIsEditingWeeklies] = useState<boolean>(false);
  const [editDailiesCards, setEditDailiesCards] = useState<any>();
  const [editWeekliesCards, setEditWeekliesCards] = useState<any>();
  const [editDailiesError, setEditDailiesError] = useState<boolean>(false);
  const [editWeekliesError, setEditWeekliesError] = useState<boolean>(false);
  const [dailiesSuccess, setDailiesSuccess] = useState<boolean>(false);
  const [weekliesSuccess, setWeekliesSuccess] = useState<boolean>(false);
  const [mapEditDailiesCards, setMapEditDailiesCards] =
    useState<boolean>(false);
  const [mapEditWeekliesCards, setMapEditWeekliesCards] =
    useState<boolean>(false);
  const [allDailiesChecked, setAllDailiesChecked] = useState<boolean>(false);
  const [allDailiesPrevChecked, setAllDailiesPrevChecked] =
    useState<boolean>(false);
  const [allWeekliesChecked, setAllWeekliesChecked] = useState<boolean>(false);
  const [allWeekliesPrevChecked, setAllWeekliesPrevChecked] =
    useState<boolean>(false);

  // =====
  // Dates
  // =====
  function getDates() {
    let today: string = "";

    // GMS;
    if (userData.role === "GMS") {
      today = moment.utc().toISOString();
      setDailyDate(moment.utc().endOf("day").fromNow());
      setWeeklyDate(moment.utc().day(8).fromNow());
    }

    // MSEA
    if (userData.role === "MSEA") {
      today = moment().toISOString();
      setDailyDate(moment().endOf("day").fromNow());
      setWeeklyDate(moment().day(8).fromNow());
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

  function handleDailiesChange(e: any) {
    setCheckboxClicked(true);

    if (dailies && dailies[e.target.id] === true) {
      setDailies((prevState: Dailies) => {
        return { ...prevState, [e.target.id]: false };
      });
    } else {
      setDailies((prevState: Dailies) => {
        return { ...prevState, [e.target.id]: true };
      });
    }
  }

  function handleWeekliesChange(e: any) {
    setCheckboxClicked(true);

    if (weeklies && weeklies[e.target.id] === true) {
      setWeeklies((prevState: Dailies) => {
        return { ...prevState, [e.target.id]: false };
      });
    } else {
      setWeeklies((prevState: Dailies) => {
        return { ...prevState, [e.target.id]: true };
      });
    }
  }

  function handleUrsusTourChange(e: any) {
    setCheckboxClicked(true);

    if (ursusTour && ursusTour[e.target.id] === true) {
      setUrsusTour((prevState: Dailies) => {
        return { ...prevState, [e.target.id]: false };
      });
    } else {
      setUrsusTour((prevState: Dailies) => {
        return { ...prevState, [e.target.id]: true };
      });
    }
  }

  function handleEditDailies() {
    if (!isEditingDailies) {
      const dailiesObj = { ...dailies };
      delete dailiesObj.uuid;
      const dailiesArr = Object.keys(dailiesObj);

      dispatch(dailiesActions.setEditedDailies(dailiesArr));
    }
  }

  function handleEditWeeklies() {
    if (!isEditingWeeklies) {
      const weekliesObj = { ...weeklies };
      delete weekliesObj.uuid;
      const weekliesArr = Object.keys(weekliesObj);

      dispatch(dailiesActions.setEditedWeeklies(weekliesArr));
    }
  }

  function handleDailiesBack() {
    if (isEditingDailies) {
      setIsEditingDailies(false);
    }
    if (dailiesSuccess) {
      setDailiesSuccess(false);
    }
  }

  function handleWeekliesBack() {
    if (isEditingWeeklies) {
      setIsEditingWeeklies(false);
    }
    if (weekliesSuccess) {
      setWeekliesSuccess(false);
    }
  }

  function handleAddDailies() {
    if (dailiesSuccess) {
      setDailiesSuccess(false);
    }

    setMapEditDailiesCards(true);
    dispatch(dailiesActions.setEditedDailies([...editedDailies, ""]));
  }

  function handleAddWeeklies() {
    if (weekliesSuccess) {
      setWeekliesSuccess(false);
    }

    setMapEditWeekliesCards(true);
    dispatch(dailiesActions.setEditedWeeklies([...editedWeeklies, ""]));
  }

  function handleSubmitDailies(e: any) {
    e.preventDefault();
    setDailiesSuccess(false);

    if (!editDailiesError) {
      const newDailies: UpdateDailies = {
        uuid: dailies.uuid,
        dailies_list: editedDailies.join("@"),
      };
      updateDailies(newDailies);
      setDailiesSuccess(true);
    }
  }

  function handleSubmitWeeklies(e: any) {
    e.preventDefault();
    setWeekliesSuccess(false);

    if (!editWeekliesError) {
      const newWeeklies: UpdateDailies = {
        uuid: weeklies.uuid,
        weeklies_list: editedWeeklies.join("@"),
      };
      updateWeeklies(newWeeklies);
      setWeekliesSuccess(true);
    }
  }

  function handleCheckAllDailies() {
    if (dailiesPrevClicked) {
      if (allDailiesPrevChecked) {
        checkAllDailies(false);
        setAllDailiesPrevChecked(false);
      } else {
        checkAllDailies(true);
        setAllDailiesPrevChecked(true);
      }
    } else {
      if (allDailiesChecked) {
        checkAllDailies(false);
        setAllDailiesChecked(false);
      } else {
        checkAllDailies(true);
        setAllDailiesChecked(true);
      }
    }
  }

  function checkAllDailies(bool: boolean) {
    const dailiesObj = { ...dailies };
    delete dailiesObj.uuid;

    for (const key of Object.keys(dailiesObj)) {
      dailiesObj[key] = bool;
    }

    setCheckboxClicked(true);
    setDailies((prevState: any) => {
      return { ...prevState, ...dailiesObj };
    });
    setCheckboxClicked(true);
    setUrsusTour((prevState: any) => {
      return { ...prevState, ursus: bool, tour: bool };
    });
  }

  function handleCheckAllWeeklies() {
    // console.log(weeklies);

    if (weekliesPrevClicked) {
      if (allWeekliesPrevChecked) {
        checkAllWeeklies(false);
        setAllWeekliesPrevChecked(false);
      } else {
        checkAllWeeklies(true);
        setAllWeekliesPrevChecked(true);
      }
    } else {
      if (allWeekliesChecked) {
        checkAllWeeklies(false);
        setAllWeekliesChecked(false);
      } else {
        checkAllWeeklies(true);
        setAllWeekliesChecked(true);
      }
    }
  }

  function checkAllWeeklies(bool: boolean) {
    const weekliesObj = { ...weeklies };
    delete weekliesObj.uuid;

    for (const key of Object.keys(weekliesObj)) {
      weekliesObj[key] = bool;
    }

    setCheckboxClicked(true);
    setWeeklies((prevState: any) => {
      return { ...prevState, ...weekliesObj };
    });
  }

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
      setIsEditingDailies(false);
      setIsEditingWeeklies(false);
      getImage();
      getDailies();
      getWeeklies();
    }
  }, [featuredChar]);

  // When Dailies changes
  useEffect(() => {
    // Set Dailies Cards
    if (dailies && Object.keys(dailies).length > 1) {
      // Delete the uuid key before mapping
      const dailiesObj = { ...dailies };
      delete dailiesObj.uuid;

      const cards = Object.keys(dailiesObj).map((element: string) => {
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

    // Update Dailies
    if (checkboxClicked) {
      setCheckboxClicked(false);

      const dailiesObj = { ...dailies };
      delete dailiesObj.uuid;

      const dailiesDoneArr: string[] = [];

      for (const item of Object.keys(dailiesObj)) {
        if (dailies[item] === true) {
          dailiesDoneArr.push(item);
        }
      }

      const newDailies: UpdateDailies = {
        uuid: dailies.uuid,
        dailies_list: Object.keys(dailiesObj).join("@"),
        dailies_done: dailiesDoneArr.join("@"),
      };

      updateDailies(newDailies);
    }
  }, [dailies]);

  // When Weeklies changes
  useEffect(() => {
    // Set Weeklies Cards
    if (weeklies && Object.keys(weeklies).length > 1) {
      // Delete the uuid key before mapping
      const weekliesObj = { ...weeklies };
      delete weekliesObj.uuid;

      const cards = Object.keys(weekliesObj).map((element: string) => {
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

    // Update Weeklies
    if (checkboxClicked) {
      setCheckboxClicked(false);

      const weekliesObj = { ...weeklies };
      delete weekliesObj.uuid;

      const weekliesDoneArr: string[] = [];

      for (const item of Object.keys(weekliesObj)) {
        if (weeklies[item] === true) {
          weekliesDoneArr.push(item);
        }
      }

      const newWeeklies: UpdateDailies = {
        uuid: weeklies.uuid,
        weeklies_list: Object.keys(weekliesObj).join("@"),
        weeklies_done: weekliesDoneArr.join("@"),
      };

      updateWeeklies(newWeeklies);
    }
  }, [weeklies]);

  // When UrsusTour changes
  useEffect(() => {
    // Set UrsusTour Cards
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

    // Update UrsusTour
    if (checkboxClicked) {
      setCheckboxClicked(false);

      let newUrsusTour: UpdateUrsusTour = {
        uuid: ursusTour.uuid,
        ursus: 0,
        tour: 0,
      };

      if (userData.role === "GMS") {
        if (ursusTour.ursus === true) {
          newUrsusTour.ursus = 100000000;
        }
        if (ursusTour.tour === true) {
          newUrsusTour.tour = 50000000;
        }
      } else {
        if (ursusTour.ursus === true) {
          newUrsusTour.ursus = 20000000;
        }
      }

      updateUrsusTour(newUrsusTour);
    }
  }, [ursusTour]);

  // Fetch DailiesPrev
  useEffect(() => {
    if (featuredChar.uuid) {
      getDailies(dailiesPrevClicked);
    }
  }, [dailiesPrevClicked]);

  // Fetch WeekliesPrev
  useEffect(() => {
    if (featuredChar.uuid) {
      getWeeklies(weekliesPrevClicked);
    }
  }, [weekliesPrevClicked]);

  // Set EditDailies Cards
  useEffect(() => {
    if (dailies) {
      if (!isEditingDailies || mapEditDailiesCards) {
        setMapEditDailiesCards(false);

        const cards = editedDailies.map((element: any, index: number) => {
          return (
            <EditDailiesCard
              editDailiesError={editDailiesError}
              setEditDailiesError={setEditDailiesError}
              dailiesSuccess={dailiesSuccess}
              setDailiesSuccess={setDailiesSuccess}
              setMapEditDailiesCards={setMapEditDailiesCards}
              name={element}
              index={index}
              key={Math.random()}
            />
          );
        });
        setEditDailiesCards(cards);

        if (!isEditingDailies) {
          setIsEditingDailies(true);
        }
      }
    }
  }, [editedDailies]);

  // Set EditWeeklies Cards
  useEffect(() => {
    if (weeklies) {
      if (!isEditingWeeklies || mapEditWeekliesCards) {
        setMapEditWeekliesCards(false);

        const cards = editedWeeklies.map((element: any, index: number) => {
          return (
            <EditWeekliesCard
              editWeekliesError={editWeekliesError}
              setEditWeekliesError={setEditWeekliesError}
              weekliesSuccess={weekliesSuccess}
              setWeekliesSuccess={setWeekliesSuccess}
              setMapEditWeekliesCards={setMapEditWeekliesCards}
              name={element}
              index={index}
              key={Math.random()}
            />
          );
        });
        setEditWeekliesCards(cards);

        if (!isEditingWeeklies) {
          setIsEditingWeeklies(true);
        }
      }
    }
  }, [editedWeeklies]);

  // Fetch Dailies after updating
  useEffect(() => {
    if (featuredChar.uuid && !isEditingDailies) {
      getDailies(dailiesPrevClicked);
    }
  }, [isEditingDailies]);

  // Fetch Weeklies after updating
  useEffect(() => {
    if (featuredChar.uuid && !isEditingWeeklies) {
      getWeeklies(weekliesPrevClicked);
    }
  }, [isEditingWeeklies]);

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
        `${url}/characters/get-image/${featuredChar.uuid}`,
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

  const getDailies = async (isPrev: boolean = false) => {
    try {
      // Fetch
      interface Body {
        character: string;
        date?: string;
      }

      let body: Body = { character: featuredChar.uuid };
      if (!isPrev) {
        body.date = todayDate;
      }

      const res = await fetch(`${url}/dailies/${isPrev ? "get-prev" : "get"}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const response: GetDailiesRes = await res.json();

      // Set Dailies
      if (!response.dailies) {
        setDailies(undefined);
        setUrsusTour(undefined);
      } else {
        if (response.dailies.dailies_list) {
          // Set Dailies
          const dailiesArr = response.dailies.dailies_list.split("@");
          const dailiesObjArr = dailiesArr.map((element) => {
            if (element !== "") {
              return [
                element,
                response.dailies.dailies_done.split("@").includes(element),
              ];
            } else {
              return [element, false];
            }
          });
          setDailies({
            uuid: response.dailies.uuid,
            ...Object.fromEntries(dailiesObjArr),
          });
        } else {
          setDailies({
            uuid: response.dailies.uuid,
          });
        }
        // Get UrsusTour
        let date: any;
        if (isPrev) {
          date = response.dailies.date;
        } else {
          date = todayDate;
        }
        getUrsusTour(date);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const getWeeklies = async (isPrev: boolean = false) => {
    try {
      // Fetch
      interface Body {
        character: string;
        date?: string;
      }

      let body: Body = { character: featuredChar.uuid };
      if (!isPrev) {
        body.date = todayDate;
      }

      const res = await fetch(
        `${url}/weeklies/${isPrev ? "get-prev" : "get"}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const response: GetWeekliesRes = await res.json();

      // Set Weeklies
      if (!response.weeklies) {
        setWeeklies(undefined);
      } else {
        if (response.weeklies.weeklies_list) {
          const weekliesArr = response.weeklies.weeklies_list.split("@");
          const weekliesObjArr = weekliesArr.map((element) => {
            if (element !== "") {
              return [
                element,
                response.weeklies.weeklies_done.split("@").includes(element),
              ];
            } else {
              return [element, false];
            }
          });
          setWeeklies({
            uuid: response.weeklies.uuid,
            ...Object.fromEntries(weekliesObjArr),
          });
        } else {
          setWeeklies({
            uuid: response.weeklies.uuid,
          });
        }
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const getUrsusTour = async (date: string) => {
    try {
      // Fetch
      const res = await fetch(`${url}/ursus-tour/get`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: userData.username,
          date: date,
        }),
      });
      const response: GetUrsusTourRes = await res.json();

      // Set UrsusTour
      setUrsusTour({
        uuid: response.ursus_tour.uuid,
        ursus: Boolean(response.ursus_tour.ursus),
        tour: Boolean(response.ursus_tour.tour),
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  const updateDailies = async (newDailies: UpdateDailies) => {
    try {
      const res = await fetch(`${url}/dailies/update`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newDailies),
      });
      const response: DefaultRes = await res.json();
    } catch (err: any) {
      console.log(err);
    }
  };

  const updateWeeklies = async (newWeeklies: UpdateDailies) => {
    try {
      const res = await fetch(`${url}/weeklies/update`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newWeeklies),
      });
      const response: DefaultRes = await res.json();
    } catch (err: any) {
      console.log(err);
    }
  };

  const updateUrsusTour = async (newUrsusTour: UpdateUrsusTour) => {
    try {
      const res = await fetch(`${url}/ursus-tour/update`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUrsusTour),
      });
      const response: DefaultRes = await res.json();
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
        <div
          onMouseEnter={() => setShowEditDailiesIcon(true)}
          onMouseLeave={() => setShowEditDailiesIcon(false)}
          className={styles.dailies_ctn}
        >
          {dailiesSuccess && (
            <Alert severity="success" className={styles.alert}>
              Dailies updated!
            </Alert>
          )}
          {isEditingDailies ? (
            <>
              <p
                className={styles.dailies_title}
                style={{ color: "transparent", borderBottom: "none" }}
              >
                Placeholder
              </p>
              <Button
                onClick={handleDailiesBack}
                size="medium"
                variant="outlined"
                color="secondary"
                startIcon={<ArrowBackIcon />}
                style={{ position: "absolute", left: "2%" }}
              >
                Back
              </Button>
            </>
          ) : (
            <>
              {showEditDailiesIcon && (
                <IconButton
                  style={{ position: "absolute", top: "1%", right: "2%" }}
                  onClick={handleEditDailies}
                  size="small"
                >
                  <EditIcon fontSize="large" />
                </IconButton>
              )}
              <div className={styles.dailies_title_ctn}>
                <div>
                  <p className={styles.dailies_title}>
                    {dailiesPrevClicked ? "Dailies (Prev)" : "Dailies"}
                  </p>
                </div>
                <Checkbox
                  style={{
                    padding: "0",
                    paddingTop: "0.1rem",
                  }}
                  onChange={handleCheckAllDailies}
                  checked={
                    dailiesPrevClicked
                      ? allDailiesPrevChecked
                      : allDailiesChecked
                  }
                />
              </div>
            </>
          )}
          <div className={styles.dailies_options}>
            {isEditingDailies ? (
              <>{editDailiesCards && editDailiesCards}</>
            ) : (
              <>
                {dailiesCards && dailiesCards}
                {ursusTourCards && ursusTourCards}
              </>
            )}
          </div>
          <div className={styles.dailies_btm}>
            {isEditingDailies ? (
              <>
                <Button
                  onClick={handleAddDailies}
                  variant="contained"
                  size="large"
                  color="secondary"
                >
                  +
                </Button>
                <Button
                  onClick={handleSubmitDailies}
                  variant="contained"
                  size="large"
                  color="info"
                >
                  Update
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleDailiesPrevBtn}
                  style={{ width: "40%" }}
                  variant="contained"
                  color="info"
                  size="medium"
                >
                  {dailiesPrevClicked ? " View Today" : "View Prev"}
                </Button>
                <p>Reset {dailyDate}</p>{" "}
              </>
            )}
          </div>
        </div>
        <div
          onMouseEnter={() => setShowEditWeekliesIcon(true)}
          onMouseLeave={() => setShowEditWeekliesIcon(false)}
          className={styles.dailies_ctn}
        >
          {weekliesSuccess && (
            <Alert severity="success" className={styles.alert}>
              Weeklies updated!
            </Alert>
          )}
          {isEditingWeeklies ? (
            <>
              <p
                className={styles.dailies_title}
                style={{ color: "transparent", borderBottom: "none" }}
              >
                Placeholder
              </p>
              <Button
                onClick={handleWeekliesBack}
                size="medium"
                variant="outlined"
                color="secondary"
                startIcon={<ArrowBackIcon />}
                style={{ position: "absolute", left: "2%" }}
              >
                Back
              </Button>
            </>
          ) : (
            <>
              {showEditWeekliesIcon && (
                <IconButton
                  style={{ position: "absolute", top: "1%", right: "2%" }}
                  onClick={handleEditWeeklies}
                  size="small"
                >
                  <EditIcon fontSize="large" />
                </IconButton>
              )}
              <div className={styles.dailies_title_ctn}>
                <div>
                  <p className={styles.dailies_title}>
                    {weekliesPrevClicked ? "Weeklies (Prev)" : "Weeklies"}
                  </p>
                </div>
                <Checkbox
                  style={{
                    padding: "0",
                    paddingTop: "0.1rem",
                  }}
                  onChange={handleCheckAllWeeklies}
                  checked={
                    weekliesPrevClicked
                      ? allWeekliesPrevChecked
                      : allWeekliesChecked
                  }
                />
              </div>
            </>
          )}
          <div className={styles.dailies_options}>
            {isEditingWeeklies ? (
              <>{editWeekliesCards && editWeekliesCards}</>
            ) : (
              <>{weekliesCards && weekliesCards}</>
            )}
          </div>
          <div className={styles.dailies_btm}>
            {isEditingWeeklies ? (
              <>
                <Button
                  onClick={handleAddWeeklies}
                  variant="contained"
                  size="large"
                  color="secondary"
                >
                  +
                </Button>
                <Button
                  onClick={handleSubmitWeeklies}
                  variant="contained"
                  size="large"
                  color="info"
                >
                  Update
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
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
