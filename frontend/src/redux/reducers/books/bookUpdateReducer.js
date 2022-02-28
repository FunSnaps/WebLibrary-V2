import {
    BOOK_UPDATE_FAIL,
    BOOK_UPDATE_REQUEST,
    BOOK_UPDATE_SUCCESS,
} from '../../actions/actionTypes';

const bookUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case BOOK_UPDATE_REQUEST:
            return {
                loading: true,
            };
        case BOOK_UPDATE_SUCCESS:
            return {
                book: action.payload,
                loading: false,
                success: true,
            };
        case BOOK_UPDATE_FAIL:
            return {
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default bookUpdateReducer;