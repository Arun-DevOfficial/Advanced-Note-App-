import { useContext, useState } from "react";
import { NoteContext } from "../Context/NoteContext";

export default function NoteForm() {
  const { NoteModel, setNoteModel } = useContext(NoteContext);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // State update logic here
    setNoteModel(false);
    setTitle("");
    setDate("");
    setDescription("");
  };

  return (
    <div
      className={`absolute inset-0 flex justify-center items-center bg-black/20 ${
        NoteModel ? "block" : "hidden"
      } z-30`}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Create a New Note
        </h2>

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

        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="bg-transparent border border-gray-300 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-200 transition-colors duration-200"
            onClick={() => setNoteModel(!NoteModel)}
          >
            Cancel
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
  );
}
