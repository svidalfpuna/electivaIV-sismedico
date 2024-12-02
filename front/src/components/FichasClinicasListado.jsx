import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import './ficha.css';

const FichasClinicasListado = () => {
  const [fichas, setFichas] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [filters, setFilters] = useState({
    especialidadId: '',
    medicoId: '',
    pacienteId: '',
    fecha: '',
  });
  const [error, setError] = useState(null);

  // Obtener especialidades
  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        console.log('llamada a api para listar especialidades');
        const res = await fetch('http://localhost:5000/api/especialidades/');
        const data = await res.json();
        if (res.ok) {
          console.log(data);
          setEspecialidades(data);
        } else {
          setError(data.error || 'Error al cargar especialidades');
        }
      } catch (err) {
        setError('Error al cargar especialidades');
      }
    };
    fetchEspecialidades();
  }, []);

  // Obtener médicos
  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        console.log('llamada a api para listar medicos');
        const res = await fetch('http://localhost:5000/api/medicos/');
        const data = await res.json();
        if (res.ok) {
          console.log(data);
          setMedicos(data);
        } else {
          setError(data.error || 'Error al cargar médicos');
        }
      } catch (err) {
        setError('Error al cargar médicos');
      }
    };
    fetchMedicos();
  }, []);

  // Obtener pacientes
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        console.log('llamada a api para listar pacientes');
        const res = await fetch('http://localhost:5000/api/pacientes/');
        const data = await res.json();
        if (res.ok) {
          console.log(data);
          setPacientes(data);
        } else {
          setError(data.error || 'Error al cargar pacientes');
        }
      } catch (err) {
        setError('Error al cargar pacientes');
      }
    };
    fetchPacientes();
  }, []);

  // Obtener fichas clínicas con filtros
  const fetchFichas = async () => {
    try {
      const filteredParams = Object.entries(filters)
        .filter(([key, value]) => value !== '') // Elimina entradas con valores vacíos
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
      const queryParams = new URLSearchParams(filteredParams).toString();
      console.log('llamada a api para obtener fichas clinicas');
      const res = await fetch(`http://localhost:5000/api/fichasClinicas/?${queryParams}`);
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setFichas(data);
      } else {
        setError(data.error || 'Error al cargar fichas clínicas');
      }
    } catch (err) {
      setError('Error al cargar fichas clínicas');
    }
  };

  // Manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Llamar a fetchFichas al cambiar filtros
  useEffect(() => {
    fetchFichas();
  }, [filters.especialidadId, filters.fecha, filters.medicoId, filters.pacienteId]);

  return (

    <div className="form-container-ficha">
      <h1>Listado de Consultas</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label>
          Especialidad:
          <select name="especialidadId" onChange={handleFilterChange} value={filters.especialidadId}>
            <option value="">Todas</option>
            {especialidades.map((esp) => (
              <option key={esp.id} value={esp.id}>
                {esp.nombre}
              </option>
            ))}
          </select>
        </label>

        <label>
          Médico:
          <select name="medicoId" onChange={handleFilterChange} value={filters.medicoId}>
            <option value="">Todos</option>
            {medicos.map((medico) => (
              <option key={medico.id} value={medico.id}>
                {medico.nombre} {medico.apellido}
              </option>
            ))}
          </select>
        </label>

        <label>
          Paciente:
          <select name="pacienteId" onChange={handleFilterChange} value={filters.pacienteId}>
            <option value="">Todos</option>
            {pacientes.map((paciente) => (
              <option key={paciente.id} value={paciente.id}>
                {paciente.nombre} {paciente.apellido}
              </option>
            ))}
          </select>
        </label>

        <label>
          Fecha:
          <input type="date" name="fecha" onChange={handleFilterChange} value={filters.fecha} />
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Motivo</th>
            <th>Diagnóstico</th>
            <th>Tratamiento</th>
          </tr>
        </thead>
        <tbody>
          {fichas.map((ficha) => (
            <tr key={ficha.id}><td>{ficha.fecha ? format(parseISO(ficha.fecha), 'dd/MM/yyyy') : "Fecha no disponible"}</td>
              <td>{ficha.paciente || "Paciente no asignado"}</td>
              <td>{ficha.medico || "Médico no asignado"}</td>
              <td>{ficha.motivo || "Motivo no registrado"}</td>
              <td>{ficha.diagnostico || "Diagnóstico no registrado"}</td>
              <td>{ficha.tratamiento || "Tratamiento no registrado"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FichasClinicasListado;
