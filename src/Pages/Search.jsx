import { useContext } from "react";
import { useFetchNotes } from "../Hooks/useNotes";
import { NoteContext } from "../Context/NoteContext";

export default function Search() {
  const { data: notesData, isLoading, error } = useFetchNotes(); // Fetch notes using the custom hook
  const { notes } = useContext(NoteContext); // Get notes from context

  // display: context notes if available, otherwise notesData
  const displayNotes = notes && notes.length > 0 ? notes : notesData;

  // Handle loading and error states
  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">
        Error fetching notes: {error.message}
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {displayNotes.map((note,index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {note.title}
          </h3>
          <p className="text-gray-500 text-sm mb-1">{note.date}</p>
          <p className="text-gray-700 mb-4">{note.description}</p>
          <p className="text-sm text-gray-500 italic">{note.folder}</p>
          <button className="mt-4 bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors duration-200">
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}
