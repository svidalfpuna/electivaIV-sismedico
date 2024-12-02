import React from 'react';
import Login from './components/Login.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import PacienteRegister from './components/PacienteRegister.jsx';
import RegisterFicha from './components/fichaClinica.jsx';
import Home from './pages/home.jsx';

function App() {
  return <Home></Home>;

  return (
    <Router>
      <Routes>
        {/* Redirige a login si el usuario no está autenticado */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Login */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/home" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
