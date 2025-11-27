import { useState, useEffect } from 'react';
import { tutoriasAPI } from '../../services/api';
import LoadingSpinner from '../../common/LoadingSpinner';
import EstadisticaCard from './EstadisticaCard';

function ReporteTab() {
  const [reporte, setReporte] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarReporte();
  }, []);

  const cargarReporte = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await tutoriasAPI.obtenerReporte(token);
      setReporte(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Cargando reporte..." />;
  }

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <EstadisticaCard titulo="Total" valor={reporte?.estadisticas?.total || 0} color="blue" />
        <EstadisticaCard titulo="Pendientes" valor={reporte?.estadisticas?.pendientes || 0} color="yellow" />
        <EstadisticaCard titulo="Aceptadas" valor={reporte?.estadisticas?.aceptadas || 0} color="cyan" />
        <EstadisticaCard titulo="Finalizadas" valor={reporte?.estadisticas?.finalizadas || 0} color="green" />
        <EstadisticaCard titulo="Rechazadas" valor={reporte?.estadisticas?.rechazadas || 0} color="red" />
        <EstadisticaCard titulo="Canceladas" valor={reporte?.estadisticas?.canceladas || 0} color="gray" />
      </div>

      {/* Lista de tutorías */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-cyan-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Detalle de tutorías</h2>
        <div className="space-y-4">
          {reporte?.tutorias?.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No hay tutorías registradas</p>
          ) : (
            reporte?.tutorias?.map((tutoria) => (
              <div
                key={tutoria.id}
                className="p-4 bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {tutoria.estudiante?.usuario?.nombre}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {new Date(tutoria.fecha).toLocaleDateString('es-ES')} - {tutoria.hora}
                    </p>
                    {tutoria.resumen && (
                      <p className="text-sm mt-2 text-gray-700">
                        <span className="font-semibold">Resumen:</span> {tutoria.resumen}
                      </p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    tutoria.estado === 'finalizada' ? 'bg-green-100 text-green-700' :
                    tutoria.estado === 'aceptada' ? 'bg-blue-100 text-blue-700' :
                    tutoria.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {tutoria.estado}
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

export default ReporteTab;