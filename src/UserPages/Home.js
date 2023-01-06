import React from 'react';

import Header from '../UserComponents/Header/Header';
import Banner from '../UserComponents/Banner/Banner';

import Posts from '../UserComponents/Posts/Posts';
import Footer from '../UserComponents/Footer/Footer';
import UContext from '../store/UserContext';

function Home(props) {
 
  return (
    <div className="homeParentDiv">

      <UContext>
      <Header />
      <Banner />
      <Posts />
      <Footer />
      </UContext>
    </div>
  );
}

export default Home;
 
