import { Link } from "react-router-dom";
import styles from "./CardFood.module.css";

const CardFood = (props) => {

    const defaultImage = 'https://cdn-0.somosmamas.com.ar/wp-content/uploads/2020/11/Recetas-para-cenas-especiales-tips-1320x825.jpg';
   
    return (
       <div className={styles.mainContainer}>
           <Link to={`/detail/${props.id}`} className={styles.info}>
               <div className={styles.contImg}>
                <img src={props.image || defaultImage} alt="imagen principal" />
               </div>
                <h2>{props.title}</h2>
                <h4>Diets: {props.Diets}</h4>
           </Link>
        </div>
     );
}

export default CardFood;