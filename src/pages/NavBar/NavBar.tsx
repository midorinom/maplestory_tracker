import { useAppSelector } from "../../store/hooks";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { Tooltip } from "@mui/material";
import rockSpirit from "./images/rock_spirit.png";
import dailiesWeeklies from "./images/dailies_weeklies.png";
import bossing from "./images/bossing.png";
import progression from "./images/progression.png";
import legion from "./images/legion.png";
import farming from "./images/farming.png";
import events from "./images/events.png";

const NavBar = () => {
  const userData = useAppSelector((state) => state.user.userData);

  function localiseLegion() {
    if (userData.role === "GMS") {
      return "Legion";
    } else if (userData.role === "MSEA") {
      return "Union";
    }
  }
  const legionLocalisation = localiseLegion();

  function checkCharacters(url: string) {
    if (userData.characters.length > 0) {
      return url;
    } else {
      return "/";
    }
  }

  return (
    <div className={styles.parent_ctn}>
      <div className={styles.left_ctn}>
        <Link to="/" className={styles.left_ctn_link}>
          <img src={rockSpirit} alt="Rock Spirit" />
        </Link>
        <p>Maple Tracker</p>
      </div>
      <div className={styles.right_ctn}>
        <Tooltip title="Dailies & Weeklies" arrow>
          <Link
            to={checkCharacters("/dailies-weeklies")}
            className={styles.right_ctn_link}
          >
            <img src={dailiesWeeklies} alt="Dailies Weeklies" />
          </Link>
        </Tooltip>
        <Tooltip title="Weekly Bosses" arrow>
          <Link
            to={checkCharacters("/bossing")}
            className={styles.right_ctn_link}
          >
            <img src={bossing} alt="Bossing" />
          </Link>
        </Tooltip>
        <Tooltip title="Progression" arrow>
          <Link
            to={checkCharacters("/progression")}
            className={styles.right_ctn_link}
          >
            <img src={progression} alt="Progression" />
          </Link>
        </Tooltip>
        <Tooltip title={legionLocalisation} arrow>
          <Link
            to={checkCharacters("/legion")}
            className={styles.right_ctn_link}
          >
            <img src={legion} alt="Legion" />
          </Link>
        </Tooltip>
        <Tooltip title="Farming" arrow>
          <Link
            to={checkCharacters("/farming")}
            className={styles.right_ctn_link}
          >
            <img src={farming} alt="Farming" />
          </Link>
        </Tooltip>
        <Tooltip title="Events" arrow>
          <Link
            to={checkCharacters("/events")}
            className={styles.right_ctn_link}
          >
            <img src={events} alt="Events" />
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default NavBar;
