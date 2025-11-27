import { useState, useEffect } from 'react';
import { tutoriasAPI } from '../../services/api';
import LoadingSpinner from '../../common/LoadingSpinner';
import EmptyState from '../../common/EmptyState';
import TutoriaCard from './TutoriaCard';
import ModalResumen from './ModalResumen';

function HistorialTab() {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalResumen, setModalResumen] = useState(null);

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

  const handleRegistrarResumen = async (resumen) => {
    try {
      const token = localStorage.getItem('token');
      await tutoriasAPI.registrarResumen(modalResumen.id, resumen, token);
      setModalResumen(null);
      cargarHistorial();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Cargando historial..." />;
  }

  return (
    <>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-cyan-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Historial de tutorías
        </h2>

        <div className="space-y-4">
          {historial.length === 0 ? (
            <EmptyState 
              icon={
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              message="No hay tutorías en el historial"
            />
          ) : (
            historial.map((tutoria) => (
              <TutoriaCard 
                key={tutoria.id}
                tutoria={tutoria}
                onRegistrarResumen={setModalResumen}
              />
            ))
          )}
        </div>
      </div>

      {modalResumen && (
        <ModalResumen 
          tutoria={modalResumen}
          onClose={() => setModalResumen(null)}
          onSubmit={handleRegistrarResumen}
        />
      )}
    </>
  );
}

export default HistorialTab;