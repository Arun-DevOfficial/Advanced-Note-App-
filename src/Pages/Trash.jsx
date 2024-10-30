import { FaTrashAlt } from "react-icons/fa"; // Importing a trash icon from react-icons
import { useFetchTrash, useMoveTrashToNotes } from "../Hooks/useFetchTrash"; // Updated the import to reflect the new hook name

export default function Trash() {
  const { data: trashItems, isLoading, error } = useFetchTrash(); // Fetch trash items
  const moveTrashToNotesMutation = useMoveTrashToNotes(); // Get the move mutation

  // Handle loading and error states
  if (isLoading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">
        Error fetching trash: {error.message}
      </div>
    );

  const handleRestore = async (item) => {
    // Confirm restore action
    const confirmed = window.confirm(
      "Are you sure you want to restore this item?"
    );
    if (confirmed) {
      moveTrashToNotesMutation.mutate(item); // Call the move mutation
    }
  };

  return (
    <div className="flex flex-col h-screen text-gray-600 p-6 bg-gray-50">
      {trashItems ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {trashItems.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white shadow-md rounded-lg border border-gray-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-600 py-4 text-justify">
                  {item.description}
                </p>
                <p className="text-sm text-gray-500 italic py-2">
                  Deleted on: {new Date(item.deleted_at).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleRestore(item)} // Updated to call handleRestore
                className="mt-2 ml-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200"
              >
                Restore
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          <FaTrashAlt className="text-6xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold">Trash is empty</h2>
          <p className="mt-2 text-gray-500">
            Looks like you have not deleted anything yet.
          </p>
        </div>
      )}
    </div>
  );
}
