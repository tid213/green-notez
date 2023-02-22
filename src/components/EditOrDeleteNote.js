import xsquare from '../images/x-square.svg';
import { supabase } from '../supabaseClient';
import { useState } from 'react';
import React, { useEffect } from 'react';
import trash from '../images/trash-2.svg';
import edit from '../images/edit.svg';
import EditNote from './EditNote';
import DeleteWarning from './DeleteWarning';

function EditOrDeleteNote({toggleOnOrOff, noteID}) {

    const [noteData, setNoteData] = useState();
    const [growName, setGrowName] = useState();
    const [noteDate, setNoteDate] = useState();
    const [noteType, setNoteType] = useState();
    const [editOrDelete, setEditOrDelete] = useState("off");

    useEffect(() => {
        getNoteInfo()
    }, [])

    const getNoteInfo = async () => {
        const { data, error } = await supabase
          .from('grow_notes')
          .select()
          .eq('id', noteID)
          if (error){
            console.log(error)
          }
          setNoteData(data)
          setGrowName(data[0].grow_name)
          setNoteDate(data[0].created_at)
          setNoteType(data[0].note_type)

    }

    const getNoteTime = () => {
        let event = new Date(noteDate);
        let time = event.toJSON();
        let formatedTime = new Date(time).toDateString();
        return formatedTime;
    }

    const deleteClick = (event) => {
        event.preventDefault();
        setEditOrDelete("delete")
    } 

    const editClick = (event) => {
        event.preventDefault();
        setEditOrDelete("edit")
    }

    const deleteNote = async () => {
      const { error } = await supabase
          .from('grow_notes')
          .delete()
          .eq('id', noteID)

          if(error){
            console.log(error)
          }
    }

    const toggleDeleteDiv = (onOrOff) => {
      if (onOrOff === "off"){
        setEditOrDelete("off")
      }
    }

    const deleteConfirmation = (yesOrNo) => {
      if (yesOrNo === "yes"){
          deleteNote();
      }
  }

    const loadEditOrDelete = () => {
        if (editOrDelete === "off"){
            return(
                <div className='grow-manage-buttons'>
                  <div className='delete-button' onClick={deleteClick}>
                    <p>Delete</p>
                    <img src={trash}></img>
                  </div>
                  <div className='edit-button' onClick={editClick}>
                    <p>Edit</p>
                    <img src={edit}></img>
                  </div>
                </div>
            )
        }
        if (editOrDelete === "edit"){
            return(<EditNote noteID={noteID} />)
        }
        if (editOrDelete === "delete"){
            return(<DeleteWarning growOrNote={"note"} toggleDeleteDiv={toggleDeleteDiv} deleteConfirmation={deleteConfirmation} />)
        }
    }

    const changeTitle = () => {
        if (editOrDelete === "off"){
            return(<p>{noteType} note for {growName}</p>)
        } else if (editOrDelete === "edit"){
            return(<p>Editing {noteType} note for {growName}</p>)
        } else if (editOrDelete === "delete"){
          return(<p>Delete {noteType} note for {growName}</p>)
        }
    }

    return(
        <div className='edit-note-form'>
            <div className='close-button'>
              <img src={xsquare} onClick={() => toggleOnOrOff("off")}></img>
            </div>
            <div className='edit-note-info'>
              {changeTitle()}
              <p>Created on: {getNoteTime()}</p>
              <div>
                {loadEditOrDelete()}
              </div>
            </div>

        </div>
    )
}

export default EditOrDeleteNote;