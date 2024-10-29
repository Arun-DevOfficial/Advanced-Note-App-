import { useContext, useState } from "react";
import { useCreateNote } from "../Hooks/useNotes"; // Import the custom hook
import { NoteContext } from "../Context/NoteContext";
import { toast, Toaster } from "react-hot-toast"; // Import toast from react-hot-toast
import axios from "axios"; // Import axios for API requests

export default function NoteForm() {
  const { NoteModel, setNoteModel } = useContext(NoteContext);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(""); // State for selected folder

  // Folder options (replace with actual folder names from context or state)
  const folderOptions = ["Work Notes", "Personal Notes", "Important"];

  // Initialize the create note mutation
  const createNoteMutation = useCreateNote();

  // Function to handle draft saving
  const saveDraft = async (noteData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/archive",
        noteData
      );
      toast.success("Draft saved successfully!");
      console.log(response.data);
      // Reset form fields after saving the draft
      setTitle("");
      setDate("");
      setDescription("");
      setSelectedFolder("");
    } catch (error) {
      toast.error("Failed to save draft. Please try again.");
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the note data
    const newNote = {
      title,
      date,
      description,
      folder: selectedFolder, // Add selected folder to the note
    };

    // Trigger the note creation mutation
    createNoteMutation.mutate(newNote, {
      onSuccess: (data) => {
        toast.success("Note created successfully!");
        setNoteModel(false);
        console.log(data);
      },
      onError: (error) => {
        toast.error("Failed to create note. Please try again.");
        console.log(error);
      },
    });
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {NoteModel && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/50 z-30">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Create a New Note
              </h2>
              {/* X Icon for closing the modal */}
              <button
                type="button"
                onClick={() => setNoteModel(false)}
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
                {folderOptions.map((folder, index) => (
                  <option key={index} value={folder}>
                    {folder}
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
                onClick={() =>
                  saveDraft({
                    title,
                    date,
                    description,
                    folder: selectedFolder,
                  })
                }
              >
                Add Draft
              </button>
              <button
                type="submit"
                className="bg-emerald-600 text-white py-2 px-6 rounded-md hover:bg-emerald-700 transition-colors duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
