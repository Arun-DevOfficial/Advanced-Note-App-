import { useContext, useState } from "react";
import { NoteContext } from "../Context/NoteContext";
import { toast, Toaster } from "react-hot-toast";
import { useCreateFolder } from "../Hooks/useCreateFolder";

export default function FolderForm() {
  const { folderModel, setFolderModel } = useContext(NoteContext);
  const [folderName, setFolderName] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Initialize the folder creation mutation
  const createFolderMutation = useCreateFolder();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the folder data
    const newFolder = {
      name: folderName,
      dueDate: dueDate,
    };

    // Trigger the folder creation mutation
    createFolderMutation.mutate(newFolder, {
      onSuccess: (data) => {
        toast.success("Folder created successfully!");
        setFolderModel(false);
        setFolderName("");
        setDueDate("");
        console.log(data);
      },
      onError: (error) => {
        toast.error("Failed to create folder. Please try again.");
        console.log(error);
      },
    });
  };

  return (
    <>
      <Toaster />
      <div
        className={`absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 ${
          folderModel ? "block" : "hidden"
        } z-30`}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-80"
        >
          <h2 className="text-xl font-semibold mb-4 text-center">
            Create a New Folder
          </h2>

          {/* Folder Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Folder Name
            </label>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter folder name"
              required
            />
          </div>

          {/* Due Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-transparent border border-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors duration-200"
              onClick={() => setFolderModel(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
