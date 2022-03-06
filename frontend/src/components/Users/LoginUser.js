import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginUserAction} from '../../redux/actions/users/usersActions';
import ErrorMessage from '../DisplayMessage/ErrorMessage';
import Loading from '../Loading/Loading';

const LoginUser = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    //Get needed data from store
    const state = useSelector(state => {
        return state.userLogin;
    });

    const {loading, userInfo, error} = state;

    //Redirect
    useEffect(() => {
        if (userInfo) history.push('/profile');
    }, [dispatch,state, history]);

    //Submit handler
    const loginUserSubmitHandler = e => {
        e.preventDefault();
        dispatch(loginUserAction(email, password));
    };

    return (
        <div className='row container-height'>
            <div className='col-lg-6 col-md-6 m-auto'>
                <div className='container'>
                    <h1 className='text-center'>Login</h1>
                    {error && <ErrorMessage error={error} />}
                    {loading && <Loading />}
                    <form onSubmit={loginUserSubmitHandler}>
                        <fieldset>
                            <div className='form-group'>
                                <label htmlFor='exampleInputEmail'>Email address</label>
                                <input
                                    required
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
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    type='password'
                                    className='form-control'
                                    id='exampleInputPassword'
                                    placeholder='Enter password'
                                />
                            </div>
                            <br/>
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