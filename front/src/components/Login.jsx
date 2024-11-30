import React, { useState } from 'react';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log('Usuario registrado con éxito');
      } else {
        setRegisterError(data.error || 'Usuario existente');
      }
    } catch (error) {
      setRegisterError('Error en la solicitud de registro');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log('Inicio de sesión exitoso');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        // Navegación al dashboard
      } else {
        setLoginError(data.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      setLoginError('Error en la solicitud de inicio de sesión');
    }
  };

  return (
    <div className='login-base'>
      <div className='container-login'>
        {/* Formulario de Iniciar Sesión */}
        <div className="form-container-login">
          <form className="form" onSubmit={handleSignIn}>
            <h1>Iniciar Sesión</h1>
            <input
              type="text"
              className="input-field"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              className="input-field"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {loginError && <p className="error-message">{loginError}</p>}
            <button type="submit" className="button">Ingresar</button>
          </form>
        </div>

        {/* Formulario de Registro */}
        <div className="form-container-login register">
          <form className="form" onSubmit={handleSignUp}>
            <h1>Crear Cuenta</h1>
            <input
              type="text"
              className="input-field"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              className="input-field"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {registerError && <p className="error-message">{registerError}</p>}
            <button type="submit" className="button registrar-button">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  );
}
