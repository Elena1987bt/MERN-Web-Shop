import React, { useState, useEffect } from 'react';
import { login } from '../../redux/apiCalls';
import { loginFailure } from '../../redux/userRedux';
import { useDispatch, useSelector } from 'react-redux';

import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emptyFields, setEmptyFields] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setEmptyFields(true);
      return;
    }
    login(dispatch, { email, password });
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setEmptyFields(false);
      dispatch(loginFailure({ err: false, message: '' }));
    }, 3000);
    return () => clearTimeout(timeout);
  }, [emptyFields, dispatch]);

  return (
    <div className="login">
      <form className="loginForm">
        <p className="err">
          {user && !user.isAdmin && 'You are not an admin!'}
        </p>
        {emptyFields && <p className="err">Please fill all the fields!</p>}

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
