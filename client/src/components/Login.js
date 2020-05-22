import React, { useState } from "react";
import { useHistory } from 'react-router'; 

import { axiosWithAuth } from '../utils/axiosWithAuth.js'


const initialFormValues={
  username: '',
  password: '',
}

const Login =(props) => {
  const [formValues, setFormValues]=useState(initialFormValues)
  
  const match = useHistory();
  console.log(match)

  function validateForm() {
    return formValues.username.length > 0 && formValues.password.length > 0;
  }

   function onSubmit(event) {
    event.preventDefault();
    console.log(formValues)
    //.POST to login endpoint and then go on to jokes route
    axiosWithAuth()
    .post("/auth/login", formValues)
    .then(res =>{
        localStorage.setItem('token', JSON.stringify(res.data.token));
        match.push(`/jokes`)
    })
    .catch(err =>{
      console.log(err)
    })
  }
  const changeHandler = function(event){
    const name = event.target.name
    const value= event.target.value
    setFormValues({
        ...formValues,
        [name]: value,
    })
  }
  
  return (
    <div style={{width: '100%'}}>
      <form onSubmit={onSubmit}>
          <label>Username
            <input
              type="text"
              name="username"
              value={formValues.username}
              onChange={changeHandler}
            />
          </label>
          <br />
          <label>Password
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={changeHandler}
            />
          </label>
          <br />
        <button disabled={!validateForm()} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;