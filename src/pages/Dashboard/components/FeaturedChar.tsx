import { useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import styles from "../Dashboard.module.css";
import defaultChar from "../../../images/default_char.png";

const FeaturedChar = () => {
  const featuredChar = useAppSelector((state) => state.dashboard.featuredChar);
  const [charImg, setCharImg] = useState<string>();

  return (
    <div className={styles.featured_ctn}>
      <div className={styles.featured_top}>
        <div className={styles.featured_image_ctn}>
          {charImg ? (
            <img src={charImg} alt="img" />
          ) : (
            <img src={defaultChar} alt="Default Character" />
          )}
        </div>
        <div className={styles.featured_ign_class}>
          {featuredChar.uuid && <p>{featuredChar.ign}</p>}
          {featuredChar.uuid && (
            <p>{`${featuredChar.level} ${featuredChar.class_name}`}</p>
          )}
        </div>
      </div>
      <div className={styles.featured_mid}>
        <p>Stats:</p>
        <p>Dojo: </p>
        <p>Full Rotation BA: </p>
      </div>
      <div className={styles.featured_btm}>Tracking:</div>
    </div>
  );
};

export default FeaturedChar;
