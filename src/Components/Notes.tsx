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

export function Notes(props: { dirDate: number, dirDone: number, dirImp: number, search: string}) {
    const [notes, setNotes] = useState<Note[]>([])
    const [text, setText] = useState<string[]>([])
    let tl = gsap.timeline()
    useEffect(
        () => {
            if (!localStorage.getItem("first")) {
                const date = new Date()
                localStorage.setItem("notes", JSON.stringify(
                    [{
                        "id": 0,
                        "text": 'Это базовая заметка. ' +
                            'Она появится только при первом открытии браузера' +
                            ' и провисит здесь до момента удаления. ' +
                            'Чтобы редактировать заметку нажмите на карандаш, ' +
                            'чтобы удалить заметку нажмите на крестик.',
                        "date": `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
                        "done": false,
                        "important": true,
                    }]))
                localStorage.setItem("first", "true")
                localStorage.setItem("id", "0")
            }
            setNotes(JSON.parse(localStorage.getItem("notes") || ""))
            setText(new Array(notes.length).fill(""))
        }, [])

    useEffect(
        () => {
            let copyNotes = JSON.parse(localStorage.getItem("notes") || "")
            if (props.dirDate!= 0) {
                copyNotes = copyNotes
                    .sort((n1: Note, n2: Note) => {
                        if (n1.date == n2.date) {
                            return 0
                        }
                        if (props.dirDate == 2) {
                            if (new Date(n1.date) > new Date(n2.date)) {
                                return 1
                            } else {
                                return -1
                            }
                        } else {
                            if (new Date(n1.date) > new Date(n2.date)) {
                                return -1
                            } else {
                                return 1
                            }
                        }
                    })
            }
            if (props.dirDone != 0) {
                copyNotes = copyNotes.sort((n1: Note, n2: Note) => {
                    if (n1.done == n2.done) {
                        return 0
                    }
                    if (props.dirDone == 2) {
                        if (n1.done && !n2.done) {
                            return 1
                        }
                        else {
                            return -1
                        }
                    }
                    else {
                        if (!n1.done && n2.done) {
                            return 1
                        }
                        else {
                            return -1
                        }
                    }
                })
            }
            if (props.dirImp != 0) {
                copyNotes = copyNotes.sort((n1: Note, n2: Note) => {
                    if (n1.important == n2.important) {
                        return 0
                    }
                    if (props.dirImp == 2) {
                        if (n1.important && !n1.important) {
                            return 1
                        }
                        else {
                            return -1
                        }
                    }
                    else {
                        if (!n1.important && n2.important) {
                            return 1
                        }
                        else {
                            return -1
                        }
                    }
                })
            }
            copyNotes = copyNotes.filter( (n:Note) => {return n.text.toLowerCase().trim().includes(props.search.toLowerCase().trim())})
            setNotes(copyNotes)
        }, [props.dirDate, props.dirDone, props.dirImp, props.search])

    return (
        <div className="notes-block">
            <ul className="notes">
                {notes.map((n: Note, i) => {
                    return (
                        <li>
                            <div className="note-row">
                                <p className="note-date">{n.date}</p>
                                <div className="note-done">
                                    <p>Выполнено</p>
                                    <FormCheckInput checked={n.done} onChange={e => {
                                        let copyNotes = [...notes]
                                        copyNotes[i].done = e.target.checked
                                        setNotes(copyNotes)
                                        setNotesLocal(copyNotes)
                                    }}></FormCheckInput>
                                </div>
                                <div className="note-imp">
                                    <p>Важное</p>
                                    <FormCheckInput checked={n.important} onChange={e => {
                                        let copyNotes = [...notes]
                                        copyNotes[i].important = e.target.checked
                                        setNotes(copyNotes)
                                        setNotesLocal(copyNotes)
                                    }}></FormCheckInput>
                                </div>
                            </div>
                            <p className="note-text">{n.text}</p>
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
                    "date": `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
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