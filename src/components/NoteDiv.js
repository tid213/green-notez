
function NoteDiv({note, getNoteID}){


    const getNoteType = () =>{
        return note.note_type;
    }

    const getNoteGrowName = () => {
      return note.grow_name;
    }

    const getNoteTime = () => {
        let event = new Date(note.created_at);
        let time = event.toJSON();
        let formatedTime = new Date(time).toDateString();
        return formatedTime;
    }


  if (getNoteType() === "Water Change"){
   return(
    <div className="noteTile" onClick={()=>getNoteID(note.id)}>
    <div className="noteTitle">
      <h5>{getNoteType()}</h5>
    </div>
    <div className="noteFooter">
      <p>{getNoteGrowName()}</p>
      <p>{getNoteTime()}</p>
    </div>
    <p fontSize="8px">measurements per 5ml</p>
    <div className="noteInfo">
        <div className='noteInfoR-L'>
          <p>Micro: {note.micro_nute}</p>
          <p>Grow: {note.grow_nute}</p>
          <p>Flower: {note.flower_nute}</p>
          <p>pH: {note.ph}</p>
          <p>Temp: {note.temperature}</p>
        </div>
        <div className='noteInfoR-L'>
          <p>CalMag: {note.calmag}</p>
          <p>Silica: {note.silica}</p>
          <p>PPM: {note.ppm}</p>
          <p>Humidity: {note.humidity}</p>
        </div>
    </div>
    <p>Note:</p>
    <div className="noteComment">
      <span>{note.user_comment}</span>
    </div>
    </div>
   )
  }
  if (getNoteType() === "Daily Check"){
    return(
        <div className="noteTile" onClick={()=>getNoteID(note.id)}>
        <div className="noteTitle">
          <h5>{getNoteType()}</h5>
        </div>
        <div className="noteFooter">
          <p>{getNoteGrowName()}</p>
          <p>{getNoteTime()}</p>
        </div>
        <div className="noteInfo">
            <div className='noteInfoR-L'>
              <p>pH: {note.ph}</p>
              <p>Temp: {note.temperature}</p>
            </div>
            <div className='noteInfoR-L'>
              <p>PPM: {note.ppm}</p>
              <p>Humidity: {note.humidity}</p>
            </div>
        </div>
        <p>Note:</p>
        <div className="noteComment">
          <span>{note.user_comment}</span>
        </div>
    </div>
    )
  }

  if (getNoteType() === "Problem Log"){
    return(
        <div className="noteTile" onClick={()=>getNoteID(note.id)}>
            <div className="noteTitle">
              <h5>{getNoteType()}</h5>
            </div>
            <div className="noteFooter">
              <p>{getNoteGrowName()}</p>
              <p>{getNoteTime()}</p>
            </div>
            <div className="noteInfo">
                <div className='noteInfoR-L'>
                  <p>pH: {note.ph}</p>
                  <p>Temp: {note.temperature}</p>
                </div>
                <div className='noteInfoR-L'>
                  <p>PPM: {note.ppm}</p>
                  <p>Humidity: {note.humidity}</p>
                </div>
            </div>
            <p>Note:</p>
            <div className="noteComment">
              <span>{note.user_comment}</span>
            </div>
        </div>
    )

  }
}

export default NoteDiv;