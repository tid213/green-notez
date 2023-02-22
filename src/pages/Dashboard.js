import React, { useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useState } from 'react';
import UserNav from '../components/UserNav';
import GrowTile from '../components/GrowTile';
import DashboardNoteDisplay from '../components/DashboardNoteDisplay';
import NoteAddOrShowFeed from '../components/NoteAddOrShowFeed';
import CreateGrow from '../components/CreateGrow';
import AddNote from '../components/AddNote';
import sprout from '../images/sprout2.png';
import check from '../images/check.png';
import flower from '../images/flower.png';

function Dashboard({session}) {

    
    const [growList, setGrowList] = useState({});
    const [userNote, setUserNote]= useState({});
    const [userName, setUserName] = useState("");
    const [noteFeedTitle, setNoteFeedTitle] = useState("Recent Notes");
    const [growForm, setGrowForm] = useState("off"); 
    const [addNote, setAddNote] = useState("off");

    useEffect(()=> {
        getGrowList();
        growDivs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noteFeedTitle])

    const getUserName = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select()
            .eq('id', session.user.id)
        
        if (error){
            console.log(error)
        } 
        setUserName(data[0].username)
    }

    const getGrowList = async ()=>{
        const { data, error } = await supabase
            .from('grow_id')
            .select()
            .eq('user_id', session.user.id)

        if (error){
            console.log(error);
        }
        if (data){
            setGrowList(data);
            getUserNotes();
            getUserName();
        }

    }

    const getUserNotes = async () => {
        const { data, error } = await supabase
            .from('grow_notes')
            .select()
            .eq('user_id', session.user.id)
        if (error){
            console.log(error)
        } 
        if (data){
            setUserNote(data)
        }
    }

    const sortUserNotes = (growName) => {
        let notesForGrow = [];
        let noteCount = 0;
        for (let i=0; i<userNote.length; i++){
            if(userNote[i].grow_name === growName){
                notesForGrow.push(userNote[i].id);
                noteCount = noteCount + 1;
            }
        }
        return noteCount;
    }

    const growDivs = () => {
        const list = [];
        for (let i=0; i< growList.length; i++){
            let growName = growList[i].grow_name;
            let key = growList[i].id;
            if (growName === noteFeedTitle){
                list.push(<GrowTile selected="on" growID={key} noteFeedTitle={noteFeedTitle} changeNoteFeedTitle={changeNoteFeedTitle} key={key} session={session} growName={growName} growNotes={sortUserNotes(growName)}/>)
            }else{
                list.push(<GrowTile selected="off" growID={key} noteFeedTitle={noteFeedTitle} changeNoteFeedTitle={changeNoteFeedTitle} key={key} session={session} growName={growName} growNotes={sortUserNotes(growName)}/>)
            }
            
        }
        return list;
    }
 
    const changeNoteFeedTitle = (title) => {
        setNoteFeedTitle(title);
    }

    const addGrowForm = () => {
        
        if (growForm === "off"){
            return (<p onClick={toggleGrowForm}>Start Grow</p>)
        } else{
            return(<CreateGrow createGrowCloseButton={createGrowCloseButton} session={session} />)
        }
    }

    const toggleGrowForm = (event) => {
        event.preventDefault();
        if (growForm === "off"){
            setGrowForm("on")
        } else{
            setGrowForm("off")
        }
    }

    const createGrowCloseButton = (onOrOff) => {
        if (onOrOff === "on"){
            setGrowForm("off")
        }
    }

    const loadNoteHeader = () => {
        if (addNote === "off"){
            if (noteFeedTitle === "Recent Notes"){
                return (<div>
                    <p>{noteFeedTitle}</p>
                </div>)
            }else{
                return(
                    <div>
                        <h5>{noteFeedTitle}</h5>
                        <div className='grow-period-options'>
                            <img src={sprout}></img>
                            <img src={flower}></img>
                            <img src={check}></img>
                        </div>
                        <div className="add-note-button" onClick={toggleAddNote}>
                          <p>Add Note</p>
                        </div>
                    </div>
                    )
            }
        }
    }

    const loadAddNote = () => {
        if (addNote === "on"){
            return(<AddNote session={session} growName={noteFeedTitle} addNoteClose={addNoteClose} />)
        }
    }

    const addNoteClose = (onOrOff) => {
        if (onOrOff === "off"){
            setAddNote("off")
        } else if (onOrOff ==="on") {
            setAddNote("on")
        }

    }

    const toggleAddNote = (event) => {
        event.preventDefault();
        if (addNote ==="off"){
            setAddNote("on")
        }
    }


    return(
        <div>
            <UserNav username={userName} />
            <div className='tileLayout'>
                {loadAddNote()}
                <div className='note-tiles'>
                  <div className='add-note-load'>
                    {loadNoteHeader()}
                  </div>
                  <DashboardNoteDisplay session={session} growName={noteFeedTitle} />
                </div>
                <div className='grow-tiles'>
                    <div className='add-grow-button'>
                        {addGrowForm()}
                    </div>
                  {growDivs()}
                </div>
            </div>
            <div className='footer'>
                <p>Green Notes. 2022</p>
            </div>
        </div>
    )
}

export default Dashboard;