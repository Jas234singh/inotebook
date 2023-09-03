import React, { useContext, useEffect, useRef, useState } from "react";
import {useNavigate} from 'react-router-dom';
import noteContext from "../Context/notes/noteContext";
import Notesitem from "./Notesitem";
import AddNoteitem from "./AddNoteitem";

const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
  getNotes();
    }else{
navigate('/login');
    }
  
    //eslint-disable-next-line
  }, []);
  
  const ref = useRef(null)
   const refClose = useRef(null)
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "" });
    const handleClick = (e) => {
      console.log("updating the notes");
      refClose.current.click();
      editNote(note.id,note.etitle,note.edescription,note.etag);
      e.preventDefault();
      props.showAlert("updated data successfully", "success");
      
    };
    const onChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value });
    };


const updateNote = (currentNote) => {
  ref.current.click();
 
  setNote({id:currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  
}
  return (
    <>
      <AddNoteitem  showAlert ={props.showAlert}/>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit Mode
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className ="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    minLength ={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    minLength ={5}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
               
              </form>
            </div>
            <div className="modal-footer">
              <button ref ={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick ={handleClick}type="button" className="btn btn-primary">
                update note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className ="container mx-2">
          {notes.length ===0 && 'no notes to display'}
        </div>
        {Array.from(notes).map((note) => {
          return (
            <Notesitem Key={note._id} updateNote={updateNote} showAlert ={props.showAlert} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
 