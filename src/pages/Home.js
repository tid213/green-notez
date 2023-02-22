import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Button from 'react-bootstrap/Button';
import grid from '../images/grid.svg';

function Home() {
    const navigate = useNavigate();
    return (
        <div className='page'>
             <Nav />
            <div className='homePage'>
                <div className='homePageTitle'>
                  <h3>Welcome to Green Notez</h3>
                </div>
                <div className='homePageInfo'>
                  <p>We're here to help keep track of your water changes, daily check-ins and problem tracker for your hydroponic garden.</p>
                  <p>-</p>
                  <p>Sign in or create your account today!</p>
                </div>
                <div className='homePageButtons'>
                    <div className='homePageSignIn'>
                    <Button variant="success" onClick={() => navigate('/signin')}>
                    Sign In
                    </Button>
                    </div>
                    <div className='homePageSignUp'>
                    <Button variant="success" onClick={() => navigate('/signup')}>
                    Sign Up
                    </Button>
                    </div>
                </div>
            </div>
            <div className='footer'>
                <p>Green Notes. 2022</p>
            </div>
        </div>
    );
}

export default Home;