import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {logoutUserAction} from '../../redux/actions/users/usersActions';

const Navbar = () => {
    const state = useSelector(state => state.userLogin);
    const dispatch = useDispatch();
    const history = useHistory();

    const {userInfo} = state;

    const userProfile = useSelector(state => state.userProfile);
    const {user} = userProfile;

    const logoutHandler = () => {
        dispatch(logoutUserAction());
        history.push('/');
    };
    return (
        <header>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <Link className='navbar-brand' to='/'>
                    Online Library
                </Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarColor01'
                    aria-controls='navbarColor01'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>

                <div className='collapse navbar-collapse' id='navbarColor01'>
                    <ul className='navbar-nav m-auto'>
                        <li className='nav-item active'>
                            <Link className='nav-link' to='/'>
                                Home <span className='sr-only'>(current)</span>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            {/* Modal  */}

                            <button
                                type='button'
                                className='btn btn-danger'
                                data-toggle='modal'
                                data-target='#about'>
                                About
                            </button>

                            <div
                                className='modal fade'
                                id='about'
                                tabIndex='-1'
                                aria-labelledby='exampleModalLabel'
                                aria-hidden='true'>
                                <div className='modal-dialog'>
                                    <div className='modal-content'>
                                        <div className='modal-header'>
                                            <h5 className='modal-title' id='exampleModalLabel'>
                                                App functionalities
                                            </h5>
                                            <button
                                                type='button'
                                                className='close'
                                                data-dismiss='modal'
                                                aria-label='Close'>
                                                <span aria-hidden='true'>&times;</span>
                                            </button>
                                        </div>
                                        <div className='modal-body'>
                                            <ul className='list-group'>
                                                <li className='list-group-item active'>
                                                    <i
                                                        className='fas fa-clipboard-list text-white mr-3'
                                                        style={{fontSize: '1.5rem'}}></i>
                                                    Register User
                                                    <hr/>
                                                </li>
                                                <li className='list-group-item'>
                                                    <i
                                                        className='fas fa-clipboard-list text-white mr-3'
                                                        style={{fontSize: '1.5rem'}}></i>
                                                    Update Profile
                                                    <hr/>
                                                </li>

                                                <li className='list-group-item'>
                                                    <i
                                                        className='fas fa-clipboard-list text-white mr-3'
                                                        style={{fontSize: '1.5rem'}}></i>
                                                    Login
                                                    <hr/>
                                                </li>
                                                <li className='list-group-item'>
                                                    <i
                                                        className='fas fa-clipboard-list text-white mr-3'
                                                        style={{fontSize: '1.5rem'}}></i>
                                                    User Dashboard
                                                    <hr/>
                                                </li>
                                                <li className='list-group-item'>
                                                    <i
                                                        className='fas fa-clipboard-list text-white mr-3'
                                                        style={{fontSize: '1.5rem'}}></i>
                                                    List of Users
                                                    <hr/>
                                                </li>
                                                <li className='list-group-item'>
                                                    <i
                                                        className='fas fa-clipboard-list text-white mr-3'
                                                        style={{fontSize: '1.5rem'}}></i>
                                                    List of Books
                                                    <hr/>
                                                </li>
                                                <li className='list-group-item'>
                                                    <i
                                                        className='fas fa-clipboard-list text-white mr-3'
                                                        style={{fontSize: '1.5rem'}}></i>
                                                    Many more
                                                    <hr/>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='modal-footer'>
                                            <a
                                                className='mr-5'
                                                href='https://github.com/FunSnaps'
                                                target='_'>
                                                developed by: Marcus Enrique Elcamel
                                            </a>
                                            <button
                                                type='button'
                                                className='btn btn-danger'
                                                data-dismiss='modal'>
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        {userInfo ? (
                            <>
                                {user?.role === 'admin' ? (
                                    <li className='nav-item'>
                                        <Link className='nav-link' to='/books'>
                                            Books
                                        </Link>
                                    </li>
                                ) : []
                                }
                                {user?.role === 'employee' ? (
                                    <li className='nav-item'>
                                        <Link className='nav-link' to='/books'>
                                            Books
                                        </Link>
                                    </li>
                                ) : []
                                }
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/addbook'>
                                        Add book
                                    </Link>
                                </li>
                                {user?.role === 'admin' ? (
                                    <li className='nav-item'>
                                        <Link className='nav-link' to='/users'>
                                            Users
                                        </Link>
                                    </li>
                                ) : []
                                }
                                <li className='nav-item'>
                                    <Link
                                        className='nav-link'
                                        to='/login'
                                        onClick={() => dispatch(logoutUserAction())}>
                                        Logout
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/login'>
                                        Login
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/register'>
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}

                        {/* Drop dowm */}
                        {userInfo ? (
                            <li className='nav-item dropdown'>
                                <a
                                    className='nav-link dropdown-toggle btn-dark'
                                    data-toggle='dropdown'
                                    href='/'
                                    role='button'
                                    aria-haspopup='true'
                                    aria-expanded='false'>
                                    {userInfo.name}
                                </a>
                                <div className='dropdown-menu'>
                                    <Link className='dropdown-item' to='/profile'>
                                        Profile
                                    </Link>

                                    <div className='dropdown-divider'></div>
                                    <button onClick={logoutHandler} className='dropdown-item'>
                                        Logout
                                    </button>
                                </div>
                            </li>
                        ) : (
                            ''
                        )}
                    </ul>
                    <form className='form-inline my-2 my-lg-0'>
                        <input
                            className='form-control mr-sm-2'
                            type='text'
                            placeholder='Search'
                        />
                    </form>
                    <button className='btn btn-secondary my-2 my-sm-0' type='submit'>
                        Search
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;