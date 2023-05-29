import axios from 'axios';

export const GET_FOODS = 'GET_FOODS';
export const GET_FOOD = 'GET_FOOD';
export const GET_DIETS = 'GET_DIETS';
export const GET_FOODS_BY_NAME = 'GET_FOODS_BY_NAME';
export const FILTER_BY_DIET = 'FILTER_BY_DIET';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const ORDER_BY = 'ORDER_BY';


export const getFoods = () => {
    return async function(dispatch){
        const {data} = await axios.get('/recipes')
        dispatch({type: GET_FOODS, payload: data})
    };
};

export const getFood = (id) => {
    return async function (dispatch){
        const {data} = await axios.get(`/recipes/${id}`);
        dispatch({type: GET_FOOD, payload: data});
    };
};

export const getDiets = () => {
    return async function (dispatch){
        const {data} = await axios.get('/diets')
        dispatch({type: GET_DIETS, payload: data})
    }
};

export const getFoodsByName = (name) => {
    return async function(dispatch){
        const {data} = await axios.get(`/recipes?name=${name}`)
        dispatch({type: GET_FOODS_BY_NAME, payload: data})
    };
};

export const filterByDiet = (diet) => {
    return function(dispatch){
        dispatch({type: FILTER_BY_DIET, payload: diet})
    }
}

export const filterByOrigin = (created) => {
    return function(dispatch){
        dispatch({type: FILTER_BY_ORIGIN, payload: created})
    }
};

export const orderBy = (order) => {
    return function(dispatch){
        dispatch({type: ORDER_BY, payload: order})
    }
};