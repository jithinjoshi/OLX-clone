import React, { Fragment } from 'react';
import Header from '../UserComponents/Header/Header';
import Profile from '../UserComponents/Profile/Profile';


const ProfilePage = () => {
  return (
    <Fragment>
      <Header />
      <Profile/>
    </Fragment>
  );
};

export default ProfilePage;