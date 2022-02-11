import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AddBook from "./components/Books/AddBook";
import Books from "./components/Books/Books";
import Navbar from "./components/Navbar/Navbar";
import RegisterUser from "./components/Users/RegisterUser";
import LoginUser from "./components/Users/LoginUser";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import UpdateProfile from "./components/Profile/UpdateProfile";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar/>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route exact path='/login' component={LoginUser}></Route>
                    <Route exact path='/profile' component={Profile}></Route>+
                    <Route exact path='/user-update' component={UpdateProfile}></Route>+
                    <Route exact path='/books' component={Books}></Route>
                    <Route exact path='/addbook' component={AddBook}></Route>
                    <Route exact path='/register' component={RegisterUser}></Route>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
