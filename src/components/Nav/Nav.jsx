import { Link } from "react-router-dom";
import styles from './Nav.module.css';


const Nav = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.navigate}>
                    <Link to="/Home">
                        <button>Home</button>
                    </Link>

                    <Link to="/CreateRecipe">
                        <button>Create Recipe</button>
                    </Link>
            </div>
            <div className={styles.logout}>
                <Link to="/">
                    <button>Beginning</button>
                </Link>
            </div>
        </div>
    )
}

export default Nav;