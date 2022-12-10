import styles from "./Bossing.module.css";
import BossingMain from "./BossingMain";
import BossingTop from "./BossingTop";

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
