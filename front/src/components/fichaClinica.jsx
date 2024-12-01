import React, { useState, useEffect } from 'react';
import './Login.css';

export default function RegisterFicha() {
  const [fecha, setFecha] = useState('');
  const [paciente, setPaciente] = useState('');
  const [motivoConsulta, setMotivoConsulta] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [tratamiento, setTratamiento] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [registerError, setRegisterError] = useState('');

  useEffect(() => {
    // Se autocompleta con la fecha del día
    setFecha(new Date().toISOString().split('T')[0]);
    
    // Simulación de obtener pacientes (esto debería venir de una API real)
    setPacientes([
      { id: 1, nombre: 'Juan Pérez' },
      { id: 2, nombre: 'Ana Gómez' },
      { id: 3, nombre: 'Carlos Ruiz' },
    ]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/ficha/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fecha,
          paciente,
          motivoConsulta,
          diagnostico,
          tratamiento,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log('Ficha registrada con éxito');
      } else {
        setRegisterError(data.error || 'Error al registrar ficha');
      }
    } catch (error) {
      setRegisterError('Error en la solicitud de registro');
    }
  };

  return (
      <div className="form-container-register-paciente">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Registrar Ficha Clínica</h1>
          
          {/* Fecha */}
          <input
            type="date"
            className="input-field"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />

          {/* Búsqueda de paciente */}
          <select
            className="input-field"
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
            required
          >
            <option value="">Selecciona un paciente</option>
            {pacientes.map((pac) => (
              <option key={pac.id} value={pac.id}>
                {pac.nombre}
              </option>
            ))}
          </select>

          {/* Motivo de consulta */}
          <textarea
            className="input-field"
            placeholder="Motivo de consulta"
            value={motivoConsulta}
            onChange={(e) => setMotivoConsulta(e.target.value)}
            required
          ></textarea>

          {/* Diagnóstico */}
          <textarea
            className="input-field"
            placeholder="Diagnóstico"
            value={diagnostico}
            onChange={(e) => setDiagnostico(e.target.value)}
            required
          ></textarea>

          {/* Tratamiento */}
          <textarea
            className="input-field"
            placeholder="Tratamiento"
            value={tratamiento}
            onChange={(e) => setTratamiento(e.target.value)}
            required
          ></textarea>

          {registerError && <p className="error-message">{registerError}</p>}

          <button type="submit" className="button registrar">Guardar</button>
        </form>
      </div>
  );
}
