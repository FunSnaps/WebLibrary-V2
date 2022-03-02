import axios from 'axios';
import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT_SUCCESS,
    USER_PROFILE_REQUEST,
    USER_PROFILE_FAIL,
    USER_PROFILE_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    A_USER_UPDATE_REQUEST,
    A_USER_UPDATE_SUCCESS,
    A_USER_UPDATE_FAIL,

} from '../actionTypes';

//Register action
const registerUserAction = (name, email, password, role) => {
    return async dispatch => {
        try {
            dispatch({
                type: USER_REGISTER_REQUEST,
            });

            //Make the call
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const {data} = await axios.post(
                '/api/users/register',
                {
                    name,
                    email,
                    password,
                    role,
                },
                config
            );

            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data,
            });

            //Save the user into localstorage
            localStorage.setItem('userAuthData', JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        }
    };
};

//Login action
const loginUserAction = (email, password) => {
    return async dispatch => {
        try {
            dispatch({
                type: USER_LOGIN_REQUEST,
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const {data} = await axios.post(
                '/api/users/login',
                {email, password},
                config
            );
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data,
            });
            //Save the user into localstorage
            localStorage.setItem('userAuthData', JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: error.response.data.message,
            });
        }
    };
};

//Logout action
const logoutUserAction = () => async dispatch => {
    try {
        //Remove user from storage
        localStorage.removeItem('userAuthData');
        dispatch({
            type: USER_LOGOUT_SUCCESS,
        });
    } catch (error) {
    }
};

//Profile action
const getUserProfileAction = () => {
    return async (dispatch, getState) => {
        const {userInfo} = getState().userLogin;
        try {
            dispatch({
                type: USER_PROFILE_REQUEST
            });
            const config = {
                headers: {
                    'authorization': JSON.parse(localStorage.getItem('userAuthData'))?.token,
                    /*'authorization' : userInfo.token*/
                }
            };
            const {data} = await axios.get('/api/users/profile', config);
            dispatch({
                type: USER_PROFILE_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: USER_PROFILE_FAIL,
                payload: error.response && error.response.data.message,
            });
        };

    };
};

//Update action
const updateUserAction = (name, email, password) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: USER_UPDATE_REQUEST,
                loading: true,
            });
            //Get the token of the user from store to pass onto our endpoint
            const {userInfo} = getState().userLogin;
            console.log(userInfo.token);
            //Create a config and pass to axios for authentication
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': JSON.parse(localStorage.getItem('userAuthData'))?.token,
                },
            };
            const {data} = await axios.put(
                '/api/users/profile/update',
                {name, email, password},
                config
            );
            dispatch({
                type: USER_UPDATE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: USER_UPDATE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message : error.message,
            });
        }
    };
};

const updateAUserAction = (id, userData) => {
    return async dispatch => {
        try {
            dispatch({
                type: A_USER_UPDATE_REQUEST,
                loading: true,
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': JSON.parse(localStorage.getItem('userAuthData'))?.token,
                },
            };

            console.log(id, userData);
            const {data} = await axios.put(`/api/users/${id}`, userData, config);

            dispatch({
                type: A_USER_UPDATE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: A_USER_UPDATE_FAIL,
                loading: false,
                error: error.response && error.response.data.message,
            });
        }
    };
};

//Delete user action
const deleteUserAction = id => {
    return async dispatch => {
        try {
            dispatch({
                type: USER_DELETE_REQUEST,
                loading: true,
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': JSON.parse(localStorage.getItem('userAuthData'))?.token,
                },
            };
            const {data} = await axios.delete(`/api/users/${id}`, config);
            dispatch({
                type: USER_DELETE_SUCCESS,
                payload: data,
            });

        } catch (error) {
            dispatch({
                type: USER_DELETE_FAIL,
                loading: false,
                error: error.response && error.response.data.message,
            });
        }
    };
};

//Fetch user action
const fetchUserAction = () => {
    return async dispatch => {
        try {
            dispatch({
                type: FETCH_USERS_REQUEST,
                loading: true,
            });
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': JSON.parse(localStorage.getItem('userAuthData'))?.token,
                },
            };
            const {data} = await axios.get('/api/users', config);

            dispatch({
                type: FETCH_USERS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: FETCH_USERS_FAIL,
                error: error.response && error.response.data.message,
            });
        }
    };
};

export {
    registerUserAction,
    loginUserAction,
    logoutUserAction,
    getUserProfileAction,
    updateUserAction,
    fetchUserAction,
    deleteUserAction,
    updateAUserAction
};