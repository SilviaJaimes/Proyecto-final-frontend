import { useState } from 'react';
import { tutoriasAPI } from '../../services/api';
import { showSuccess, showError } from '../../utils/sweetAlertConfig';

function ModalSolicitud({ tutor, horarios, loadingHorarios, onClose }) {
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [tema, setTema] = useState('');
  const [loading, setLoading] = useState(false);

  const horariosDisponibles = horarios.filter(h => h.estado === 'disponible');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedHorario) {
      showError('Por favor selecciona un horario');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const tutoriaData = {
        tutorId: tutor.id,
        horarioId: selectedHorario.id,
        tema: tema.trim(),
        fecha: selectedHorario.fecha,
        hora: selectedHorario.hora
      };

      await tutoriasAPI.solicitar(tutoriaData, token);
      await showSuccess('Solicitud enviada exitosamente', '¡Éxito!');
      onClose();
    } catch (err) {
      showError(err.message || 'Error al enviar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Solicitar Tutoría</h3>
            <p className="text-sm text-gray-600 mt-1">
              Tutor: <span className="font-semibold">{tutor.usuario.nombre}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Selección de horario */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Selecciona un horario disponible
            </label>
            
            {loadingHorarios ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
                <p className="text-sm text-gray-600 mt-2">Cargando horarios...</p>
              </div>
            ) : horariosDisponibles.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-xl">
                <svg className="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500">No hay horarios disponibles</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {horariosDisponibles.map((horario) => (
                  <button
                    key={horario.id}
                    type="button"
                    onClick={() => setSelectedHorario(horario)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedHorario?.id === horario.id
                        ? 'border-cyan-500 bg-cyan-50'
                        : 'border-gray-200 hover:border-cyan-300 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {new Date(horario.fecha).toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Hora: {horario.hora}
                        </p>
                      </div>
                      {selectedHorario?.id === horario.id && (
                        <svg className="w-6 h-6 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tema */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tema a tratar (opcional)
            </label>
            <textarea
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Describe brevemente el tema que necesitas reforzar..."
            />
          </div>

          {/* Botones */}
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={loading || !selectedHorario}
              className="flex-1 py-3 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Enviando...' : 'Enviar solicitud'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all disabled:opacity-50 cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalSolicitud;