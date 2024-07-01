import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            try {
                const data = await response.json();
                console.log("Usuario autenticado:", data.user.username);
                navigate("/protected");
            } catch (jsonError) {
                console.error("Error al parsear JSON:", jsonError);
                alert("Error al iniciar sesión. Por favor, intenta nuevamente.");
            }
        } else if (response.status === 401) {
            alert("Usuario o contraseña incorrectos");
        } else {
            // Manejo para otros códigos de estado si es necesario
            alert("Error al iniciar sesión. Por favor, intenta nuevamente.");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Error al iniciar sesión. Por favor, intenta nuevamente.");
    }
};


  return (
    <div className="login">
      <form className="form-login" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="row">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="row">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
