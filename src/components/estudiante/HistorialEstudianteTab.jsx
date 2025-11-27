import { useState, useEffect } from 'react';
import { tutoriasAPI } from '../../services/api';
import LoadingSpinner from '../../common/LoadingSpinner';
import EmptyState from '../../common/EmptyState';

function HistorialEstudianteTab() {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todas'); // todas, finalizadas, rechazadas, canceladas

  useEffect(() => {
    cargarHistorial();
  }, []);

  const cargarHistorial = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await tutoriasAPI.obtenerHistorial(token);
      setHistorial(data.historiales || data.tutorias || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const historialFiltrado = historial.filter(t => {
    if (filtro === 'todas') return true;
    return t.estado === filtro.slice(0, -1); // Remove 's' from plural
  });

  if (loading) {
    return <LoadingSpinner message="Cargando historial..." />;
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-cyan-100">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFiltro('todas')}
            className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
              filtro === 'todas'
                ? 'bg-linear-to-r from-cyan-500 to-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todas ({historial.length})
          </button>
          <button
            onClick={() => setFiltro('finalizadas')}
            className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
              filtro === 'finalizadas'
                ? 'bg-linear-to-r from-cyan-500 to-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Finalizadas ({historial.filter(t => t.estado === 'finalizada').length})
          </button>
          <button
            onClick={() => setFiltro('rechazadas')}
            className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
              filtro === 'rechazadas'
                ? 'bg-linear-to-r from-cyan-500 to-bl ue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Rechazadas ({historial.filter(t => t.estado === 'rechazada').length})
          </button>
          <button
            onClick={() => setFiltro('canceladas')}
            className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
              filtro === 'canceladas'
                ? 'bg-linear-to-r from-cyan-500 to-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Canceladas ({historial.filter(t => t.estado === 'cancelada').length})
          </button>
        </div>
      </div>

      {/* Lista de historial */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-cyan-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Historial completo
        </h2>

        <div className="space-y-4">
          {historialFiltrado.length === 0 ? (
            <EmptyState 
              icon={
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              message="No hay tutorías en el historial"
            />
          ) : (
            historialFiltrado.map((tutoria) => (
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
                      
                      {tutoria.resumen && (
                        <div className="mt-3 p-3 bg-white rounded-lg">
                          <p className="font-semibold text-gray-800 mb-1">Resumen del tutor:</p>
                          <p className="text-gray-700">{tutoria.resumen}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    tutoria.estado === 'finalizada' ? 'bg-green-100 text-green-700' :
                    tutoria.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-700' :
                    tutoria.estado === 'rechazada' ? 'bg-red-100 text-red-700' :
                    tutoria.estado === 'cancelada' ? 'bg-gray-100 text-gray-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {tutoria.estado.charAt(0).toUpperCase() + tutoria.estado.slice(1)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default HistorialEstudianteTab;