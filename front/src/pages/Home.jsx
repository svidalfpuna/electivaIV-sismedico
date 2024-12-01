import React, { useState } from "react";
import "./Home.css";
import RegisterFicha from "../components/fichaClinica";
import PacienteRegister from "../components/PacienteRegister";

function Home() {
  const [activeContent, setActiveContent] = useState(''); // Estado para manejar el contenido activo

  const handleSidebarClick = (content) => {
    setActiveContent(content); // Cambia el contenido que se muestra según el clic en el sidebar
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button className="sidebar-btn" onClick={() => handleSidebarClick('registroPaciente')}>Registro de Paciente</button>
        <button className="sidebar-btn" onClick={() => handleSidebarClick('fichaClinica')}>Creación de Fichas Clínicas</button>
        <button className="sidebar-btn" onClick={() => handleSidebarClick('historialMedico')}>Historial Médico</button>
        <button className="sidebar-btn" onClick={() => handleSidebarClick('agendaConsultas')}>Agenda de Consultas</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {activeContent === 'registroPaciente' && <PacienteRegister />} {/* Mostrar Registro de Paciente */}
        {activeContent === 'fichaClinica' && <RegisterFicha/>}
        {activeContent === 'historialMedico' && <h1>Historial Médico</h1>}
        {activeContent === 'agendaConsultas' && <h1>Agenda de Consultas</h1>}
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
