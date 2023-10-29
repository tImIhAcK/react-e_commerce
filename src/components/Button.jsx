export default function Button({ text,  type, disabled }) {
  return (
    <button type={type} disabled={disabled} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full">
      {text} 
    </button>
  );
}