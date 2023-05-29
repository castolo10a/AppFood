import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getFood } from "../../redux/actions";
import styles from './Detail.module.css';

const Detail = () => {

    const {id} = useParams();
    const food = useSelector(state => state.food);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        dispatch(getFood(id)).finally(() => setLoading(false));
    },[id,dispatch]);

    return (
    <div>
        {loading ? (
            <p style={{color:'#88070B'}}>Loading...</p>
        ) :  (
                <div className={styles.mainContainer}>
                    <div className={styles.back}>
                        <Link to={"/Home"}>
                            <button>Back</button>
                        </Link>
                    </div>
                    <div className={styles.titleFood}>
                        <h1>{food.name}</h1>
                    </div>
                    <div className={styles.imgContainer}>
                        <img className={styles.imgFood} src={food.image} alt={food.name} />
                    </div>
                    <div className={styles.informationFood}>
                        <h3>Summary.</h3>
                        <p>{food.summary}</p>
                        <h3>Health Score (0 - 100).</h3> <p>{food.healthScore}</p>
                        <h3>Steps By Steps.</h3>
                        {Array.isArray(food.stepByStep) ?  <ol> {food.stepByStep.map((step, key) => <li key={key}> {step} </li>)} </ol> : <p>{food.stepByStep}</p>}
                        <h3>Diets.</h3>
                        {Array.isArray(food.Diets) ? <ul> {food.Diets.map((diet, key) => <li key={key}> {diet} </li>)} </ul> : <p>{food.Diets}</p>}
                    </div>
                </div>
            )
        }
    </div>
    )
}

export default Detail;