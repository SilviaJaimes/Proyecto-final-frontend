import { useState } from 'react';

function ModalResumen({ tutoria, onClose, onSubmit }) {
  const [resumen, setResumen] = useState({ resumen: '', calificacion: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(resumen);
    setResumen({ resumen: '', calificacion: '' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Registrar Resumen</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Resumen de la tutoría
            </label>
            <textarea
              value={resumen.resumen}
              onChange={(e) => setResumen({ ...resumen, resumen: e.target.value })}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Describe lo que se trabajó en la tutoría..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Calificación (1-10)
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={resumen.calificacion}
              onChange={(e) => setResumen({ ...resumen, calificacion: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 py-3 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all cursor-pointer"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalResumen;