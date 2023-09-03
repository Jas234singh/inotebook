
import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout =() =>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  let location = useLocation();
  // useEffect(()=>{
  //   console.log(location.pathname);
  // },[location])
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/home" ? " active" : ""
                } `}
                aria-current="page"
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? " active" : ""
                } `}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
         {!localStorage.getItem('token')?<form className="d-flex">
            <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign-up</Link>
            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
          </form>:<button onClick ={handleLogout} className ="btn btn-primary">Logout</button>}
        </div>
      </div>
    </nav>
  );
}
export default Navbar