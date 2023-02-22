import AddNote from "./AddNote";
import { useState } from 'react';

function NoteAddOrShowFeed ({title, addNoteClose}) {


    const [toggleAddNote, setToggleAddNote] = useState("off");


    const handleClick = (event) => {
        event.preventDefault();
        if (toggleAddNote === "off"){
            setToggleAddNote("on")
            addNoteClose("on")
        }
    }

    if (title === "Recent Notes"){
        return (
            <div className="note-feed">
                <p>{title}</p>
            </div>
        )
    } else {
        return(
            <div>
              <div className="note-feed">
                <h5>{title}</h5>
                <p>Started On:</p>
                <div className="add-note-button" onClick={handleClick}>
                  <p>Add Note</p>
                </div>
              </div>
              
            </div>
        )
    }
        

}

export default NoteAddOrShowFeed;