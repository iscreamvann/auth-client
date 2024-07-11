import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import Input from './components/Input';

export default function App() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [registerResponse, setRegisterResponse] = useState('');
  const [loginResponse, setLoginResponse] = useState('');

  const register = async (e) => {
    e.preventDefault();
    try{
    // Write your register code here
    console.log("register", user)
    const response = await fetch("http://localhost:4000/register", {body: JSON.stringify(user), headers: {
      "content-type": "application/json"
    }, method: "POST"})
    const jsonResponse = await response.json()

    console.log("response", jsonResponse)
    alert("User registered")
    setRegisterResponse(JSON.stringify(jsonResponse))
  }
  catch(er){
    console.error(er)
    alert("error with registration")
  }
  };

  const login = async (e) => {
    e.preventDefault();
    // Write your login code here
    try{
      // Write your register code here
      console.log("register", user)
      const response = await fetch("http://localhost:4000/login", {body: JSON.stringify(user), headers: {
        "content-type": "application/json"
      }, method: "POST"})
      console.log("response", response)
      const jsonResponse = await response.json()
  
      console.log("response", jsonResponse)

      alert("User registered")
      setLoginResponse(JSON.stringify(jsonResponse))
      localStorage.setItem("jwt", jsonResponse.jwt)

    }
    catch(er){
      console.error(er)
      alert("error with registration")
    }

  };

  // You can safely ignore everything below this line, it's just boilerplate
  // so you can focus on the exercise requirements

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUser({
      ...user,
      [name]: value
    });
  }

  return (
    <div className="App">

      <h1>Register</h1>

      <Form
        handleSubmit={register}
        inputs={[
          <Input
            key={1}
            type='text'
            name='username'
            placeholder='Username'
            value={user.username}
            handleChange={handleChange}
          />,
          <Input
            key={2}
            type='password'
            name='password'
            placeholder='Password'
            value={user.password}
            handleChange={handleChange}
          />
        ]}
      />

      {registerResponse && <p>{registerResponse}</p>}

      <h1>Login</h1>

      <Form
        handleSubmit={login}
        inputs={[
          <Input
            key={1}
            type='text'
            name='username'
            placeholder='Username'
            value={user.username}
            handleChange={handleChange}
          />,
          <Input
            key={2}
            type='password'
            name='password'
            placeholder='Password'
            value={user.password}
            handleChange={handleChange}
          />
        ]}
      />

      {loginResponse && <p>{loginResponse}</p>}

    </div>
  );
}
