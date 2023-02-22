import { useState } from 'react';


function DeleteWarning({deleteConfirmation, toggleDeleteDiv, growOrNote}) {


    const handleClick = (event) => {
        event.preventDefault();
        deleteConfirmation("yes");
        window.location.reload();
    }

    const handleRedirect = (event) => {
        event.preventDefault();
        toggleDeleteDiv("off");
    }


    return(
        <div className="delete-warning">
            <h5>Are you sure you want to delete this {growOrNote}?</h5>
            <p> Changes cannot be undone!</p>
            <div className ='warning-buttons'>
                <div className="yes-button" >
                  <p onClick={handleClick}>Yes</p>
                </div>
                <div className="no-button" onClick={handleRedirect}>
                  <p>No</p>
                </div>
            </div>
        </div>
    )
}

export default DeleteWarning;