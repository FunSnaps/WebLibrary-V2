import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginUserAction} from '../../redux/actions/users/usersActions';
import ErrorMessage from "../ErrorMessage";

const LoginUser = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    //Get needed data from store

    const state = useSelector(state => {
        return state.userLogin;
    });

    const {loading, userInfo, error} = state;

    //Submit handler
    const loginUserSubmitHandler = e => {
        e.preventDefault();
        dispatch(loginUserAction(email, password));
    };

    //Redirect
    useEffect(() => {
        if (userInfo) history.push('/profile');
    }, [state]);

    return (
        <div className='row container-height'>
            <div className='col-lg-6 col-md-6 m-auto'>
                <div className='container'>
                    <h1 className='text-center'>Login</h1>
                    {loading && <h1>Loading......</h1>}
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <form onSubmit={loginUserSubmitHandler}>
                        <fieldset>
                            <div className='form-group'>
                                <label htmlFor='exampleInputEmail'>Email address</label>
                                <input
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    type='email'
                                    className='form-control'
                                    id='exampleInputEmail'
                                    aria-describedby='emailHelp'
                                    placeholder='Enter e-mail'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='exampleInputPassword'>Password</label>
                                <input
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    type='password'
                                    className='form-control'
                                    id='exampleInputPassword'
                                    placeholder='Enter password'
                                />
                            </div>
                            <button type='submit' className='btn btn-info m-auto'>
                                Login
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginUser;