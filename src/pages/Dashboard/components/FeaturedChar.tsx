import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { dashboardActions } from "../../../store/dashboard";
import { Character, DefaultRes } from "../../../types/types";
import styles from "../Dashboard.module.css";
import defaultChar from "../../../images/default_char.png";
import { Checkbox, FormControlLabel, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const FeaturedChar = () => {
  // =========
  // Variables
  // =========
  const dispatch = useAppDispatch();
  const featuredChar = useAppSelector((state) => state.dashboard.featuredChar);
  const [charImg, setCharImg] = useState<string>("");
  const isEditing = useAppSelector((state) => state.dashboard.isEditing);
  const [showEditIcon, setShowEditIcon] = useState<boolean>(false);
  const [isUpdatingTracking, setIsUpdatingTracking] = useState<boolean>(false);
  const [tracking, setTracking] = useState<any>();
  interface Tracking {
    dailies: boolean;
    bossing: boolean;
    progression: boolean;
    farming: boolean;
    events: boolean;
  }

  // ==============
  // Event Handlers
  // ==============
  function handleChange(e: any) {
    setIsUpdatingTracking(true);

    if (tracking && tracking[e.target.id] === true) {
      setTracking((prevState: Tracking) => {
        return { ...prevState, [e.target.id]: false };
      });
    } else {
      setTracking((prevState: Tracking) => {
        return { ...prevState, [e.target.id]: true };
      });
    }
  }

  function edit() {
    if (!isEditing) {
      dispatch(dashboardActions.setIsEditing(true));
    }
  }

  // ==========
  // useEffects
  // ==========
  // When Featured Character changes
  useEffect(() => {
    // Set Image
    if (featuredChar.uuid) {
      getImage();

      // Set Tracking
      let trackingArr: string[] = [];
      let defaultTracking: Tracking = {
        dailies: false,
        bossing: false,
        progression: false,
        farming: false,
        events: false,
      };

      if (featuredChar.tracking) {
        trackingArr = featuredChar.tracking.split("@");
        for (const item of trackingArr) {
          defaultTracking[item as keyof Tracking] = true;
        }
      }
      setTracking(defaultTracking);
    }
  }, [featuredChar]);

  // Update Character
  useEffect(() => {
    if (isUpdatingTracking) {
      setIsUpdatingTracking(false);
      const trackingArr: string[] = [];

      for (const item of Object.keys(tracking)) {
        if (tracking[item] === true) {
          trackingArr.push(item);
        }
      }

      const newChar = {
        ...featuredChar,
        tracking: trackingArr.join("@"),
      };

      updateCharacter(newChar);
    }
  }, [tracking]);

  // ===============
  // Fetch Functions
  // ===============
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
        setCharImg(image);
      } else {
        setCharImg(defaultChar);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const updateCharacter = async (newChar: Character) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/characters/update", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...newChar,
        }),
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
    <div
      onMouseEnter={() => setShowEditIcon(true)}
      onMouseLeave={() => setShowEditIcon(false)}
      className={styles.featured_ctn}
    >
      <div className={styles.featured_top}>
        {showEditIcon && (
          <IconButton
            style={{ position: "absolute", top: "1%", right: "2%" }}
            onClick={edit}
            size="large"
            className={styles.edit_btn_ctn}
          >
            <EditIcon fontSize="large" className={styles.edit_btn_icon} />
          </IconButton>
        )}
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
      {(!!featuredChar.stats || !!featuredChar.dojo || !!featuredChar.ba) && (
        <div className={styles.featured_mid}>
          {!!featuredChar.stats && (
            <p>
              Stat:{" "}
              <span className={styles.stats}>
                {featuredChar.stats.toLocaleString()}
              </span>
            </p>
          )}
          {!!featuredChar.dojo && (
            <p>
              Dojo: <span className={styles.stats}>{featuredChar.dojo}F</span>
            </p>
          )}
          {!!featuredChar.ba && (
            <p>
              Full Rotation BA:
              <span className={styles.stats}>{featuredChar.ba} (b/s)</span>
            </p>
          )}
        </div>
      )}
      <div className={styles.featured_btm}>
        {tracking && (
          <div className={styles.featured_tracking}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleChange}
                  checked={tracking.dailies}
                  id="dailies"
                />
              }
              label="Dailies/ Weeklies"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleChange}
                  checked={tracking.bossing}
                  id="bossing"
                />
              }
              label="Weekly Bosses"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleChange}
                  checked={tracking.progression}
                  id="progression"
                />
              }
              label="Progression"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleChange}
                  checked={tracking.farming}
                  id="farming"
                />
              }
              label="Farming"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleChange}
                  checked={tracking.events}
                  id="events"
                />
              }
              label="Events"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedChar;
