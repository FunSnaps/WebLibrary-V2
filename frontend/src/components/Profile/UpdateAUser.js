import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserAction, updateAUserAction} from '../../redux/actions/users/usersActions';
import SuccessMessage from "../DisplayMessage/SuccessMessage";

const UpdateAUser = ({history}) => {
    const {id} = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserAction(id));
    }, [dispatch, id]);

    //Get the user details and fill it in the form
    const userDetails = useSelector(state => state?.userDetails);
    const {userInfo, loading, success} = userDetails;

    const [name, setName] = useState(userInfo && !loading && userInfo.name);
    const [email, setEmail] = useState(userInfo && !loading && userInfo.email);
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(userInfo && !loading && userInfo.role);
    const [credit, setCredit] = useState(userInfo && !loading && userInfo.credit);

    //dispatch action
    const formSubmitHandler = e => {
        const data = {
            name,
            email,
            password,
            credit,
            role,
        };
        e.preventDefault();
        dispatch(updateAUserAction(id, data));
        history.push('/profile');
    };
    return (
        <div className='row container-height'>
            <div className='col-lg-6 col-md-6 m-auto'>
                <div className='container'>
                    {userInfo && !loading && success && (
                        <SuccessMessage message='Updated successfully.'/>
                    )}
                    <h1 className='text-center'>Update</h1>
                    <form onSubmit={formSubmitHandler}>
                        <fieldset>
                            <div className='form-group'>
                                <label htmlFor='exampleInputName1'>Name</label>
                                <input
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    type='text'
                                    className='form-control'
                                    id='exampleInputName1'
                                    aria-describedby='nameHelp'
                                    placeholder='Enter Name'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='exampleInputEmail1'>Email address</label>
                                <input
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    type='email'
                                    className='form-control'
                                    id='exampleInputEmail1'
                                    aria-describedby='emailHelp'
                                    placeholder='Enter email'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='exampleInputPassword1'>Password</label>
                                <input
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    type='password'
                                    className='form-control'
                                    id='exampleInputPassword1'
                                    placeholder='Password'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='exampleInputCredits1'>Credits</label>
                                <input
                                    value={credit}
                                    onChange={e => setCredit(e.target.value)}
                                    type='text'
                                    className='form-control'
                                    id='exampleInputCredits'
                                    placeholder='Credits'
                                />
                            </div>
                            <br/>
                            <div className='form-group'>
                                <select
                                    value={role}
                                    onChange={e => setRole(e.target.value)}
                                    className='custom-select'>
                                    <option defaultValue='Category'>Role</option>
                                    <option value='admin'>Admin</option>
                                    <option value='employee'>Employee</option>
                                    <option value='user'>User</option>
                                </select>
                            </div>
                            <br/>
                            <button type='submit' className='btn btn-primary m-auto'>
                                Update profile
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateAUser;