import EmptyState from '../../common/EmptyState';

function HorariosList({ horarios }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-cyan-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <svg className="w-6 h-6 mr-2 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Mis horarios disponibles
      </h2>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {horarios.length === 0 ? (
          <EmptyState 
            icon={
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            message="No hay horarios registrados"
            submessage="Crea tu primer horario usando el formulario"
          />
        ) : (
          horarios.map((horario) => (
            <div
              key={horario.id}
              className="p-4 bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800">
                    {new Date(horario.fecha).toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Hora: {horario.hora}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  horario.estado === 'disponible'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {horario.estado}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HorariosList;