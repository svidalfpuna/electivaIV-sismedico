import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './Login.css';

export default function RegisterFicha() {
  const [fecha, setFecha] = useState('');
  const [paciente, setPaciente] = useState('');
  const [motivoConsulta, setMotivoConsulta] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [tratamiento, setTratamiento] = useState('');
  const [opciones, setOpciones] = useState([]);
  const [registerError, setRegisterError] = useState('');

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: '#C4DCFF',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? '#228be6'
        : '#C4DCFF',
      color: state.isFocused ? 'black' : 'white',
    }),
    singleValue: (base) => ({
      ...base,
      color: '#6B788B',
    }),
  };
  useEffect(() => {
    // Se autocompleta con la fecha del día
    setFecha(new Date().toISOString().split('T')[0]);

    fetch("http://localhost:5000/api/pacientes/")
      .then((res) => res.json())
      .then((data) => {
        const dataPaciente = data.map((paciente) => ({
          label: paciente.nombre + " " + paciente.apellido,
          value: paciente.id
        }));
        setOpciones(dataPaciente);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/fichasClinicas/', {
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

        {/* Paciente */}
        <Select
          options={opciones}
          value={opciones.find((option) => option.value === paciente)}
          onChange={(selectedOption) => setPaciente(selectedOption?.value || '')}
          placeholder="Selecciona un paciente"
          noOptionsMessage={() => 'No hay pacientes disponibles'}
          isSearchable
          styles={customStyles}
        />

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
