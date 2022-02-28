import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import {userReducer} from "../reducers/users/userAuthReducer";
import {userProfileReducer} from "../reducers/users/userProfileReducer";
import {createBookReducer} from '../reducers/books/createBookReducer';
import {bookListReducer} from "../reducers/books/bookListReducer";
import bookDetailsReducer from "../reducers/books/bookDetailsReducer";
import bookUpdateReducer from "../reducers/books/bookUpdateReducer";
import userUpdateReducer from "../reducers/users/userUpdateReducer";
import usersListReducer from "../reducers/users/userListReducer";
import updateAUserReducer from "../reducers/users/updateAUserReducer";


const middlewares = [thunk];

const reducer = combineReducers({
    userLogin: userReducer,
    userProfile: userProfileReducer,
    updatedUser: userUpdateReducer,
    userDetails: updateAUserReducer,
    bookCreated: createBookReducer,
    booksList: bookListReducer,
    bookDetails: bookDetailsReducer,
    updatedBook: bookUpdateReducer,
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