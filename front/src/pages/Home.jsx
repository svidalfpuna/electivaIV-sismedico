import React, { useState } from "react";
import "./Home.css";
import RegisterFicha from "../components/fichaClinica";
import PacienteRegister from "../components/PacienteRegister";
import FichasClinicasListado from "../components/FichasClinicasListado";

function Home() {
  const [activeContent, setActiveContent] = useState(''); // Estado para manejar el contenido activo

  const handleSidebarClick = (content) => {
    setActiveContent(content); // Cambia el contenido que se muestra según el clic en el sidebar
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log("Cerrar sesión");
    localStorage.removeItem('token');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button className="sidebar-btn" onClick={() => handleSidebarClick('registroPaciente')}>Registro de Paciente</button>
        <button className="sidebar-btn" onClick={() => handleSidebarClick('fichaClinica')}>Creación de Fichas Clínicas</button>
        <button className="sidebar-btn" onClick={() => handleSidebarClick('historialMedico')}>Historial Médico</button>
        <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>

      </div>

      {/* Main Content */}
      <div className="main-content">
        {activeContent === 'registroPaciente' && <PacienteRegister />} {/* Mostrar Registro de Paciente */}
        {activeContent === 'fichaClinica' && <RegisterFicha />}
        {activeContent === 'historialMedico' && <FichasClinicasListado />}
        {!activeContent && (
          <div>
            <h1>Bienvenido</h1>
            <p>Selecciona una opción en el menú lateral para comenzar.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
