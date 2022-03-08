import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {deleteBookAction, fetchBooksAction, updateBookAction} from '../../redux/actions/books/bookActions';
import Loading from '../Loading/Loading';
import {updateAUserAction, fetchUserAction} from "../../redux/actions/users/usersActions";

const Books = ({history}) => {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBooksAction(id));
        dispatch(fetchUserAction())
    }, [dispatch, id]);

    //Taking data from store
    const booksList = useSelector(state => state.booksList);
    const {books, loading} = booksList;

    /*
        Start by getting current user login info
        destructure the returned object and call the variable user

        get the list of users
        destructure the list

        filter through the list and see if the user id matches with any in the userList
     */

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo: user } = userLogin;

    const usersList = useSelector(state => state.usersList);
    const {users} = usersList;

    //Delete book handler
    const deleteBookHandler = id => {
        dispatch(deleteBookAction(id));
        history.push('/profile');
    };

    //Accept book
    const acceptBookHandler = (book) => {

        const user = users?.filter(userObject => userObject._id === book.addedBy._id)[0];
        const approved = {
            category: book.category,
            title: book.title,
            author: book.author,
            price: book.price,
            status: 'Approved',
        };

        const declined = {
            category: book.category,
            title: book.title,
            author: book.author,
            price: book.price,
            status: 'Declined',
        };

        const calculateCredit = {
            credit: user.credit - book.price
        };

        if (book.price <= user.credit){
            dispatch(updateBookAction(book._id, approved));
            dispatch(updateAUserAction(user._id, calculateCredit));
        }else{
            dispatch(updateBookAction(book._id, declined));
        }

        history.push('/profile');
    };

    return (
        <div>
            {loading && <Loading/>}
            {books !== undefined && books.length === 0 ? (
                <h1>There are no books available right now!</h1>
            ) : (
                <div className='row'>
                    <div className='col'>
                        <table className='table table-hover'>
                            <thead>
                            <tr>
                                <th scope='col'>Book Name</th>
                                <th scope='col'>Author</th>
                                <th scope='col'>Category</th>
                                <th scope='col'>Price</th>
                                <th scope='col'>Added by</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Accept</th>
                                <th scope='col'>Delete</th>
                                <th scope='col'>Edit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {books &&  books.map(book => {
                                /*if (book?.status !== 'Approved')*/
                                return (
                                    <tr className='table-dark' key={book._id}>
                                        <th scope='row'>{book.title}</th>
                                        <td>{book.author}</td>
                                        <td>{book.category}</td>
                                        <td>{book.price}</td>
                                        <td>{book.addedBy.name}</td>
                                        <td>{book.status}</td>
                                        <td>
                                            <i
                                                onClick={() => acceptBookHandler(book)}
                                                className='fas fa-check '
                                                style={{color: 'green', cursor: 'pointer'}}>
                                            </i>
                                        </td>
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
                                                    }}></i>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}

                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Books;