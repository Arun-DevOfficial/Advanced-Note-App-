import { IoDocument } from "react-icons/io5";
import { IoEllipsisVerticalOutline } from "react-icons/io5";

export default function NoteFolder({ color, folderName, date }) {
  const backgroundColor = `${color}99`;

  return (
    <>
      <div
        className={`w-64 h-36 flex flex-col justify-between p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer border`}
        style={{ backgroundColor }} // Apply the RGBA color style here
      >
        <div className="flex justify-between items-center">
          <IoDocument color="white" size={50} />
          <IoEllipsisVerticalOutline size={20} color="white" />
        </div>
        <p className="font-medium text-lg mt-2">Work Details</p>
        <p className="font-medium text-sm">28/10/2024</p>
      </div>
    </>
  );
}
