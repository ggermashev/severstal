import {Button, Form, Image} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import "./css/Notes.css"
import gsap from "gsap";
import FormCheckInput from "react-bootstrap/FormCheckInput";

export type Note = {
    id: number,
    text: string,
    date: string,
    done: boolean,
    important: boolean,
}

function setId() {
    let id = parseInt(localStorage.getItem("id") || "-1") + 1
    localStorage.setItem("id", id.toString())
    return id
}

function setNotesLocal(notes: Note[]) {
    localStorage.setItem("notes", JSON.stringify(notes))
}

function setTextById(id: number, text: string, notes: Note[]) {
    let res = [...notes]
    for (let n of res) {
        if (n.id == id) {
            n.text = text
        }
    }
    return res
}

function deleteById(id: number, notes: Note[]) {
    let copyNotes = [...notes]
    copyNotes = copyNotes.filter((note: Note) => {
        return note.id != id
    })
    return copyNotes
}

export function Notes() {
    const [notes, setNotes] = useState<Note[]>([])
    const [text, setText] = useState<string[]>([])
    let tl = gsap.timeline()
    useEffect(
        () => {
            if (!localStorage.getItem("first")) {
                localStorage.setItem("notes", JSON.stringify(
                    [{
                        "id": 0,
                        "text": 'Это базовая заметка. ' +
                            'Она появится только при первом открытии браузера' +
                            ' и провисит здесь до момента удаления. ' +
                            'Чтобы редактировать заметку нажмите на карандаш, ' +
                            'чтобы удалить заметку нажмите на крестик.',
                        "data": (new Date()).toString(),
                        "done": false,
                        "important": true,
                    }]))
                localStorage.setItem("first", "true")
                localStorage.setItem("id", "0")
            }
            setNotes(JSON.parse(localStorage.getItem("notes") || ""))
            setText(new Array(notes.length).fill(""))
        }, [])
    return (
        <div className="notes-block">
            <ul className="notes">
                {notes.map((n: Note, i) => {
                    return (
                        <li>
                            <p className="note-text">{n.text}</p>
                            <div className="note-row">
                                <p className="note-date">{n.date}</p>
                                <div className="note-done">
                                    <p>Выполнено</p>
                                    <FormCheckInput></FormCheckInput>
                                </div>
                                <div className="note-imp">
                                    <p>Важное</p>
                                    <FormCheckInput></FormCheckInput>
                                </div>
                            </div>
                            <Image onClick={e => {
                                tl.to(`.id${n.id}`, {
                                    duration: 0.2,
                                    opacity: 1,
                                })
                                let copyText = [...text]
                                copyText[i] = notes[i].text
                                setText(copyText)
                            }} className="change-img" src={require("../media/images/change.png")}/>
                            <Image onClick={e => {
                                e.preventDefault()
                                let copyNotes = deleteById(n.id, notes)
                                setNotes(copyNotes)
                                console.log(copyNotes)
                                setNotesLocal(copyNotes)
                            }} className="close-img" src={require("../media/images/close.png")}/>
                            <Form>
                                <Form.Group className={`edit-form id${n.id}`}>
                                    <Form.Control className="edit-input" type="text" value={text[i]} onChange={e => {
                                        let copyText = [...text]
                                        copyText[i] = e.target.value
                                        setText(copyText)
                                    }}/>
                                    <Button onClick={e => {
                                        e.preventDefault()
                                        let updated_notes = setTextById(n.id, text[i], notes)
                                        setNotes(updated_notes)
                                        setNotesLocal(notes)
                                        let copyText = [...text]
                                        copyText[i] = ""
                                        setText(copyText)
                                        tl.to(`.id${n.id}`, {
                                            opacity: 0
                                        })
                                    }} className="btn edit-btn" type="submit">Send</Button>
                                </Form.Group>
                            </Form>
                        </li>
                    )
                })}
            </ul>
            <Button onClick={e => {
                e.preventDefault()
                let copyNotes = [...notes]
                const date = new Date()
                copyNotes.push({
                    "id": setId(),
                    "text": "Новая заметка",
                    "date": `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
                    "done": false,
                    "important": false
                })
                let copyText = [...text]
                copyText.push("")
                setNotes(copyNotes)
                setText(copyText)
                setNotesLocal(copyNotes)
            }
            } className="btn note-btn">Добавить заметку</Button>
        </div>
    )
}