import React, { useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useState } from 'react';
import DeleteWarning from './DeleteWarning';
import EditGrowForm from './EditGrowForm';
import trash from '../images/trash-2.svg';
import edit from '../images/edit.svg';
import { useNavigate } from 'react-router-dom';
import xsquare from '../images/x-square.svg';
import html2canvas from 'html2canvas';



function EditOrDeleteGrow({session, growID, closeGrowOptions}){
    const printRef = React.useRef();
    const navigate = useNavigate();
    const [growList, setGrowList] = useState({});
    const [deleteOrEdit, setDeleteOrEdit] = useState("off");
    const [growName, setGrowName] = useState("");

    useEffect(()=> {
        getGrowList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getGrowList = async ()=>{
        const { data, error } = await supabase
            .from('grow_id')
            .select(`id, user_id, grow_name`)
            .eq('user_id', session.user.id)

        if (error){
            console.log(error);
        }
        if (data){
            setGrowList(data);
            getGrowName();
        }

    }

    const getGrowName = async () => {
        const {data, error} = await supabase
          .from('grow_id')
          .select()
          .eq('id', growID)

          if (error){
            console.log(error)
          }
          setGrowName(data[0].grow_name);
    }


    console.log(growList);

    const deleteGrow = async () => {
        const { error } = await supabase
          .from('grow_id')
          .delete()
          .eq('id', growID)

          if(error){
            console.log(error)
          }
    }

    const deleteConfirmation = (yesOrNo) => {
        if (yesOrNo === "yes"){
            deleteGrow();
        }
    }

    const deleteClick = (event) => {
        event.preventDefault();
        setDeleteOrEdit("delete")
    }

    const editClick = (event) => {
        event.preventDefault();
        setDeleteOrEdit("edit");
    }

    const showDeleteOrEdit = () => {
        if (deleteOrEdit === "off"){
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
        if (deleteOrEdit === "delete"){
            return (<DeleteWarning growOrNote={"grow"} toggleDeleteDiv={toggleDeleteDiv} deleteConfirmation={deleteConfirmation} />)
        } else if (deleteOrEdit === "edit"){
            return (<EditGrowForm toggleEditDiv={toggleEditDiv} growID={growID}/>)
        }
    }

    const toggleDeleteDiv = (onOrOff) => {
        if (onOrOff === "off"){
            setDeleteOrEdit("off");
        }
    }

    const toggleEditDiv = (onOrOff) => {
        if (onOrOff === "off"){
            setDeleteOrEdit("off");
        }
    }


    const handleDownloadImage = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element);
    
        const data = canvas.toDataURL('image/jpg');
        const link = document.createElement('a');
    
        if (typeof link.download === 'string') {
          link.href = data;
          link.download = 'image.jpg';
    
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          window.open(data);
        }
      };



    return(
        <div className='grow-manage-options' ref={printRef}>
            <div className='close-button'>
              <img src={xsquare} onClick={() => closeGrowOptions("off")}></img>
            </div>
            <h5>What would you like to do with {growName}?</h5>
            <div>
            {showDeleteOrEdit()}
            </div>
        </div>
    )
}

export default EditOrDeleteGrow;