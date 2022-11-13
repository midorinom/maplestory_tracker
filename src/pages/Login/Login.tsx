import harmonySpirit from "../../images/harmony_spirit.png";
import { useAppSelector } from "../../store/hooks";
import LoginComp from "./components/LoginComp";
import Register from "./components/Register";
import Registered from "./components/Registered";
import styles from "./Login.module.css";

const Login = () => {
  const page = useAppSelector((state) => state.login.page);

  function displayPage() {
    switch (page) {
      case "login":
        return <LoginComp />;
      case "register":
        return <Register />;
      case "registered":
        return <Registered />;
    }
  }
  const currentPage = displayPage();

  return (
    <div className={`${styles.parent_ctn} + centered`}>
      <div className={styles.header}>
        <img
          className={styles.harmony_spirit}
          src={harmonySpirit}
          alt="Harmony Spirit"
        />
        <h1 className={`${styles.header_text} + centered`}>Maple Tracker</h1>
      </div>
      {currentPage}
    </div>
  );
};

export default Login;
