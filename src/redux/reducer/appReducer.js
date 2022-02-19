import { IS_USER, SET_COMMODITIES, USER_DATA } from "../actions/types";


const initialState = {
    is_user: false,
    user_data: {},
    commodities: []
};


const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_USER:
            return {
                ...state,
                is_user: action.data
            }
        case USER_DATA:
            return {
                ...state,
                user_data: action.data
            }
        case SET_COMMODITIES:
            return {
                ...state,
                commodities: action.data
            }
        default:
            return state;
    }
};

export default appReducer;