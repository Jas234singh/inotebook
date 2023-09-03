import React from 'react';

import Notes from './Notes';
// import AddNoteitem from './AddNoteitem';

const Home = (props) => {
  const {showAlert}=props;
  return (
    <>
      <div className="container">
        <h1>Add Notes</h1>
        <Notes showAlert={showAlert} />
      </div>
    </>
  );
}

export default Home