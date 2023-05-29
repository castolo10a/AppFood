import { useState } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = (props) => {

   const [FoodName, setFoodName] = useState('');

   const handlechange = (event) => {
      setFoodName(event.target.value)
   }

   return (
      <div className={styles.mainContainer}>
         <button 
            className={styles.button}
            onClick={()=> props.onSearch(FoodName)}>
            Search
         </button>
         <input 
            type='search'
            className={styles.input}
            onChange={handlechange}
         />
      </div>
   );
}

export default SearchBar;