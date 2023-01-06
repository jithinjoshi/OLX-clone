
import React from 'react';

import Header from '../AdminComponents/Header/Header';
import UserList from '../AdminComponents/UserList/UserList';


function Home(props) {
  return (
    <div className="homeParentDiv">
      <Header />
      <div style={{paddingTop: "100px"}}></div>
    <UserList/>

    </div>
  );
}

export default Home;
 
