import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';


import LoginForm from '../components/Login/LoginForm';

import Logo from '../../files/logo.svg';

const LoginPage = (props) => {

  const { isLoggedIn } = useSelector(state => state.users);

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
		<div className="container">
      <div className="row">
        <div className="col-12 d-flex align-items-center">
          <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px'}}/>
          <h1 className="mt-4">
             Blog Example
          </h1>
        </div>
      </div>
      <hr />
      <div className="row justify-content-center">
        <div className="col-12 col-md-4">
          <h3>Login form</h3>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
