import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteUserAction, fetchUserAction} from "../../redux/actions/users/usersActions";
import Loading from '../Loading/Loading';
import {Link} from "react-router-dom";

const Users = ({history}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserAction());
    }, [dispatch]);

    const usersList = useSelector(state => state.usersList);
    const {loading, users} = usersList;

    //Delete user handler
    const deleteUserHandler = id => {
        dispatch(deleteUserAction(id));
        history.push('/profile');
    };

    /*console.log(users, loading, error);*/
    return (
        <div className='container-fluid'>
            <h1 className='text-center m-5'>List of users {users && users.length}</h1>
            <hr className='text-white'/>
            <div className='row text-center justify-content-center'>
                {loading ? (
                    <Loading/>
                ) : (
                    <>
                        {users && (
                            users.map(user => (
                                <div className='col-lg-3' key={user._id}>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <i className='far fa-address-card h2 text-info'></i>
                                            <h5 className='card-title'>Name: {user.name}</h5>
                                            <p className='card-text'>Email: {user.email}</p>
                                            <p className='card-text'>Role: {user && user.role}</p>
                                            <p
                                                onClick={() => deleteUserHandler(user._id)}
                                                className='fas fa-trash '
                                                style={{color: 'red', cursor: 'pointer',padding: 20}}>
                                            </p>
                                            <Link to={`/user/${user && user._id}`}>
                                                <i
                                                    className='far fa-edit '
                                                    style={{color: 'blue', cursor: 'pointer',padding: 20}}></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Users;