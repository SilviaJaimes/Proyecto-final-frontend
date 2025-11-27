import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderEstudiante from '../components/estudiante/HeaderEstudiante';
import TabButton from '../components/tutor/TabButton';
import TutoresTab from '../components/estudiante/TutoresTab';
import MisTutoriasTab from '../components/estudiante/MisTutoriasTab';
import HistorialEstudianteTab from '../components/estudiante/HistorialEstudianteTab';

function DashboardEstudiante() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tutores');
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioData = localStorage.getItem('usuario');
    if (usuarioData) {
      const user = JSON.parse(usuarioData);
      setUsuario(user);
      
      if (user.rol !== 'estudiante') {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'tutores':
        return <TutoresTab />;
      case 'mis-tutorias':
        return <MisTutoriasTab />;
      case 'historial':
        return <HistorialEstudianteTab />;
      default:
        return <TutoresTab />;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-50 via-sky-50 to-blue-100">
      <HeaderEstudiante usuario={usuario} onLogout={handleLogout} />

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-2 flex space-x-2 overflow-x-auto">
          <TabButton
            active={activeTab === 'tutores'}
            onClick={() => setActiveTab('tutores')}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          >
            Buscar tutores
          </TabButton>
          <TabButton
            active={activeTab === 'mis-tutorias'}
            onClick={() => setActiveTab('mis-tutorias')}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
          >
            Mis tutorías
          </TabButton>
          <TabButton
            active={activeTab === 'historial'}
            onClick={() => setActiveTab('historial')}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            Historial
          </TabButton>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>
    </div>
  );
}

export default DashboardEstudiante;