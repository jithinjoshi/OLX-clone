import React from 'react';
import UContext from '../store/UserContext';
import Login from '../UserComponents/Login/Login';

function LoginPage() {
  return (
    <div>
      <UContext>
      <Login />
      </UContext>
      <h1 style={{textAlign:'center'}}>Login</h1>
    </div>
  );
}

export default LoginPage;
