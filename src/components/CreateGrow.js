import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import xsquare from '../images/x-square.svg';

function CreateGrow({session, createGrowCloseButton}){

    const navigate = useNavigate();
    const [message, setMessage] = useState("Start a new grow!");
    const [formInfo, setFormInfo] = useState({grow_name: "", nute_brand: "", grow_light: "",
                                            grow_medium: "", breeder: "", strain_name: "", tent_size: "" });

    const handleChange = (event) => {
        setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error } = await supabase
            .from('grow_id')
            .insert({user_id: session.user.id, grow_name: formInfo.grow_name, 
                     nute_brand: formInfo.nute_brand, grow_light: formInfo.grow_light,
                    breeder: formInfo.breeder, strain_name: formInfo.strain_name,
                    grow_medium: formInfo.grow_medium, tent_size: formInfo.tent_size})
        if (error){
            console.log(error);
        }
         refreshPage();
    }

    const refreshPage = ()=>{
        window.location.reload();
     }

    return(
        <div className='add-grow-form'>
            <div className='close-button' onClick={() => createGrowCloseButton("on")}>
                <img src={xsquare}></img>
            </div>
            <h3>{message}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="grow_name">
                <Form.Label>Name your grow!</Form.Label>
                <Form.Control type="text" name="grow_name" onChange={handleChange} value={formInfo.grow_name} placeholder="Start your new grow!" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="grow_light">
                <Form.Label>Grow Light</Form.Label>
                <Form.Control type="text" name="grow_light" value={formInfo.grow_light} onChange={handleChange} placeholder="Grow light will you be using" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="tent_size">
                <Form.Label>Tent Size</Form.Label>
                <Form.Control type="text" name="tent_size" value={formInfo.tent_size} onChange={handleChange} placeholder="example 4x4, 2x2" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="grow_medium">
                <Form.Label>Grow Medium</Form.Label>
                <Form.Control type="text" name="grow_medium" value={formInfo.grow_medium} onChange={handleChange} placeholder="Hydro, Soil, Coco, etc.." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="nute_brand">
                <Form.Label>Nutrient brand</Form.Label>
                <Form.Control type="text" name="nute_brand" value={formInfo.nute_brand} onChange={handleChange} placeholder="Nutrient brand will you be using" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="breeder">
                <Form.Label>Seed Brand</Form.Label>
                <Form.Control type="text" name="breeder" value={formInfo.breeder} onChange={handleChange} placeholder="Seed breeder name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="strain_name">
                <Form.Label>Name of strain</Form.Label>
                <Form.Control type="text" name="strain_name" value={formInfo.strain_name} onChange={handleChange} placeholder="Name of strain" />
                </Form.Group>
                <Button variant="success" type="submit">
                Submit
                </Button>
            </Form>
        </div>
    )
}

export default CreateGrow;