import {Button} from "react-bootstrap";
import React from "react";
import "./css/Header.css"

export function Header() {
    return (
        <div className="header-block">
            <h1 className="title">Заметки для "Северсталь" :)</h1>
            <Button className="btn info-btn">Как это работает?</Button>
        </div>
    )
}