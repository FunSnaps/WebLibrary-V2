import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AddBook from "./components/Books/AddBook";
import Books from "./components/Books/Books";
import Navbar from "./components/Navbar/Navbar";
import RegisterUser from "./components/Users/RegisterUser";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar/>
                <Switch>
                    <Route exact path='/books' component={Books}></Route>
                    <Route exact path='/addbook' component={AddBook}></Route>
                    <Route exact path='/register' component={RegisterUser}></Route>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
