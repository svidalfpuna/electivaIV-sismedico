import React, { useEffect, useState } from 'react';
import Login from './components/Login.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/home.jsx';

function App() {
  const [user, setUser] = useState(null); // Estado para almacenar el usuario

  // Verificar si hay un usuario guardado en localStorage al cargar la app
  useEffect(() => {
    const savedUser = localStorage.getItem('token');
    console.log(savedUser)
    if (savedUser) {
      setUser(savedUser); // Actualizar el estado con el usuario almacenado
    }
    console.log(user)
  }, []);

  useEffect(() => {
    console.log("Estado del usuario:", user); // Verifica el valor actualizado de 'user'
  }, [user]);
  return (
    <Router>
      <Routes>
        {/* Redirige a login si el usuario no está autenticado */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Login */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
