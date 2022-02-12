import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT_SUCCESS,
} from '../../actions/actionTypes';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        //Register
        case USER_REGISTER_REQUEST:
            return {
                loading: true,
            };
        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
            };
        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        //Login
        case USER_LOGIN_REQUEST:
            return {
                loading: true,
            };
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
            };
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case USER_LOGOUT_SUCCESS:
            return {};

        default:
            return state;
    }
};

export { userReducer };