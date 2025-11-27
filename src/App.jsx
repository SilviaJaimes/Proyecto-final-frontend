import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardTutor from './pages/DashboardTutor';
import DashboardEstudiante from './pages/DashboardEstudiante';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard-tutor" element={<DashboardTutor />} />
        <Route path="/dashboard-estudiante" element={<DashboardEstudiante />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;