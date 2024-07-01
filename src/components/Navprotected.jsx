import React from "react";
import { useNavigate } from "react-router-dom";
import myImage from "../assets/pelota-de-voleibol.png";

const NavProtected = ({ handleLogout }) => {
  const navigate = useNavigate();

  const logoutAndNavigate = async () => {
    await handleLogout();
    navigate("/");
  };

  return (
    <header className="header">
      <nav>
        <img src={myImage} alt="pelota de voleibol" />
        <span>VolleyForAll</span>
        <ul>
          <li>
            <button className="bye" onClick={logoutAndNavigate}>Cerrar Sesión</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavProtected;
