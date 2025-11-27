function SolicitudCard({ solicitud, onResponder }) {
  return (
    <div className="p-6 bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800">
            {solicitud.estudiante?.usuario?.nombre}
          </h3>
          <p className="text-sm text-gray-600">{solicitud.estudiante?.usuario?.correo}</p>
          <div className="mt-3 space-y-1">
            <p className="text-sm">
              <span className="font-semibold">Fecha:</span>{' '}
              {new Date(solicitud.fecha).toLocaleDateString('es-ES')}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Hora:</span> {solicitud.hora}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Tema:</span> {solicitud.tema || 'No especificado'}
            </p>
          </div>
        </div>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
          Pendiente
        </span>
      </div>

      <div className="flex space-x-3 mt-4">
        <button
          onClick={() => onResponder(solicitud.id, 'aceptar')}
          className="w-full py-3 bg-linear-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
        >
          Aceptar
        </button>

        <button
          onClick={() => onResponder(solicitud.id, 'rechazar')}
          className="w-full py-3 bg-linear-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}

export default SolicitudCard;