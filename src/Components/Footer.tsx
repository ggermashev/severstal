import {Image, ModalFooter} from "react-bootstrap";
import "./css/Footer.css"

export function Footer() {
    return (
        <div className="footer">
            <p className="me">@by Григорий Гермашев</p>
            <div className="socials">
                <Image className="vk img" onClick={e => {window.open('https://vk.com/ggermashev','_blank')}} src={require("../media/images/vk.jpg")}/>
                <Image className="git img" onClick={e => {window.open('https://github.com/ggermashev','_blank')}} src={require("../media/images/git.jpg")}/>
                <p>Telegram: @g_grm</p>
            </div>
        </div>
    )
}