import plus from '../images/plus.svg';
import share from '../images/share.svg'; 
import React, { useEffect } from 'react';
import { useState } from 'react';
import GrowCardGenerate from './GrowCardGenerate';

function GrowTile({growID, selected, growName, growNotes, session, noteFeedTitle, changeNoteFeedTitle}){

    const [growTitle, setGrowTitle] = useState("");
    const [shareGrow, setShareGrow] = useState("off");
    const [growSelected, setGrowSelected] = useState("off");
    const [feedTitle, setFeedTitle] = useState("");

    useEffect(() => {
        setGrowTitle(growName)
        changeSelection()
    }, [selected]);


    const shareClickHandle = (event) => {
        event.preventDefault();
        setShareGrow("on");
    }

    const showGrowCard = () => {
        if (shareGrow === "on"){
            return(<GrowCardGenerate growID={growID} session={session} growCardClose={growCardClose} />)

        }
    }

    const growCardClose = (onOrOff) =>{
        if(onOrOff === "off"){
            setShareGrow("off")
        }
    }

    const selectClick = (event) => {
        event.preventDefault();
        changeNoteFeedTitle(growTitle);
    }

    const changeSelection = () => {
        if (selected === "on"){
            setGrowSelected("on")
        } else{
            setGrowSelected("off")
        }
    }


    if (growSelected === "off"){
        return(
            <div>
                <div className="growTiles">
                <div className='growInfo' onClick={selectClick} onChange={changeSelection}>
                  <p>{growName}</p>
                  <p>Notes: {growNotes}</p>
                </div>
                <div className='grow-tile-share'>
                  <img onClick={shareClickHandle} src={share}></img>
                </div>
                </div>
                {showGrowCard()}
            </div>
        )
    }

    else if (growSelected === "on"){
        return(
            <div>
                <div className="growTiles-selected">
                <div className='growInfo' onClick={selectClick}>
                  <p>{growName}</p>
                  <p>Notes: {growNotes}</p>
                </div>
                <div className='grow-tile-share'>
                  <img onClick={shareClickHandle} src={share}></img>
                </div>
                </div>
                {showGrowCard()}
            </div>
        )
    }
    
    
}

export default GrowTile;