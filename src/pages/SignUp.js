import React from 'react';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import grid from '../images/grid.svg';
import Nav from '../components/Nav';
import gmail from '../images/gmail.svg';

function SignUp() {
    const navigate = useNavigate();
    const [formInfo, setFormInfo] = useState({email: "", password: ""});
    const [message, setMessage] = useState("");

      const handleChange = (event) => {
        setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
      };
      const handleSubmit = async (event) => {
        // prevents the submit button from refreshing the page
        event.preventDefault();
        const { error } = await supabase.auth.signUp({
          email: formInfo.email,
          password: formInfo.password,
        })

        if (error){
          setMessage("Email taken or invalid password")
          console.log(error);
        } else{
          navigate('/login');
        }
      };

      const googleSignIn = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
        })
      }

    return (
        <div>
            <Nav />
            <div className='page-header'>
            <h2>Sign Up</h2>
            </div>
            <div className='profileForm'>
              <p>{message}</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="text" name="email" onChange={handleChange} value={formInfo.email} placeholder="Email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" name="password" value={formInfo.password} onChange={handleChange} placeholder="password" />
                </Form.Group>
                <Button variant="success" type="submit">
                Submit
                </Button>
            </Form>
            </div>
            <div className='google-signin'>
              <p>Or sign in with your Google account</p>
              <img src={gmail} onClick={googleSignIn}></img>
            </div>
            <div className='footer'>
                <p>Green Notes. 2022</p>
            </div>
        </div>
    );
}

export default SignUp;