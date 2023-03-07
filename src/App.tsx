import React, {Fragment, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, FormText, Image} from "react-bootstrap";
import "./Components/css/App.css"
import {Notes} from "./Components/Notes";
import {Header} from "./Components/Header";
import {Filter} from "./Components/Filter";
import {Footer} from "./Components/Footer";


function App() {
    const [dirDate, setDirDate] = useState(0)
    const [dirDone, setDirDone] = useState(0)
    const [dirImp, setDirImp] = useState(0)
    const [search,setSearch] = useState("")
    return (
        <Fragment>
            <Header/>
            <Filter dirDate={dirDate} setDirDate={setDirDate} dirDone={dirDone} setDirDone={setDirDone}
                    dirImp={dirImp} setDirImp={setDirImp} search={search} setSearch={setSearch}/>
            <Notes dirDate={dirDate} dirImp={dirImp} dirDone={dirDone} search={search}/>
            <Footer/>
        </Fragment>
    );
}

export default App;
