import { useState, useEffect } from 'react';
import { tutoriasAPI } from '../../services/api';
import LoadingSpinner from '../../common/LoadingSpinner';
import EmptyState from '../../common/EmptyState';
import SolicitudCard from './SolicitudCard';
import { showConfirm, showError, showSuccess } from '../../utils/sweetAlertConfig';

function SolicitudesTab() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const cargarSolicitudes = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await tutoriasAPI.obtenerSolicitudes(token);
      setSolicitudes(data.solicitudes || []);
    } catch (err) {
      showError(err.message || 'Error al cargar las solicitudes');
    } finally {
      setLoading(false);
    }
  };

  const handleResponder = async (tutoriaId, accion) => {
    const textos = {
      aceptar: {
        titulo: '¿Aceptar solicitud?',
        mensaje: '¿Estás seguro de que deseas aceptar esta tutoría?',
        confirmButtonText: 'Sí, aceptar',
        confirmButtonColor: '#10b981',
        success: 'Solicitud aceptada exitosamente'
      },
      rechazar: {
        titulo: '¿Rechazar solicitud?',
        mensaje: '¿Estás seguro de que deseas rechazar esta tutoría?',
        confirmButtonText: 'Sí, rechazar',
        confirmButtonColor: '#ef4444',
        success: 'Solicitud rechazada exitosamente'
      }
    };

    const config = textos[accion];

    const result = await showConfirm(config.mensaje, config.titulo);

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await tutoriasAPI.responder(tutoriaId, accion, token);
        
        await showSuccess(config.success, '¡Listo!');
        cargarSolicitudes();
      } catch (err) {
        showError(err.message || 'Error al procesar la solicitud');
      }
    }
  };

  if (loading) {
    return <LoadingSpinner message="Cargando solicitudes..." />;
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-cyan-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <svg className="w-6 h-6 mr-2 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        Solicitudes pendientes
      </h2>

      <div className="space-y-4">
        {solicitudes.length === 0 ? (
          <EmptyState 
            icon={
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            }
            message="No hay solicitudes pendientes"
          />
        ) : (
          solicitudes.map((solicitud) => (
            <SolicitudCard 
              key={solicitud.id}
              solicitud={solicitud}
              onResponder={handleResponder}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default SolicitudesTab;