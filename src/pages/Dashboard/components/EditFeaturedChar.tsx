import React from "react";
import { useAppSelector } from "../../../store/hooks";
import styles from "../Dashboard.module.css";

const EditFeaturedChar = () => {
  const featuredChar = useAppSelector((state) => state.dashboard.featuredChar);

  return (
    <div className={styles.featured_ctn}>
      <div className={styles.featured_top}>
        {/* {showEditIcon && (
      <IconButton
        style={{ position: "absolute", top: "1%", right: "2%" }}
        onClick={edit}
        size="large"
        className={styles.edit_btn_ctn}
      >
        <EditIcon className={styles.edit_btn_icon} />
      </IconButton>
    )} */}
        {/* <div className={styles.featured_image_ctn}>
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
      {(featuredChar.stats || featuredChar.dojo || featuredChar.ba) && (
        <div className={styles.featured_mid}>
          {featuredChar.stats && (
            <p>
              Stat: <span className={styles.stats}>{featuredChar.stats}</span>
            </p>
          )}
          {featuredChar.dojo && (
            <p>
              Dojo: <span className={styles.stats}>{featuredChar.dojo}F</span>
            </p>
          )}
          {featuredChar.ba && (
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
        )} */}
      </div>
    </div>
  );
};

export default EditFeaturedChar;
