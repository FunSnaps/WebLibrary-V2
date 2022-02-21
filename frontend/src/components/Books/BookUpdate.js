import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBookAction, updateBookAction} from '../../redux/actions/books/bookActions';
import Loading from "../Loading/Loading";

const BookDetail = ({history}) => {
    const {id} = useParams();

    //Get the book details and fill it in the form
    const bookDetails = useSelector(state => state.bookDetails);
    const {book, loading, success} = bookDetails;

    const [category, setCategory] = useState(book && !loading && book.category);
    const [title, setTitle] = useState(book && !loading && book.title);
    const [author, setAuthor] = useState(book && book.author);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBookAction(id));
    }, [dispatch, id]);

    //dispatch action
    const formSubmitHandler = e => {
        const data = {
            category,
            title,
            author
        };
        e.preventDefault();
        dispatch(updateBookAction(id, data));
        history.push('/profile');
    };
    return (
        <div className='row container-height'>
            <div className='col-lg-6 col-md-6 m-auto'>
                <div className='container'>
                    {book ? (
                        <>
                            <h1 className='text-center'>Update</h1>
                            <form onSubmit={formSubmitHandler}>
                                <fieldset>
                                    <div className='form-group'>
                                        <select
                                            value={category}
                                            onChange={e => setCategory(e.target.value)}
                                            className='custom-select'>
                                            <option defaultValue='Programming'>Programming</option>
                                            <option value='Fiction'>Fiction</option>
                                            <option value='Non-Fiction'>Non-Fiction</option>
                                            <option value='Conspiracy'>Conspiracy</option>
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1'>Author </label>
                                        <input
                                            value={author}
                                            onChange={e => setAuthor(e.target.value)}
                                            type='text'
                                            className='form-control'
                                            id='exampleInputEmail1'
                                            aria-describedby='emailHelp'
                                            placeholder='Author name'
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputPassword1'>Title</label>
                                        <input
                                            value={title}
                                            onChange={e => setTitle(e.target.value)}
                                            type='text'
                                            className='form-control'
                                            id='exampleInputPassword1'
                                            placeholder='Book title'
                                        />
                                    </div>
                                    <br/>
                                    <button type='submit' className='btn btn-dark m-auto'>
                                        Update book
                                    </button>
                                </fieldset>
                            </form>
                        </>
                    ) : (
                        loading && <Loading />
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookDetail;