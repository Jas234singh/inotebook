import React from 'react'
import {useState,} from 'react';
import {useNavigate} from 'react-router-dom';
const Login = (props) => {
  const [credentials,setCredentials] =useState({email:"",password:""});
  let navigate = useNavigate();
    const handleSubmit = async(e) =>{
e.preventDefault();

const response = await fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },

  body: JSON.stringify({
    email: credentials.email,
    password: credentials.password,
  }),
});
  const json = await response.json();
  console.log(json);
 
//save the auth token and redirect

 



if(json.success){
      //save the auth token and redirect
      localStorage.setItem("token", json.jwtsign);
      navigate("/");
       props.showAlert("Logged in successfully", "success");
    }else{
      props.showAlert("invalid credentials","error")
    }
  }
   













 const onChange = (e) => {
   setCredentials({ ...credentials, [e.target.name]: e.target.value });
 };


    
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlfor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            // eslint-disable-next-line no-undef
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlfor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={credentials.password}
            name="password"
            // eslint-disable-next-line no-undef
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login