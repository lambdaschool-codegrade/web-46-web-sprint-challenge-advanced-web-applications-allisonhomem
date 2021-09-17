import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import axiosWithAuth from '../helpers/axiosWithAuth.js';

const Login = () => {
  const {push} = useHistory();

  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleChange = (event) => {
    setCredentials({
        ...credentials,
        [event.target.name]: event.target.value,
    })
}

  const clickLogin = (event) => {
    event.preventDefault();

    axiosWithAuth().post('/login', credentials)
                   .then(res => {
                       localStorage.setItem('token', res.data.payload);
                       push('/bubblepage');
                   })
                   .catch(err => {
                       if(err.response.status===403){setError('Username or Password not valid.');}
                       console.error('uh-oh, something went wrong', err)})
  }


console.log(localStorage);

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={clickLogin}>
          <label>Username:
            <input type='text'
                   id='username'
                   name='username'
                   value={credentials.username}
                   onChange={handleChange}
            />
          </label>

          <label>Password:
            <input type='text'
                   id='password'
                   name='password'
                   value={credentials.password}
                   onChange={handleChange}
            />
          </label>

          <button type='submit'
                  id='submit'>Log-in</button>
        </form>
      </div>

      {error && <p id="error" className="error">{error}</p>}
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"