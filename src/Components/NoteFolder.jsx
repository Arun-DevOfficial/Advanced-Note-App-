import { useState } from "react";
import { IoDocument } from "react-icons/io5";
import { IoEllipsisVerticalOutline } from "react-icons/io5";

export default function NoteFolder({ color, folderName, date }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const backgroundColor = `${color}99`;

  return (
    <div
      className={`relative w-64 h-36 flex flex-col justify-between p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer border`}
      style={{ backgroundColor }}
    >
      <div className="flex justify-between items-center">
        <IoDocument color="white" size={50} />

        <div className="relative">
          <IoEllipsisVerticalOutline
            size={20}
            color="white"
            onClick={() => setShowTooltip((prev) => !prev)}
            className="cursor-pointer"
          />
          {showTooltip && (
            <div
              className="absolute right-0 top-4 bg-white text-black rounded-md shadow-lg px-2 py-1 z-10"
              onClick={() => {
                // Add delete logic here
                console.log("Delete folder:", folderName);
                setShowTooltip(false);
              }}
            >
              <button className="text-red-500 font-medium">Delete</button>
            </div>
          )}
        </div>
      </div>

      <p className="font-medium text-lg mt-2">{folderName}</p>
      <p className="font-medium text-sm">{date}</p>
    </div>
  );
}
