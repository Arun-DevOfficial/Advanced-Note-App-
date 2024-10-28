import { IoDocument } from "react-icons/io5";
import { useContext } from "react";
import { NoteContext } from "../Context/NoteContext";
import FolderForm from "./FolderForm";

export default function Uploader() {
  const { folderModel, setFolderModel } = useContext(NoteContext);

  const handleFolderModel = () => {
    setFolderModel(!folderModel);
    console.log("Clicked");
  };

  return (
    <>
      <div
        id="uploader"
        onClick={handleFolderModel}
        className="flex flex-col items-center justify-center border-dotted border-2 border-gray-400 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
      >
        <IoDocument size={40} className="text-gray-600 mb-2" />
        <p className="text-gray-700 font-semibold">New Folder</p>
      </div>
      {folderModel && <FolderForm />}
    </>
  );
}
