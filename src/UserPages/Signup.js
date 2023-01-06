import React from 'react';
import UContext from '../store/UserContext';

import Signup from '../UserComponents/Signup/Signup';

function SignupPage() {
  return (
    <div>
      <UContext>
      <Signup />
      </UContext>
      <h1 style={{textAlign:'center'}}>Signup</h1>
    </div>
  );
}

export default SignupPage;
