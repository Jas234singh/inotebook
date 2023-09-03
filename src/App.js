
import './App.css';

import Navbar from './Components/Navbar';

import Home from './Components/Home';
import About from './Components/About';
import Alert from './Components/Alert';
import Signup from './Components/Signup';
import Login from "./Components/Login";
import Notestate from './Context/notes/Notestate';
import {useState} from 'react';
import {
  BrowserRouter as
  Router,
  Routes,
  Route,
  
  
} from "react-router-dom";

function App() {
  const [alert,setAlert] =useState(null);
  const showAlert =(message,type) =>{
    setAlert({
      msg:message,
      type:type,
    })
    setTimeout(()=>{
setAlert(null);
    },1500)
  }
  return (
    <>
      <Notestate>
        <Router>
          <Navbar />
          <Alert alert ={alert} />

          <div className="container">
            <Routes>
              <Route
                exact
                path="/home"
                element={<Home showAlert={showAlert} />}
              />
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
            </Routes>
          </div>
        </Router>
      </Notestate>
    </>
  );
}



export default App;
