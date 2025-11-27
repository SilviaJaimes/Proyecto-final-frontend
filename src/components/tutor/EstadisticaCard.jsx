function EstadisticaCard({ titulo, valor, color }) {
  const colorClasses = {
    blue: 'from-blue-400 to-blue-600',
    yellow: 'from-yellow-400 to-yellow-600',
    cyan: 'from-cyan-400 to-cyan-600',
    green: 'from-green-400 to-green-600',
    red: 'from-red-400 to-red-600',
    gray: 'from-gray-400 to-gray-600',
  };

  return (
    <div className={`bg-linear-to-br ${colorClasses[color]} rounded-xl p-4 text-white shadow-lg`}>
      <p className="text-sm font-medium opacity-90">{titulo}</p>
      <p className="text-3xl font-bold mt-1">{valor}</p>
    </div>
  );
}

export default EstadisticaCard;