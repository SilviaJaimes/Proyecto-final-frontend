import { useState, useEffect } from 'react';
import { tutoresAPI, tutoriasAPI } from '../../services/api';
import ModalSolicitud from './ModalSolicitud';

function TutorCard({ tutor }) {
  const [showModal, setShowModal] = useState(false);
  const [horarios, setHorarios] = useState([]);
  const [loadingHorarios, setLoadingHorarios] = useState(false);

  const handleVerHorarios = async () => {
    setShowModal(true);
    setLoadingHorarios(true);
    try {
      const data = await tutoresAPI.obtenerHorarios(tutor.id);
      setHorarios(data.horarios || []);
    } catch (err) {
      console.error('Error al cargar horarios:', err);
    } finally {
      setLoadingHorarios(false);
    }
  };

  return (
    <>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-cyan-100 hover:shadow-2xl transition-all">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-linear-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shrink-0">
            <span className="text-2xl font-bold text-white">
              {tutor.usuario.nombre.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-800 truncate">
              {tutor.usuario.nombre}
            </h3>
            <p className="text-sm text-gray-600 truncate">{tutor.usuario.correo}</p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {tutor.materias && (
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-700">Materias:</p>
                <p className="text-sm text-gray-600">{tutor.materias}</p>
              </div>
            </div>
          )}

          {tutor.especialidad && (
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-700">Especialidad:</p>
                <p className="text-sm text-gray-600">{tutor.especialidad}</p>
              </div>
            </div>
          )}

          {tutor.descripcion && (
            <div className="pt-2">
              <p className="text-sm text-gray-600 line-clamp-3">{tutor.descripcion}</p>
            </div>
          )}
        </div>

        <button
          onClick={handleVerHorarios}
          className="w-full mt-4 py-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all cursor-pointer"
        >
          Ver horarios disponibles
        </button>
      </div>

      {showModal && (
        <ModalSolicitud 
          tutor={tutor}
          horarios={horarios}
          loadingHorarios={loadingHorarios}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default TutorCard;