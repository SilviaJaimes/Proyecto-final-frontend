import { useState } from 'react';
import { tutoresAPI } from '../../services/api';
import { showSuccess, showError, Toast } from '../../utils/sweetAlertConfig';

function HorarioForm({ onHorarioCreado }) {
  const [formData, setFormData] = useState({
    fecha: '',
    hora: ''
  });
  const [loading, setLoading] = useState(false);
  const [showInfoMessage, setShowInfoMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowInfoMessage(false);

    try {
      const token = localStorage.getItem('token');
      await tutoresAPI.crearHorario(formData, token);
      setFormData({ fecha: '', hora: '' });
      
      // Mostrar toast de éxito
      await Toast.fire({
        icon: 'success',
        title: 'Horario creado exitosamente'
      });
      
      onHorarioCreado();
    } catch (err) {
      if (err.message.includes('Tutor no encontrado') || err.message.includes('not found')) {
        setShowInfoMessage(true);
        showError('Tu perfil de tutor está siendo configurado. Intenta nuevamente.', 'Perfil en configuración');
      } else {
        showError(err.message || 'Error al crear el horario');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-cyan-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <svg className="w-6 h-6 mr-2 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Crear Nuevo Horario
      </h2>

      {showInfoMessage && (
        <div className="mb-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700 p-4 rounded">
          <div className="flex items-start">
            <svg className="w-5 h-5 mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>Crea tu primer horario para activar tu perfil de tutor.</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Fecha
          </label>
          <input
            type="date"
            value={formData.fecha}
            onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Hora
          </label>
          <input
            type="time"
            value={formData.hora}
            onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Creando...' : 'Crear horario'}
        </button>
      </form>
    </div>
  );
}

export default HorarioForm;