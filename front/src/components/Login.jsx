import React, { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameRegister, setUsernameRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [loginError, setLoginError] = useState('');
  // Estados para registro
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadId, setEspecialidadId] = useState(0);
  const [registerError, setRegisterError] = useState('');
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const body = JSON.stringify({ nombre, apellido, cedula, email, telefono, fechaNacimiento, especialidadId, username: usernameRegister, password: passwordRegister });
      console.log("Llamada a api para registrar medico: ", body);
      const res = await fetch('http://localhost:5000/api/medicos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
      });
      const data = await res.json();
      if (res.ok) {
        console.log('Medico registrado con éxito');
        console.log(data);
        localStorage.setItem('token', JSON.stringify(data.token));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        console.log(data.message || 'Se tuvo error al llamar a la api');
        setRegisterError(data.message || 'Usuario existente');
      }
    } catch (error) {
      setRegisterError('Error en la solicitud de registro');
      console.log('Se tuvo error al llamar a la api');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/medicos/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log('Inicio de sesión exitoso');
        console.log(data);
        localStorage.setItem('token', JSON.stringify(data.token));
        navigate('/home');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setLoginError(data.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      setLoginError('Error en la solicitud de inicio de sesión');
    }
  };

  useEffect(() => {
    // Obtener las especialidades desde la API
    const obtenerEspecialidades = async () => {
      console.log("se hace call a api especialidades");
      try {
        const response = await fetch('http://localhost:5000/api/especialidades');
        const data = await response.json();
        console.log('Datos recibidos:', data);
        setEspecialidades(data);
        setEspecialidadId(data?.at(0).id);
      } catch (error) {
        console.error('Error al obtener las especialidades', error);
      }
    };

    obtenerEspecialidades();
  }, []);

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
              value={especialidadId}
              onChange={(e) => setEspecialidadId(e.target.value)}
              required
            >
              {especialidades.map((especialidadItem) => (
                <option key={especialidadItem.id} value={especialidadItem.nombre}>
                  {especialidadItem.nombre}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="input-field"
              placeholder="Nombre de Usuario"
              value={usernameRegister}
              onChange={(e) => setUsernameRegister(e.target.value)}
              required
            />
            <input
              type="password"
              className="input-field"
              placeholder="Contraseña"
              value={passwordRegister}
              onChange={(e) => setPasswordRegister(e.target.value)}
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
