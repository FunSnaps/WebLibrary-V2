import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Profile.css';
import pic from '../../assets/img/profile.png';
import {useSelector, useDispatch} from 'react-redux';
import {getUserProfileAction} from '../../redux/actions/users/usersActions';
import Loading from '../Loading/Loading';
import {deleteBookAction} from "../../redux/actions/books/bookActions";

const Profile = ({history}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserProfileAction());
    }, [dispatch, history]);

    //Check if user is login otherwise redirect
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    useEffect(() => {
        if (userInfo === null) history.push('/profile');
    }, [userInfo, history]);

    //Get user Profile
    const userProfile = useSelector(state => state.userProfile);
    const {loading, user} = userProfile;

    const books = userProfile.user && userProfile.user.books;

    //Delete book handler
    const deleteBookHandler = id => {
        dispatch(deleteBookAction(id));
        history.push('/books');
    };

    const renderTable = () => {
        if (books) {
            return (
                <table className='table table-hover'>
                    <thead>
                    <tr>
                        <th scope='col'>Author</th>
                        <th scope='col'>Book Name</th>
                        <th scope='col'>Delete</th>
                        <th scope='col'>Update</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map(book => {
                        return (
                            <tr className='table-dark' key={book._id}>
                                <th scope='row'>{book.author}</th>
                                <td>{book.title}</td>
                                <td>{book.price}</td>
                                <td>
                                    <i
                                        onClick={() => deleteBookHandler(book._id)}
                                        className='fas fa-trash '
                                        style={{color: 'red', cursor: 'pointer'}}>

                                    </i>
                                </td>
                                <td>
                                    <Link to={`/book/${book && book._id}`}>
                                        <i
                                            className='far fa-edit'
                                            style={{
                                                color: 'yellow',
                                                cursor: 'pointer',
                                            }}>

                                        </i>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            );
        } else {
            return (
                <>
                    <h1>You don't have any book/s created.</h1>
                    <Link>Start Creating</Link>
                </>
            );
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col mt-5'>
                    {loading && !user ? (
                        <Loading/>
                    ) : (
                        <div className='card m-auto ' style={{width: '50%'}}>
                            <img src={pic} className='card-img-top' alt='...'/>
                            <div className='card-body'>
                                <h5 className='card-title'>Name: {user && user.name}</h5>
                                <p className='card-text'>Email: {user && user.email}</p>
                                <p className='card-text'>Credit: {user && user.credit}</p>
                                <Link to='/user-update' className='btn btn-primary'>
                                    Update your profile
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className='row'>
                <div className='col'>{renderTable()}</div>
            </div>
        </div>
    );
};

export default Profile;