import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect  } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import xsquare from '../images/x-square.svg';



function EditGrowForm({session, growID, toggleEditDiv}){

    const navigate = useNavigate();
    const [message, setMessage] = useState("Edit Grow");
    const [formInfo, setFormInfo] = useState({grow_name: "", nute_brand: "", grow_light: ""});
    const [sproutDate, setSproutDate] = useState();
    const [flowerDate, setFlowerDate] = useState();

    useEffect(()=>{
        getGrowData()
    }, [])

    const handleChange = (event) => {
        setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error } = await supabase
            .from('grow_id')
            .update({grow_name: formInfo.grow_name, 
                     nute_brand: formInfo.nute_brand, grow_light: formInfo.grow_light,
                     sprout_date: sproutDate, flower_date: flowerDate})
            .eq('id', growID)
        if (error){
            console.log(error);
        }
         refreshPage();
    }

    const refreshPage = ()=>{
        window.location.reload();
     }

     const getGrowData = async () => {
        const {data, error} = await supabase
            .from('grow_id')
            .select()
            .eq('id', growID)
            if (error){
                console.log(error)
            }
        setFormInfo({grow_name: data[0].grow_name, nute_brand: data[0].nute_brand, grow_light: data[0].grow_light})
     }

     const getFlowerDate = (event) => {
        event.preventDefault();
        setFlowerDate(event.target.value)
     }

     const getSproutDate = (event) => {
        event.preventDefault();
        setSproutDate(event.target.value)
     }

    return(
        <div className='edit-grow-form'>
            <div className='close-button' onClick={()=>toggleEditDiv("off")}>
                <img src={xsquare}></img>
            </div>
            <h3>{message}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="grow_name">
                <Form.Label>Name your grow!</Form.Label>
                <Form.Control type="text" name="grow_name" onChange={handleChange} value={formInfo.grow_name} placeholder="Start your new grow!" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="nute_brand">
                <Form.Label>Nutrient brand</Form.Label>
                <Form.Control type="text" name="nute_brand" value={formInfo.nute_brand} onChange={handleChange} placeholder="Nutrient brand will you be using" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="grow_light">
                <Form.Label>Grow Light</Form.Label>
                <Form.Control type="text" name="grow_light" value={formInfo.grow_light} onChange={handleChange} placeholder="Grow light will you be using" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="sprout_date">
                <Form.Label>Sprout Date:</Form.Label>
                <Form.Control type="date" name="sprout_date" onChange={getSproutDate}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="flower_date">
                <Form.Label>Flower Start Date:</Form.Label>
                <Form.Control type="date" name="flower_date" onChange={getFlowerDate}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Form>
        </div>
    )
}

export default EditGrowForm;