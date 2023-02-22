import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import WaterChangeForm from './WaterChangeForm';
import DailyCheck from './DailyCheck';
import Problem from './Problem';
import xsquare from '../images/x-square.svg';

function AddNote({session, growName, addNoteClose}){

    const [noteType, setNoteType] = useState("Select");

    const noteChoice = () =>{
        if (noteType === "Water Change"){
            return <WaterChangeForm session={session} growName={growName} />
        } else if (noteType === "Daily Check"){
            return <DailyCheck session={session} growName={growName} />
        } else if (noteType === "Problem"){
            return <Problem session={session} growName={growName} />
        }
    }


    const addNotetitle = () => {
        if (noteType === "Select"){
            return("Choose Note Type")
        }else{
            return("Add " + noteType + " Note")
        }
    }

    return (
        <div className='noteDiv'>
            <div className='close-button'>
              <img src={xsquare} onClick={() => addNoteClose("off")}></img>
            </div>
            <div className='note-dropdown'>
            <h5>{addNotetitle()}</h5>
            <p>For {growName}</p>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                {noteType}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item onClick={() => setNoteType("Water Change")} key={1}>Water Change</Dropdown.Item>
                <Dropdown.Item onClick={() => setNoteType("Daily Check")} key={2}>Daily Check-in</Dropdown.Item>
                <Dropdown.Item onClick={() => setNoteType("Problem")} key={3}>Problem</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </div>
            {noteChoice()}

        </div>
      );
}

export default AddNote;