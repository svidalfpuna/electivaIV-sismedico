import React, { useEffect, useState } from 'react';
import Login from './components/Login.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/home.jsx';

function App() {
  const [user, setUser] = useState(null); // Estado para almacenar el usuario

  // Verificar si hay un usuario guardado en localStorage al cargar la app
  useEffect(() => {
    const savedUser = getItemWithExpiry('token');
    //const savedUser = localStorage.getItem('token');
    console.log(savedUser)
    if (savedUser) {
      
      const now = new Date();
      // Crea un objeto que incluye el valor y el tiempo de expiración
      const item = {
        value: savedUser, // El valor que querés guardar
        expiry: now.getTime() + 600000, // La fecha actual + 10min en milisegundos
      };
    
      // Guarda el objeto como un string en localStorage
      localStorage.setItem('token', JSON.stringify(item));
      setUser(savedUser); // Actualizar el estado con el usuario almacenado
    }
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


function getItemWithExpiry(key) {
  const itemStr = localStorage.getItem(key);

  // Si no hay nada almacenado, retornar null
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  // Verificar si el tiempo actual supera el tiempo de expiración
  if (now.getTime() > item.expiry) {
    // Eliminar el item expirado del localStorage
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}
