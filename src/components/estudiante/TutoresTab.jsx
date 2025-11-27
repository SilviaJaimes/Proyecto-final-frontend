import { useState, useEffect } from 'react';
import { tutoresAPI } from '../../services/api';
import LoadingSpinner from '../../common/LoadingSpinner';
import EmptyState from '../../common/EmptyState';
import TutorCard from './TutorCard';

function TutoresTab() {
  const [tutores, setTutores] = useState([]);
  const [tutoresFiltrados, setTutoresFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    cargarTutores();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setTutoresFiltrados(tutores);
    } else {
      const filtered = tutores.filter(tutor =>
        tutor.usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.materias?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setTutoresFiltrados(filtered);
    }
  }, [searchTerm, tutores]);

  const cargarTutores = async () => {
    try {
      const data = await tutoresAPI.listar();
      setTutores(data.tutores || []);
      setTutoresFiltrados(data.tutores || []);
    } catch (err) {
      console.error('Error al cargar tutores:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Cargando tutores disponibles..." />;
  }

  return (
    <div className="space-y-6">
      {/* Barra de búsqueda */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-cyan-100">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar por nombre o materia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {tutoresFiltrados.length} {tutoresFiltrados.length === 1 ? 'tutor encontrado' : 'tutores encontrados'}
        </p>
      </div>

      {/* Lista de tutores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutoresFiltrados.length === 0 ? (
          <div className="col-span-full">
            <EmptyState 
              icon={
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
              message="No se encontraron tutores"
              submessage="Intenta con otra búsqueda"
            />
          </div>
        ) : (
          tutoresFiltrados.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))
        )}
      </div>
    </div>
  );
}

export default TutoresTab;