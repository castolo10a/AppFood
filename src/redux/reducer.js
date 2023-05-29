import { FILTER_BY_DIET, FILTER_BY_ORIGIN, GET_DIETS, GET_FOOD, GET_FOODS, GET_FOODS_BY_NAME, ORDER_BY } from "./actions";

const initialState = {
    allFoods: [],
    foods: [],
    food: {},
    Diets: []
};

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_FOODS:
            return{
                ...state,
                foods: payload,
                allFoods: payload
            }

        case GET_FOOD:
            return{
                ...state,
                food: payload
            }

        case GET_DIETS:
            return{
                ...state,
                Diets: payload
            }

        case GET_FOODS_BY_NAME:
           return{
                ...state,
                foods: payload
            }

        case FILTER_BY_DIET:
            if(payload === "allFoods"){
                return{
                    ...state,
                    foods: state.allFoods
                }
            }
            const filterBydiet = state.allFoods.filter((food) => {
                return food.Diets.includes(payload);
            });
            return{
                ...state,
                foods: filterBydiet
            };

        case FILTER_BY_ORIGIN:
        if(payload === "allFoods"){
            return{
                ...state,
                foods: state.allFoods
            }
        }
        const filterByOrigin = state.allFoods.filter((food) => food.created === (payload === "true"))
        return{
            ...state,
            foods: filterByOrigin
        }

        case ORDER_BY:
            return{
                ...state,
                foods: payload === 'Ascending'? 
                [...state.foods].sort((a, b) => (a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1)) :
                payload === 'Descending' ?
                [...state.foods].sort((a, b) => (a.title.toUpperCase() < b.title.toUpperCase() ? 1 : -1)) :
                payload === 'healthScoreAscending' ?
                [...state.foods].sort((a, b) => (a.healthScore > b.healthScore ? 1 : -1)) :
                payload === 'healthScoreDescending' ?
                [...state.foods].sort((a, b) => (a.healthScore < b.healthScore ? 1 : -1)) :
                [...state.foods]
            }
            

        default:
            return {...state};
    }
}

export default reducer;