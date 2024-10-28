import { useContext } from "react";
import NoteCard from "../Components/NoteCard";
import NoteFolder from "../Components/NoteFolder";
import Createfolder from "../Components/Createfolder";
import { AiOutlineFileAdd } from "react-icons/ai";
import { NoteContext } from "../Context/NoteContext";

// Define a professional color palette
const colorPalette = [
  "#dff2ff",
  "#ffd7d4",
  "#fefbec",
  "#F3FF33",
  "#FF33A1",
  "#33FFF7",
  "#FF33D4",
  "#D4FF33",
];

// Function to get a random color from the color palette
const getRandomColor = () => {
  return colorPalette[Math.floor(Math.random() * colorPalette.length)];
};

export default function Home() {
  const { NoteModel, setNoteModel } = useContext(NoteContext);
  return (
    <>
      <section className="p-4 bg-gray-50 rounded-lg">
        <div id="Recent Folder" className="flex flex-col gap-5 py-8">
          <h1 className="font-semibold text-2xl">Recent Folders</h1>
          <ul className="flex gap-5">
            <li className="font-medium text-gray-400 text-md">Todays</li>
            <li className="font-medium text-gray-400 text-md">This Week</li>
            <li className="font-medium text-gray-400 text-md">This Month</li>
          </ul>
          <div className="flex gap-5">
            {Array.from({ length: 3 }, (_, index) => {
              const randomColor = getRandomColor(); // Get a random color from the palette
              return (
                <div key={index}>
                  <NoteFolder color={randomColor} folderName={""} date={""} />
                </div>
              );
            })}
            <div className="p-4">
              <Createfolder />
            </div>
          </div>
        </div>
        <div id="Recent Folder" className="flex flex-col gap-5 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold text-2xl mb-4">My Notes</h1>
              <ul className="flex gap-5">
                <li className="font-medium text-gray-400 text-md">Todays</li>
                <li className="font-medium text-gray-400 text-md">This Week</li>
                <li className="font-medium text-gray-400 text-md">
                  This Month
                </li>
              </ul>
            </div>
            <div
              onClick={() => setNoteModel(!NoteModel)}
              className="flex items-center gap-2 border border-emerald-400 cursor-pointer hover:bg-emerald-500 hover:text-white px-4 py-2 rounded-lg"
            >
              <AiOutlineFileAdd />
              <p>Add note</p>
            </div>
          </div>
          <div className="flex gap-5">
            {Array.from({ length: 3 }, (_, index) => {
              // const randomColor = getRandomColor(); // Get a random color from the palette
              return (
                <div key={index}>
                  <NoteCard />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
