import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';


function EditWaterChange({noteID}) {

    const [formInfo, setFormInfo] = useState({calmag: "", silica: "", micro_nute: "",
                                    grow_nute: "", flower_nute: "", ph: "", ppm: "", 
                                    user_comment: ""});
    useEffect(() => {
        getNoteData();
    }, [])

    const handleChange = (event) => {
        setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error } = await supabase
            .from("grow_notes")
            .update({ 
                     calmag: formInfo.calmag, silica: formInfo.silica, micro_nute: formInfo.micro_nute,
                     grow_nute: formInfo.grow_nute, flower_nute: formInfo.flower_nute, ph: formInfo.ph,
                     ppm: formInfo.ppm, user_comment: formInfo.user_comment})
            .eq('id', noteID)
        if (error){
            console.log(error)
        }  refreshPage();
    }

    const getNoteData = async () => {
        const {data, error} = await supabase
            .from("grow_notes")
            .select()
            .eq("id", noteID)

            if(error){
                console.log(error)
            }
            setFormInfo({calmag: data[0].calmag, silica: data[0].silica, micro_nute: data[0].micro_nute,
                        grow_nute: data[0].grow_nute, flower_nute: data[0].flower_nute,
                        ph: data[0].ph, ppm: data[0].ppm, user_comment: data[0].user_comment})
      }

    const refreshPage = ()=>{
      window.location.reload();
   }

    return(
        <div className='add-note-form'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="calmag">
                  <Form.Label>CalMag</Form.Label>
                  <Form.Control type="text" name="calmag" onChange={handleChange} value={formInfo.calmag} placeholder="per 1/2 tsp" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="silica">
                  <Form.Label>Silica</Form.Label>
                  <Form.Control type="text" name="silica" onChange={handleChange} value={formInfo.silica} placeholder="per 1/2 tsp" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="micro">
                  <Form.Label>Micro Nutrients</Form.Label>
                  <Form.Control type="text" name="micro_nute" onChange={handleChange} value={formInfo.micro_nute} placeholder="per 1/2 tsp" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="grow">
                  <Form.Label>Grow Nutrients</Form.Label>
                  <Form.Control type="text" name="grow_nute" onChange={handleChange} value={formInfo.grow_nute} placeholder="per 1/2 tsp" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="flower">
                  <Form.Label>Flower Nutrients</Form.Label>
                  <Form.Control type="text" name="flower_nute" onChange={handleChange} value={formInfo.flower_nute} placeholder="per 1/2 tsp" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="ph">
                  <Form.Label>pH</Form.Label>
                  <Form.Control type="text" name="ph" onChange={handleChange} value={formInfo.ph} placeholder="test pH" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="ppm">
                  <Form.Label>PPM</Form.Label>
                  <Form.Control type="text" name="ppm" onChange={handleChange} value={formInfo.ppm} placeholder="test PPM" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Add comment</Form.Label>
                <Form.Control as="textarea" rows={3} name="user_comment" onChange={handleChange} value={formInfo.user_comment}  />
                </Form.Group>
                <Button variant="success" type="submit">
                Submit
                </Button>
            </Form>
        </div>
    )
}

export default EditWaterChange;