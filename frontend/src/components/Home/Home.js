import React from 'react';
import './Home.css';
import profile from '../../assets/img/profile.png';
import videoSource from '../../assets/nature.mp4';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div className='Container'>
            <video autoPlay='autoplay' loop='loop' muted className='Video'>
                <source src={videoSource} type='video/mp4' />
                Your browser does not support the video tag.
            </video>
            <div className='Content'>
                <div className='SubContent'>
                    <h1>Book Online</h1>
                    <p>Manage and request books with ease</p>
                    <button type='button' className='btn btn-outline-dark'>
                        <Link to='/register'>Let's go!</Link>
                    </button>
                    <img src={profile} alt='profile' />
                </div>
            </div>
        </div>
    );
};

export default Home;