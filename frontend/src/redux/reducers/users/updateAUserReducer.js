import {
    A_USER_UPDATE_FAIL,
    A_USER_UPDATE_REQUEST,
    A_USER_UPDATE_SUCCESS,
} from '../../actions/actionTypes';

const updateAUserReducer = (state = {}, action) => {
    switch (action.type) {
        case A_USER_UPDATE_REQUEST:
            return {
                loading: true,
            };
        case A_USER_UPDATE_SUCCESS:
            return {
                book: action.payload,
                loading: false,
            };
        case A_USER_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default updateAUserReducer;