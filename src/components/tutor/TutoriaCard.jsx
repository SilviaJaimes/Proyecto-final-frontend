function TutoriaCard({ tutoria, onRegistrarResumen }) {
  return (
    <div className="p-6 bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800">
            {tutoria.estudiante?.usuario?.nombre || 'Estudiante'}
          </h3>
          <div className="mt-2 space-y-1 text-sm">
            <p><span className="font-semibold">Fecha:</span> {new Date(tutoria.fecha).toLocaleDateString('es-ES')}</p>
            <p><span className="font-semibold">Hora:</span> {tutoria.hora}</p>
            {tutoria.tema && <p><span className="font-semibold">Tema:</span> {tutoria.tema}</p>}
            {tutoria.resumen && (
              <p className="mt-2 p-3 bg-white rounded-lg">
                <span className="font-semibold">Resumen:</span> {tutoria.resumen}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            tutoria.estado === 'finalizada' ? 'bg-green-100 text-green-700' :
            tutoria.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-700' :
            tutoria.estado === 'rechazada' ? 'bg-red-100 text-red-700' :
            tutoria.estado === 'cancelada' ? 'bg-gray-100 text-gray-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {tutoria.estado}
          </span>
          {tutoria.estado === 'aceptada' && !tutoria.resumen && (
            <button
              onClick={() => onRegistrarResumen(tutoria)}
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg text-sm font-semibold hover:bg-cyan-600 transition-colors cursor-pointer"
            >
              Registrar resumen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TutoriaCard;