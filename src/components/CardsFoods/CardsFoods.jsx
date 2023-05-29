import CardFood from "../CardFood/CardFood";
import SearchBar from "../SearchBar/SearchBar";
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from "react";
import { filterByDiet, filterByOrigin, orderBy, getFoodsByName } from "../../redux/actions";
import styles from './CardsFoods.module.css';


const CardsFoods = () => {

    const foods = useSelector(state => state.foods);
    const diets = useSelector(state => state.Diets)
    const [currentPage, setCurrentPage] = useState(1);
    const [searchFood, setSearchFood] = useState('');
    const [loading, setLoading] = useState(false);
    const cardsPerPage = 9;
    const dispatch = useDispatch();

    useEffect(() => {
        setCurrentPage(currentPage);
    },[currentPage]);

    useEffect(() => {
        setSearchFood(searchFood);
    },[searchFood]);

    useEffect(() => {
        setLoading(true);
        dispatch(getFoodsByName(searchFood)).finally(() => setLoading(false));
    },[dispatch, searchFood]);

    const onSearch = (name) => {
        setSearchFood(name);
        setCurrentPage(1);
    };

    const searchFoods = searchFood
    ? foods.filter((food) =>
        food.title.toLowerCase().includes(searchFood.toLowerCase()))
    : foods;

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = searchFoods.slice(indexOfFirstCard, indexOfLastCard);

    const totalPages = Math.ceil(searchFoods.length / cardsPerPage);
    const pages = [];

    for(let i = 1; i <= totalPages; i++){
        pages.push(
            <button 
                key={i}
                value={i}>
                {i}
            </button>
        );
    };

    const handlePage = (event) => {
        const value = Number(event.target.value);

        setCurrentPage(value)
    }

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    
    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handlefilterByDiet = (event) => {
        dispatch(filterByDiet(event.target.value));
        setCurrentPage(1);
    }

    const handlefilterOrigin = (event) => {
        dispatch(filterByOrigin(event.target.value));
        setCurrentPage(1);
    }

    const handleOrder = (event) => {
        dispatch(orderBy(event.target.value));
        setCurrentPage(1);
    }

    return(
        <div>
           <div className={styles.divSearch}>
                <SearchBar onSearch={onSearch}/>
            </div>
            <div className={styles.divFiltersOrder}>
                <div> 
                    <select className={styles.selectFilter} onChange={handlefilterOrigin}>
                        <option value="default" disabled='disable'>Create / NotCreated</option>
                        <option value="allFoods">All Foods</option>
                        <option value='false'>Not Created</option>
                        <option value='true'>Created</option>
                    </select>
                </div>
                <div> 
                    <select className={styles.selectFilter} onChange={handlefilterByDiet}>
                        <option value="default" disabled='disable'>filter By Diets</option>
                        <option value="allFoods">All Foods</option>
                        {diets.map((diet, key) => 
                            <option key={key} value={diet.name}>{diet.name}</option>
                            )}
                    </select>
                </div>
                <div> 
                    <select className={styles.selectOrder} onChange={handleOrder}>
                        <option value="default" disabled='disable'>Order By</option>
                        <option value="Ascending">A-Z</option>
                        <option value="Descending">Z-A</option>
                        <option value="healthScoreAscending">Healt score - Ascending</option>
                        <option value="healthScoreDescending">Healt score - Descending</option>
                    </select>
                </div>
            </div>
            <div className={styles.cardsContainer}>
                {loading ? (
                    <p style={{color:'#88070B'}}>Loading...</p>
                ) : currentCards.length ? currentCards.map((food, key) => {
                    return <CardFood 
                        id={food.id}
                        key={key}
                        image={food.image}
                        title={food.title}
                        Diets={typeof food.Diets === 'object' ? food.Diets.join(', ') : food.Diets}
                    />
                }) : <p className={styles.notFood}>No recipe to display</p>}
            </div>
            <div className={styles.divPaginado}>
                <button onClick={handlePrevClick} disabled={currentPage === 1}>Previous</button>
                    <button className={styles.pages} value='' onClick={handlePage}>{pages}</button>
                <button onClick={handleNextClick} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    )
}

export default CardsFoods;