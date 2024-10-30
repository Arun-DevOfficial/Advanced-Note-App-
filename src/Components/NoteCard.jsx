import { useContext, useState, useEffect } from "react";
import { LuFileEdit } from "react-icons/lu";
import { PiTimer } from "react-icons/pi";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { useDeleteNote } from "../Hooks/useNotes";
import { NoteContext } from "../Context/NoteContext";

export default function NoteCard({ id, date, Title, folderName, desc }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const deleteNoteMutation = useDeleteNote();
  const { setUpdateNoteModel, UpdateNoteModel } = useContext(NoteContext);

  const handleDelete = () => {
    deleteNoteMutation.mutate(id); // Pass the note ID to delete
    setShowTooltip(false); // Close the tooltip after delete
  };

  useEffect(() => {
    const formatDate = (dateString) => {
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        weekday: "long",
      };
      const dateObj = new Date(dateString);
      return dateObj.toLocaleString("en-US", options);
    };

    setFormattedDate(formatDate(date)); // Format the date
  }, [date]);

  return (
    <div className="relative bg-white p-6 rounded-lg cursor-pointer h-[360px] transition-shadow duration-300 border border-gray-200">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">{date}</p>
            <h1 className="font-semibold text-2xl mt-1">{Title}</h1>
          </div>

          <div className="cursor-pointer flex gap-3 items-center relative">
            <LuFileEdit
              size={24}
              className="text-gray-400"
              onClick={() => setUpdateNoteModel(!UpdateNoteModel)}
            />
            {/* Ellipsis Icon */}
            <IoEllipsisVerticalOutline
              size={24}
              className="text-gray-400"
              onClick={() => setShowTooltip((prev) => !prev)}
            />
            {/* Tooltip */}
            {showTooltip && (
              <div
                className="absolute top-8 right-0 bg-white text-black rounded-md shadow-lg px-2 py-1 z-10"
                onClick={() => {
                  setShowTooltip(false);
                }}
              >
                <button
                  className="text-red-500 font-medium"
                  onClick={handleDelete} // Use handleDelete directly here
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <hr className="my-4" />

        <p className="text-gray-700 text-justify">{desc}</p>

        <div className="flex gap-3 items-center mt-4 text-gray-500">
          <PiTimer size={21} />
          <p>{folderName}</p>
          <p>{formattedDate}</p> {/* Updated to show formatted date */}
        </div>
      </div>
    </div>
  );
}
