import React, { useState } from 'react';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  // Estados para registro
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [registerError, setRegisterError] = useState('');
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/medico/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, cedula, email, telefono, fechaNacimiento, especialidad, username, password }),
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
      const res = await fetch('http://localhost:5000/api/login/', {
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
        <div className="form-container-register">
          <form className="form" onSubmit={handleSignUp}>
            <h1>Registrar Médico</h1>
            <input
              type="text"
              className="input-field"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              type="text"
              className="input-field"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
            <input
              type="text"
              className="input-field"
              placeholder="Cédula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              required
            />
            <input
              type="email"
              className="input-field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              className="input-field"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
            <input
              type="date"
              className="input-field"
              placeholder="Fecha de Nacimiento"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              required
            />
            <select
              className="input-field"
              value={especialidad}
              onChange={(e) => setEspecialidad(e.target.value)}
              required
            >
              <option value="">Selecciona Especialidad</option>
              <option value="Pediatra">Pediatra</option>
              <option value="Dermatologo">Dermatólogo</option>
              <option value="Clinico">Clínico</option>
              {/* Agrega más opciones si es necesario */}
            </select>
            <input
              type="text"
              className="input-field"
              placeholder="Nombre de Usuario"
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
