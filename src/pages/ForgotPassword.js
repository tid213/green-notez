import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { supabase } from '../supabaseClient';
import Nav from '../components/Nav';

function ForgotPassword() {

    const navigate = useNavigate();
    const [formInfo, setFormInfo] = useState({email: ""});
    const [formError, setFormError] = useState("");
    const [formTitle, setFormTitle] = useState("Forgot Password");

    const handleChange = (event) => {
        setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
      };

    const handleSubmit = async (event) => {

        event.preventDefault();
        const { data, error } = await supabase.auth.resetPasswordForEmail(formInfo.email, {
            redirectTo: 'http://localhost:3000/',
          })
        if (error){
            console.log(error)
            setFormError(error);
        } else if (!error){
            setFormTitle("Reset password link sent to email")
            console.log(data);
        }

        
    };

    return(
        <div>
            <Nav />
            <div className='page-header'> 
            <h2>{formTitle}</h2>
            </div>
            <div className='profileForm'>
            <p>{formError}</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="text" name="email" onChange={handleChange} value={formInfo.email} placeholder="Email for password reset" />
                </Form.Group>
                <Button variant="success" type="submit">
                Submit
                </Button>
            </Form>
            </div>
        </div>
    );
}

export default ForgotPassword;