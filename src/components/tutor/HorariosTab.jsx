import { useState, useEffect } from 'react';
import { tutoresAPI } from '../../services/api';
import { showError } from '../../utils/sweetAlertConfig';
import HorarioForm from './HorarioForm';
import HorariosList from './HorariosList';

function HorariosTab() {
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    cargarHorarios();
  }, []);

  const cargarHorarios = async () => {
    try {
      const token = localStorage.getItem('token');
      const perfilData = await tutoresAPI.obtenerPerfil(token);
      
      if (perfilData.tutor && perfilData.tutor.id) {
        const data = await tutoresAPI.obtenerHorarios(perfilData.tutor.id);
        setHorarios(data.horarios || []);
      }
    } catch (err) {
      console.error('Error al cargar horarios:', err);
      
      if (err.message.includes('Tutor no encontrado') || err.message.includes('not found')) {
        setHorarios([]);
      } else {
        showError('Error al cargar los horarios. ' + err.message);
        setHorarios([]);
      }
    }
  };

  const handleHorarioCreado = () => {
    setTimeout(() => {
      cargarHorarios();
    }, 500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <HorarioForm onHorarioCreado={handleHorarioCreado} />
      <HorariosList horarios={horarios} />
    </div>
  );
}

export default HorariosTab;