import React from "react";
import { Link } from "react-router-dom"
import myImage from "../assets/pelota-de-voleibol.png"

const Header = () => (
    <header className="header">
        <nav>
            <img src={myImage} alt="pelota de voleibol" />
            <span>VolleyForAll</span>
            <ul>
                <a href="#1"><li>Bienvenida</li></a>
                <a href="#2"><li>Muestra</li></a>
                <a href="#3"><li>Contacto</li></a>
                <li>
                    <Link to='/login'>
                        Ingresar
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
);

export default Header;