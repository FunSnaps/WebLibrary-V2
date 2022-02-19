import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import {createBookReducer} from '../reducers/books/createBookReducer';
import {bookListReducer} from "../reducers/books/bookListReducer";
import {userReducer} from "../reducers/users/userAuthReducer";
import {userProfileReducer} from "../reducers/users/userProfileReducer";
import bookDetailsReducer from "../reducers/books/bookDetailsReducer";
import userUpdateReducer from "../reducers/users/userUpdateReducer";
import usersListReducer from "../reducers/users/userListReducer";


const middlewares = [thunk];

const reducer = combineReducers({
    userLogin: userReducer,
    userProfile: userProfileReducer,
    updatedUser: userUpdateReducer,
    bookCreated: createBookReducer,
    booksList: bookListReducer,
    bookDetails: bookDetailsReducer,
    usersList: usersListReducer,
});

const userAuthFromStorage = localStorage.getItem('userAuthData')
    ? JSON.parse(localStorage.getItem('userAuthData'))
    : null;

const initialState = {
    userLogin: { userInfo: userAuthFromStorage },
};

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
);

export {store};