import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

function About(){
    return(
        <div>
            <NavBar />
            <h1>About page</h1>
        </div>
    )
}

export default About;