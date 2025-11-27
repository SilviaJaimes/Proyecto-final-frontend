function EmptyState({ icon, message, submessage }) {
  return (
    <div className="text-center py-12">
      {icon}
      <p className="text-gray-500">{message}</p>
      {submessage && <p className="text-sm text-gray-400 mt-2">{submessage}</p>}
    </div>
  );
}

export default EmptyState;