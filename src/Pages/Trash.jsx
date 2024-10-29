import { FaTrashAlt } from "react-icons/fa"; // Importing a trash icon from react-icons

export default function Trash() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-600 text-center">
      <FaTrashAlt className="text-6xl text-gray-300 mb-4" />
      <h2 className="text-2xl font-semibold">Trash is empty</h2>
      <p className="mt-2 text-gray-500">
        Looks like you haven't deleted anything yet.
      </p>
    </div>
  );
}
