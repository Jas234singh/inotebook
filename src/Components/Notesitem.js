import React from 'react'
import noteContext from'../Context/notes/noteContext';
import {useContext} from 'react';


const Notesitem = (props)  =>{
  const  context = useContext(noteContext);
  const {deleteNote} = context;
    const {note,updateNote} =props;
   
    
  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <div className="d-flex justify-content-center">
              <h5 className="card-title">{note.title}</h5>{" "}
              <i
                className="fa-solid fa-trash mx-4"
                onClick={() => {
                  deleteNote(note._id);props.showAlert("deleted data successfully","success");
                }}
              ></i>
              <i
                className="fa-solid fa-pen-to-square fa-bounce mx-2"
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
            </div>

            <p className="card-text">{note.description}</p>
            {/* <a href ="/" classNameName="btn btn-primary">Go somewhere</a> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notesitem
