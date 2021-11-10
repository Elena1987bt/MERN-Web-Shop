import React, { useState } from 'react';
import { login } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';

import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  // const { isFetching } = useSelector((state) => state.user.isFetching);
  const user = useSelector((state) => state.user.currentUser);
  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };

  return (
    <div className="login">
      <form className="loginForm">
        <p className="err">
          {user && !user.isAdmin && 'You are not an admin!'}
        </p>
        <h1>Login to your dashboard</h1>
        <p>Email: admin@email.com</p>
        <p>Password: test1234</p>
        <input
          type="text"
          placeholder="email"
          className="loginInput"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="loginButton"
          onClick={handleLogin}
          // disabled={isFetching}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
