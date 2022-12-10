import styles from "./Bossing.module.css";
import BossingTop from "./components/BossingTop";
import BossingMain from "./components/BossingMain";

const Bossing = () => {
  return (
    <div className={styles.parent_ctn}>
      <BossingTop />
      <BossingMain />
      <div className={styles.btm_ctn}>Btm Ctn</div>
    </div>
  );
};

export default Bossing;
