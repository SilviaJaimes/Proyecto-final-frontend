const API_URL = import.meta.env.VITE_API_URL;

// Función auxiliar para manejar respuestas
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Error en la petición');
  }
  
  return data;
};

// Auth endpoints
export const authAPI = {
  login: async (correo, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correo, password }),
    });
    return handleResponse(response);
  },

  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },
};

// Tutores endpoints
export const tutoresAPI = {
  listar: async () => {
    const response = await fetch(`${API_URL}/tutores`);
    return handleResponse(response);
  },

  crearHorario: async (horarioData, token) => {
    const response = await fetch(`${API_URL}/tutores/horarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(horarioData),
    });
    return handleResponse(response);
  },

  obtenerHorarios: async (tutorId) => {
    const response = await fetch(`${API_URL}/tutores/${tutorId}/horarios`);
    return handleResponse(response);
  },

  obtenerPerfil: async (token) => {
    const response = await fetch(`${API_URL}/tutores/perfil`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  actualizarPerfil: async (perfilData, token) => {
    const response = await fetch(`${API_URL}/tutores/perfil`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(perfilData),
    });
    return handleResponse(response);
  },
};

// Tutorías endpoints
export const tutoriasAPI = {
  solicitar: async (tutoriaData, token) => {
    const response = await fetch(`${API_URL}/tutorias`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(tutoriaData),
    });
    return handleResponse(response);
  },

  obtenerSolicitudes: async (token) => {
    const response = await fetch(`${API_URL}/tutorias/solicitudes`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  responder: async (tutoriaId, accion, token) => {
    const response = await fetch(`${API_URL}/tutorias/${tutoriaId}/responder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ accion }),
    });
    return handleResponse(response);
  },

  registrarResumen: async (tutoriaId, resumenData, token) => {
    const response = await fetch(`${API_URL}/tutorias/${tutoriaId}/resumen`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(resumenData),
    });
    return handleResponse(response);
  },

  cancelar: async (tutoriaId, token) => {
    const response = await fetch(`${API_URL}/tutorias/${tutoriaId}/cancelar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  obtenerHistorial: async (token) => {
    const response = await fetch(`${API_URL}/tutorias/historial`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  obtenerReporte: async (token) => {
    const response = await fetch(`${API_URL}/tutorias/reporte`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
};