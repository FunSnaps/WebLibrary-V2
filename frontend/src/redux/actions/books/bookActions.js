import axios from "axios";
import {
    BOOK_DETAIL_FAIL,
    BOOK_DETAIL_REQUEST,
    BOOK_DETAIL_SUCCESS,
    BOOK_UPDATE_FAIL,
    BOOK_UPDATE_REQUEST,
    BOOK_UPDATE_SUCCESS,
    CREATE_BOOK_FAIL,
    CREATE_BOOK_REQUEST,
    CREATE_BOOK_SUCCESS,
    DELETE_BOOK_FAIL,
    DELETE_BOOK_REQUEST,
    DELETE_BOOK_SUCCESS,
    FETCH_BOOK_FAIL,
    FETCH_BOOK_REQUEST,
    FETCH_BOOK_SUCCESS
} from "../actionTypes";

//Create a book
const createBookAction = bookData => {
    return async dispatch => {
        try {
            dispatch({
                type: CREATE_BOOK_REQUEST,
                loading: true,
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': JSON.parse(localStorage.getItem('userAuthData'))?.token,
                }
            };
            const {data} = await axios.post('/api/books', bookData, config);

            dispatch({
                type: CREATE_BOOK_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: CREATE_BOOK_FAIL,
                payload: error.response && error.response.data.message,
            });
        }
    };
};

//Fetch all books
const fetchBooksAction = () => {
    return async dispatch => {
        try {
            dispatch({
                type: FETCH_BOOK_REQUEST,
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': JSON.parse(localStorage.getItem('userAuthData'))?.token,
                },
            };
            //make http call to our backend
            const {data} = await axios.get('/api/books', config);
            dispatch({
                type: FETCH_BOOK_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: FETCH_BOOK_FAIL,
                payload: error.response && error.response.data.message,
            });
        }
    };
};

//Delete a book
const deleteBookAction = id => {
    return async dispatch => {
        try {
            dispatch({
                type: DELETE_BOOK_REQUEST,
                loading: true,
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': JSON.parse(localStorage.getItem('userAuthData'))?.token,
                },
            };
            const {data} = await axios.delete(`/api/books/${id}`, config);
            dispatch({
                type: DELETE_BOOK_SUCCESS,
                payload: data,
            });

        } catch (error) {
            dispatch({
                type: DELETE_BOOK_FAIL,
                loading: false,
                error: error.response && error.response.data.message,
            });
        }
    };
};

//Fetch a book
const fetchBookAction = (id, bookData) => {
    return async dispatch => {
        try {
            dispatch({
                type: BOOK_DETAIL_REQUEST,
                loading: true,
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': JSON.parse(localStorage.getItem('userAuthData'))?.token,
                },
            };
            const {data} = await axios.get(`/api/books/${id}`, config);

            dispatch({
                type: BOOK_DETAIL_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: BOOK_DETAIL_FAIL,
                error: error.response && error.response.data.message,
            });
        }
    };
};

//Update a book
const updateBookAction = (id, bookData) => {
    return async dispatch => {
        try {
            dispatch({
                type: BOOK_UPDATE_REQUEST,
                loading: true,
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': JSON.parse(localStorage.getItem('userAuthData'))?.token,
                },
            };

            console.log(id, bookData);
            const {data} = await axios.put(`/api/books/${id}`, bookData, config);

            dispatch({
                type: BOOK_UPDATE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: BOOK_UPDATE_FAIL,
                loading: false,
                error: error.response && error.response.data.message,
            });
        }
    };
};

export {createBookAction, fetchBooksAction, deleteBookAction, fetchBookAction, updateBookAction};