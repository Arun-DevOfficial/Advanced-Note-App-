import { useState, useContext, useEffect } from "react";
import { NoteContext } from "../Context/NoteContext";
import { Toaster, toast } from "react-hot-toast";
import { useUpdateNote } from "../Hooks/useCreateNote"; // Ensure the import matches your hooks file structure
import { useFetchFolders } from "../Hooks/useFetchFolders"; // Import the hook
import { useFetchNote } from "../Hooks/useFetchNote"; // Import the hook to fetch a single note
import Loader from "./Loader";

export default function UpdateNoteForm() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const { UpdateNoteModel, setUpdateNoteModel, selectedNote } =
    useContext(NoteContext); // Assuming selectedNote is the note to be updated
  const updateNoteMutation = useUpdateNote(); // Hook for updating note
  const {
    data: folders,
    isLoading: isFoldersLoading,
    isError: isFoldersError,
  } = useFetchFolders(); // Fetch folders
  const {
    data: noteData,
    isLoading: isNoteLoading,
    isError: isNoteError,
  } = useFetchNote(selectedNote?.id);

  // Populate form with existing note
  useEffect(() => {
    if (UpdateNoteModel && noteData) {
      setTitle(noteData.title || "");
      setDate(noteData.date || "");
      setDescription(noteData.description || "");
      setSelectedFolder(noteData.folder || "");
    }
  }, [UpdateNoteModel, noteData]);

  const handleUpdate = (e) => {
    e.preventDefault();

    // Prepare the updated note data
    const updatedNoteData = {
      id: selectedNote.id, // Assuming selectedNote contains an id field
      updatedNote: {
        title,
        date,
        description,
        folder: selectedFolder,
      },
    };

    // Trigger the note update mutation
    updateNoteMutation.mutate(updatedNoteData, {
      onSuccess: (data) => {
        toast.success("Note updated successfully!");
        setUpdateNoteModel(!UpdateNoteModel); // Close the modal
        console.log(data);
      },
      onError: (error) => {
        toast.error("Failed to update note. Please try again.");
        console.log(error);
      },
    });
  };

  if (isFoldersLoading || isNoteLoading) {
    return <Loader />; // Loader component while fetching folders or note
  }

  if (isFoldersError) {
    toast.error("Error fetching folders!"); // Error toast for folder fetching
  }

  if (isNoteError) {
    toast.error("Error fetching note!"); // Error toast for note fetching
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="absolute inset-0 flex justify-center items-center bg-black/50 z-30">
        <form
          onSubmit={handleUpdate} // Call handleUpdate on form submit
          className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-md"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Update Note
            </h2>
            {/* X Icon for closing the modal */}
            <button
              type="button"
              onClick={() => setUpdateNoteModel(!UpdateNoteModel)}
              className="text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          </div>

          {/* Note Title */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter title"
              required
            />
          </div>

          {/* Note Date */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Folder Selection Dropdown */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Folder
            </label>
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="" disabled>
                Select a folder
              </option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.name}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          {/* Note Description */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter description"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="bg-transparent border border-gray-300 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-200 transition-colors duration-200"
              onClick={() => {
                // Handle saving drafts if necessary
              }}
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="bg-emerald-600 text-white py-2 px-6 rounded-md hover:bg-emerald-700 transition-colors duration-200"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
