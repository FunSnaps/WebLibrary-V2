import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {fetchBooksAction, deleteBookAction} from '../../redux/actions/books/bookActions';
import Loading from '../Loading/Loading';

const Books = ({history}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBooksAction());
    }, [dispatch]);

    //Taking data from store
    const booksList = useSelector(state => state.booksList);
    const { books, loading } = booksList;

    //Delete book handler
    const deleteBookHandler = id => {
        dispatch(deleteBookAction(id));
        history.push('/profile');
    };

    return (
        <div>
            {loading && <Loading />}
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
                                {/*<th scope='col'>Requested by</th>*/}
                                <th scope='col'>Delete</th>
                                <th scope='col'>Edit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {books &&
                            books.map(book => {
                                return (
                                    <tr className='table-dark' key={book._id}>
                                        <th scope='row'>{book.title}</th>
                                        <td>{book.author}</td>
                                       {/* <td>{}</td>*/}
                                        <td>
                                            <i
                                                onClick={() => deleteBookHandler(book._id)}
                                                className='fas fa-trash '
                                                style={{ color: 'red', cursor: 'pointer' }}>

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