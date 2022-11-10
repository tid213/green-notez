import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import axios from 'axios';

function SignUp() {
    const [message, setMessage] = useState();
    const [formInfo, setFormInfo] = useState({email: "", password: ""});
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9000/signup/")
          .then(res => res.text())
          .then(res => setMessage(res));
      }, []);

      const handleChange = (event) => {
        setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
      };
      const handleSubmit = (event) => {
        // prevents the submit button from refreshing the page
        event.preventDefault();
      axios
        .post("http://localhost:9000/signup/", formInfo)
        .then(() => console.log('Data Sent'))
        .catch(err => {
        console.error(err);
      });
        setFormInfo({name: "", email: ""});
      };


    return(
        <div className='sign-up'>
            <NavBar />
            <h1>{message}</h1>
            <form method='POST' onSubmit={handleSubmit}>
            <label>
              Email:
              <input type="text" name="email" value={formInfo.email} onChange={handleChange} />
            </label>
            <label>
              Password:
              <input type="password" name="password" value={formInfo.password} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
            </form>
            <button variant="raised" onClick={() => navigate('/')}>
            Home
            </button>
            <button variant="raised" onClick={() => navigate('/login')}>
            Login
            </button>
        </div>
    );
}

export default SignUp;