import React from 'react';
import { useNavigate } from 'react-router-dom';
import MiTabla from '../components/protected';
import NavProtected from '../components/Navprotected';
import Footer from '../components/Footer'

const ProtectedPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response) {
        console.log("Sesión cerrada correctamente");
      } else {
        throw new Error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Error al cerrar sesión. Por favor, intenta nuevamente.");
    }
  };
  
  return (
    <>
      <NavProtected handleLogout={handleLogout} />
      <MiTabla />
      <Footer />
    </>
  );
};

export default ProtectedPage;
