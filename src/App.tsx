import React, {Fragment, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, FormText, Image} from "react-bootstrap";
import "./Components/css/App.css"
import {Notes} from "./Components/Notes";
import {Header} from "./Components/Header";
import {Filter} from "./Components/Filter";


function App() {
    return (
        <Fragment>
            <Header/>
            <Filter/>
            <Notes/>
        </Fragment>
    );
}

export default App;
