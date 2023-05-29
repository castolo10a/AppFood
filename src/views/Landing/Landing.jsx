import { Link } from "react-router-dom";
import styles from './Landing.module.css';

const Landing = () => {
  
    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
              <div className={styles.spa}>
              <h1>NUTRITION & HEALTH</h1>
            </div>
            <div className={styles.slogan}>
              <p>Delicious recipes to prepare, Enter and discover more!!!</p>
            <Link to={"/Home"}>
              <button>View Recipes</button>
            </Link>
            </div>
            </div>
        </div>
    )
}

export default Landing;