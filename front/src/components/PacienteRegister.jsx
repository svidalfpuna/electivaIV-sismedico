import React, { useState } from 'react'; 
import './Login.css';

export default function PacienteRegister() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(''); 

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError(''); // Limpiar mensajes previos
    setRegisterSuccess('');
    try {
      console.log('llamada a api para crear pacientes');
      const res = await fetch('http://localhost:5000/api/pacientes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, cedula, email, telefono, fechaNacimiento }),
      });
      const data = await res.json();
      if (res.ok) {
        setRegisterSuccess('Usuario registrado con éxito'); // Establecer mensaje de éxito
        console.log('Usuario registrado con éxito');
        setNombre('');
        setApellido('');
        setCedula('');
        setEmail('');
        setTelefono('');
        setFechaNacimiento('');
      } else {
        setRegisterError(data.error || 'Usuario existente');
        console.log(data.error || 'Usuario existente');
      }
    } catch (error) {
      setRegisterError('Error en la solicitud de registro');
      console.log('Error en la solicitud de registro');
    }
  };

  return (
    <div className="form-container-register-paciente">
      <form className="form" onSubmit={handleRegister}>
        <h1>Registro de Paciente</h1>
        
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
        
        {/* Fecha de nacimiento */}
        <label htmlFor="fechaNacimiento" className="label-date">Fecha de Nacimiento :</label>
        <input
          type="date"
          id="fechaNacimiento"
          className="input-field"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          required
        />

        {registerError && <p className="error-message">{registerError}</p>}
        {registerSuccess && <p className="success-message">{registerSuccess}</p>}

        <button type="submit" className="button registrar">Guardar</button>
      </form>
    </div>
  );
}
