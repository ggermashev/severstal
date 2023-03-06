import {Button, Form, FormText, Image} from "react-bootstrap";
import React, {useState} from "react";
import "./css/Filter.css"
import gsap from "gsap"

export function Filter(props: {
    dirDate: number, dirDone: number, dirImp: number, search: string
    setDirDate: (dir: number) => void, setDirDone: (dir: number) => void,
    setDirImp: (dir: number) => void, setSearch: (s:string)=>void
}) {
    let tlData = gsap.timeline()
    let tlDone = gsap.timeline()
    let tlImp = gsap.timeline()
    return (
        <div className="filter-block">
            <h3 className="title">Сортировать по:</h3>
            <ul className="filters">
                <li><Button onClick={e => {
                    if (props.dirDate == 0) {
                        tlData.to(".data-sort", {
                            duration: 0.5,
                            rotate: 0,
                        })
                        props.setDirDate(1)
                    } else if (props.dirDate == 1) {
                        tlData.to(".data-sort", {
                            duration: 0.5,
                            rotate: 180,
                        })
                        props.setDirDate(2)
                    } else {
                        tlData.to(".data-sort", {
                            duration: 0.5,
                            rotate: -90,
                        })
                        props.setDirDate(0)
                    }
                }} className="btn">Дата</Button><Image className="data-sort arrow-img"
                                                       src={require("../media/images/arrow.png")}/></li>
                <li><Button onClick={e => {
                    if (props.dirDone == 0) {
                        tlDone.to(".done-sort", {
                            duration: 0.5,
                            rotate: 0,
                        })
                        props.setDirDone(1)
                    } else if (props.dirDone == 1) {
                        tlDone.to(".done-sort", {
                            duration: 0.5,
                            rotate: 180,
                        })
                        props.setDirDone(2)
                    } else {
                        tlDone.to(".done-sort", {
                            duration: 0.5,
                            rotate: -90,
                        })
                        props.setDirDone(0)
                    }
                }} className="btn">Выполненные</Button><Image className="done-sort arrow-img"
                                                              src={require("../media/images/arrow.png")}/></li>
                <li><Button onClick={e => {
                    if (props.dirImp == 0) {
                        tlImp.to(".imp-sort", {
                            duration: 0.5,
                            rotate: 0,
                        })
                        props.setDirImp(1)
                    } else if (props.dirImp == 1) {
                        tlImp.to(".imp-sort", {
                            duration: 0.5,
                            rotate: 180,
                        })
                        props.setDirImp(2)
                    } else {
                        tlImp.to(".imp-sort", {
                            duration: 0.5,
                            rotate: -90,
                        })
                        props.setDirImp(0)
                    }
                }} className="btn">Важные</Button><Image className="imp-sort arrow-img"
                                                         src={require("../media/images/arrow.png")}/></li>
            </ul>
            <div className="search-block">
                <Form className="search-form">
                    <Form.Control type="text" value={props.search} onChange={e => {
                        props.setSearch(e.target.value)
                        console.log(props.search)
                    }}/>
                </Form>
            </div>
        </div>
    )
}