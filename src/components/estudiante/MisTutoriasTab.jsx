import { useState, useEffect } from 'react';
import { tutoriasAPI } from '../../services/api';
import LoadingSpinner from '../../common/LoadingSpinner';
import EmptyState from '../../common/EmptyState';
import { showConfirm, showError, showSuccess } from '../../utils/sweetAlertConfig';

function MisTutoriasTab() {
  const [tutorias, setTutorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarTutorias();
  }, []);

  const cargarTutorias = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await tutoriasAPI.obtenerHistorial(token);
      
      const tutoriasActivas = (data.historiales || data.tutorias || []).filter(
        t => t.estado === 'pendiente' || t.estado === 'aceptada'
      );
      
      setTutorias(tutoriasActivas);
    } catch (err) {
      showError('Error al cargar las tutorías');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = async (tutoriaId) => {
    const result = await showConfirm(
      '¿Deseas cancelar esta tutoría?',
      '¿Estás seguro?'
    );

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await tutoriasAPI.cancelar(tutoriaId, token);
        await showSuccess('La tutoría ha sido cancelada exitosamente', '¡Cancelada!');
        cargarTutorias();
      } catch (err) {
        showError(err.message || 'Error al cancelar la tutoría');
      }
    }
  };

  if (loading) {
    return <LoadingSpinner message="Cargando tus tutorías..." />;
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-cyan-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <svg className="w-6 h-6 mr-2 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        Mis tutorías activas
      </h2>

      <div className="space-y-4">
        {tutorias.length === 0 ? (
          <EmptyState 
            icon={
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
            message="No tienes tutorías activas"
            submessage="Solicita una tutoría desde la sección 'Buscar Tutores'"
          />
        ) : (
          tutorias.map((tutoria) => (
            <div
              key={tutoria.id}
              className="p-6 bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-linear-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-white">
                        {tutoria.tutor?.usuario?.nombre?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {tutoria.tutor?.usuario?.nombre || 'Tutor'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {tutoria.tutor?.usuario?.correo}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-semibold">Fecha:</span>{' '}
                      {new Date(tutoria.fecha).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p>
                      <span className="font-semibold">Hora:</span> {tutoria.hora}
                    </p>
                    {tutoria.tema && (
                      <p>
                        <span className="font-semibold">Tema:</span> {tutoria.tema}
                      </p>
                    )}
                    {tutoria.tutor?.materias && (
                      <p>
                        <span className="font-semibold">Materias:</span> {tutoria.tutor.materias}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    tutoria.estado === 'pendiente' 
                      ? 'bg-yellow-100 text-yellow-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {tutoria.estado === 'pendiente' ? 'Pendiente' : 'Aceptada'}
                  </span>

                  {tutoria.estado === 'pendiente' && (
                    <button
                      onClick={() => handleCancelar(tutoria.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>

              {tutoria.estado === 'pendiente' && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Esperando confirmación del tutor
                  </p>
                </div>
              )}

              {tutoria.estado === 'aceptada' && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Tutoría confirmada - No olvides asistir
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MisTutoriasTab;