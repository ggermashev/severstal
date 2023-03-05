import React, {Fragment, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, FormText, Image} from "react-bootstrap";
import "./Components/css/App.css"

function App() {
    const [notes, setNotes] = useState<{id: number, text: string}[]>([])
    useEffect(
        () => {
            if (!localStorage.getItem("first")) {
                localStorage.setItem("notes", JSON.stringify(
                    [{"id":0, "text": 'Это базовая заметка. ' +
                            'Она появится только при первом открытии браузера' +
                            ' и провисит здесь до момента удаления. ' +
                            'Чтобы редактировать заметку нажмите на карандаш, ' +
                            'чтобы удалить заметку нажмите на крестик.'}]))
                localStorage.setItem("first", "true")
            }
            setNotes(JSON.parse(localStorage.getItem("notes") || ""))
        }, [])

    return (
        <Fragment>
            <div className="header-block">
                <h1 className="title">Заметки для "Северсталь" :)</h1>
                <Button className="btn info-btn">Как это работает?</Button>
            </div>
            <div className="filter-block">
                <h3 className="title">Сортировать по:</h3>
                <ul className="filters">
                    <li><Button className="btn">Дата</Button></li>
                    <li><Button className="btn">Выполненные</Button></li>
                    <li><Button className="btn">Важные</Button></li>
                </ul>
            </div>
            <div className="notes-block">
                <ul className="notes">
                    {notes.map((n: {id: number, text: string}) => {
                        return (
                            <li>
                                <p className="note-text">{n.text}</p>
                                <Image className="change-img" src={require("./media/images/change.png")}/>
                                <Image className="close-img" src={require("./media/images/close.png")}/>
                                <Form>
                                    <Form.Group className="edit-form">
                                        <Form.Control className="edit-input" type="text"/>
                                        <Button className="btn edit-btn" type="submit">Send</Button>
                                    </Form.Group>
                                </Form>
                            </li>
                        )
                    })}
                </ul>
                <Button className="btn note-btn">Добавить заметку</Button>
            </div>
        </Fragment>
    );
}

export default App;
