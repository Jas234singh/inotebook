import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = (props) => {


  const [credentials, setCredentials] = useState({ name:"",email: "", password: "",cpassword:"" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
const  {name,email,password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
     
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      //save the auth token and redirect
      localStorage.setItem("token", json.jwtsign);
      navigate("/");
       props.showAlert("Account created successfully", "success");
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
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            // eslint-disable-next-line no-undef
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            // eslint-disable-next-line no-undef
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            // eslint-disable-next-line no-undef
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            // eslint-disable-next-line no-undef
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup