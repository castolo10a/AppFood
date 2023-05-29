import CardsFoods from "../../components/CardsFoods/CardsFoods";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFoods, getDiets } from "../../redux/actions";
import styles from './Home.module.css';

const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFoods());
        dispatch(getDiets());
    },[dispatch]);

    
    return(
        <div className={styles.mainContainer}>
            {
                <div>
                    <CardsFoods/>
                </div>
            }
        </div>
    )
}

export default Home;