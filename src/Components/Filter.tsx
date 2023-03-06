import {Button, Image} from "react-bootstrap";
import React, {useState} from "react";
import "./css/Filter.css"
import gsap from "gsap"

export function Filter() {
    let tlData = gsap.timeline()
    let tlDone = gsap.timeline()
    let tlImp = gsap.timeline()
    const [dirData, setDirData] = useState(false)
    const [dirDone, setDirDone] = useState(false)
    const [dirImp, setDirImp] = useState(false)
    return (
        <div className="filter-block">
            <h3 className="title">Сортировать по:</h3>
            <ul className="filters">
                <li><Button onClick={e => {
                    if (dirData) {
                        tlData.to(".data-sort", {
                            duration: 0.5,
                            rotate: 0,
                        })
                        setDirData(!dirData)
                    }
                    else {
                        tlData.to(".data-sort", {
                            duration: 0.5,
                            rotate: 180,
                        })
                        setDirData(!dirData)
                    }
                }} className="btn">Дата</Button><Image className="data-sort arrow-img"
                                                       src={require("../media/images/arrow.png")}/></li>
                <li><Button onClick={e => {
                    if (dirDone) {
                        tlDone.to(".done-sort", {
                            duration: 0.5,
                            rotate: 0,
                        })
                        setDirDone(!dirDone)
                    }
                    else {
                        tlDone.to(".done-sort", {
                            duration: 0.5,
                            rotate: 180,
                        })
                        setDirDone(!dirDone)
                    }
                }} className="btn">Выполненные</Button><Image className="done-sort arrow-img"
                                                              src={require("../media/images/arrow.png")}/></li>
                <li><Button onClick={e => {
                    if (dirImp) {
                        tlImp.to(".imp-sort", {
                            duration: 0.5,
                            rotate: 0,
                        })
                        setDirImp(!dirImp)
                    }
                    else {
                        tlImp.to(".imp-sort", {
                            duration: 0.5,
                            rotate: 180,
                        })
                        setDirImp(!dirImp)
                    }
                }} className="btn">Важные</Button><Image className="imp-sort arrow-img"
                                                         src={require("../media/images/arrow.png")}/></li>
            </ul>
        </div>
    )
}