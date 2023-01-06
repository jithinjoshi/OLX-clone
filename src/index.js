import React from 'react';
import ReactDOM from 'react-dom';
import UserApp from './UserApp';
//import {BrowserRouter} from 'react-router-dom';
//import { FirebaseContext } from './store/Context';
//import { app } from './firebase/Config';
import UContext from './store/UserContext'
import Post from './store/PostContext';
import AdminApp from './AdminApp';
import AContext from './store/AdminContext';
import './App.css'

ReactDOM.render(


    <>
    <UContext>
        <Post>
            <UserApp />
        </Post>
    </UContext>

    <AContext>
    <AdminApp/>
    </AContext>
    </>
    ,

    document.getElementById('root'));
