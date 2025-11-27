import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/tutor/Header';
import TabButton from '../components/tutor/TabButton';
import HorariosTab from '../components/tutor/HorariosTab';
import SolicitudesTab from '../components/tutor/SolicitudesTab';
import HistorialTab from '../components/tutor/HistorialTab';
import ReporteTab from '../components/tutor/ReporteTab';

function DashboardTutor() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('horarios');
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioData = localStorage.getItem('usuario');
    if (usuarioData) {
      const user = JSON.parse(usuarioData);
      setUsuario(user);
      
      if (user.rol !== 'tutor') {
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
      case 'horarios':
        return <HorariosTab />;
      case 'solicitudes':
        return <SolicitudesTab />;
      case 'historial':
        return <HistorialTab />;
      case 'reporte':
        return <ReporteTab />;
      default:
        return <HorariosTab />;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-50 via-sky-50 to-blue-100">
      <Header usuario={usuario} onLogout={handleLogout} />

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-2 flex space-x-2 overflow-x-auto">
          <TabButton
            active={activeTab === 'horarios'}
            onClick={() => setActiveTab('horarios')}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          >
            Mis horarios
          </TabButton>
          <TabButton
            active={activeTab === 'solicitudes'}
            onClick={() => setActiveTab('solicitudes')}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            }
          >
            Solicitudes
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
          <TabButton
            active={activeTab === 'reporte'}
            onClick={() => setActiveTab('reporte')}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          >
            Reportes
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

export default DashboardTutor;