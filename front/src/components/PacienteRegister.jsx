import React, { useState } from 'react';
import './Login.css';

export default function Login() {
const [nombre, setNombre] = useState('');
const [apellido, setApellido] = useState('');
const [cedula, setCedula] = useState('');
const [email, setEmail] = useState('');
const [telefono, setTelefono] = useState('');
const [fechaNacimiento, setFechaNacimiento] = useState('');
const [registerError, setRegisterError] = useState('');
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      console.log('llamada a api para crear spacientes');
      const res = await fetch('http://localhost:5000/api/pacientes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, cedula, email, telefono, fechaNacimiento }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log('Usuario registrado con éxito');
      } else {
        setRegisterError(data.error || 'Usuario existente');
        console.log(data.error || 'Usuario existente');
      }
    } catch (error) {
      setRegisterError('Error en la solicitud de registro');
      console.log('Error en la solicitud de registro');
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
        <div className="form-container-register">
          <form className="form" onSubmit={handleSignUp}>
            <h1>Registrar Paciente</h1>
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
            {registerError && <p className="error-message">{registerError}</p>}
            <button type="submit" className="button registrar-button">Guardar</button>
          </form>
        </div>
      </div>
  );
}
