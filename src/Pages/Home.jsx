import { useContext } from "react";
import NoteCard from "../Components/NoteCard";
import NoteFolder from "../Components/NoteFolder";
import Createfolder from "../Components/Createfolder";
import { AiOutlineFileAdd } from "react-icons/ai";
import { NoteContext } from "../Context/NoteContext";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useFetchFolders } from "../Hooks/useCreateFolder";
import { toast, Toaster } from "react-hot-toast";
import { useFetchNotes } from "../Hooks/useNotes";

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

// Random color from the color palette
const getRandomColor = () => {
  return colorPalette[Math.floor(Math.random() * colorPalette.length)];
};

export default function Home() {
  const { NoteModel, setNoteModel } = useContext(NoteContext);
  const { data: folders, isLoading, error } = useFetchFolders();
  const { data: Notes } = useFetchNotes();

  //Error Handling & Loader inticator
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    toast.error("Failed to fetch!");
  }

  return (
    <>
      <section className="p-4 rounded-lg overflow-x-hidden">
        <div id="Recent Folder" className="flex flex-col gap-5 py-8">
          <h1 className="font-semibold text-2xl">Recent Folders</h1>
          <ul className="flex gap-5">
            <li className="font-medium text-gray-400 text-md">Todays</li>
            <li className="font-medium text-gray-400 text-md">This Week</li>
            <li className="font-medium text-gray-400 text-md">This Month</li>
          </ul>
          {/* Folder Carousel */}
          <div
            id="Carousel"
            className="w-full overflow-hidden flex items-center"
          >
            <Splide
              options={{
                perPage: 5,
                pagination: false,
                arrows: false, // Set to false to hide arrows
                gap: "0px", // Space between slides
                width: "100%", // Ensures the full width of the carousel container
                breakpoints: {
                  640: {
                    perPage: 1,
                    width: "100%", // Full width on small screens
                  },
                  768: {
                    perPage: 2,
                    width: "90%", // 90% width on medium screens
                  },
                },
              }}
              className="flex-shrink flex-grow-0 w-full"
            >
              {folders?.map((folder, index) => {
                const randomColor = getRandomColor(); // Get a random color from the palette
                return (
                  <SplideSlide key={index}>
                    <div className="flex items-center justify-center">
                      <NoteFolder
                        color={randomColor}
                        folderName={folder.name}
                        date={folder.dueDate}
                        className="min-w-[250px] max-w-[250px] h-[200px] rounded-lg p-4"
                      />
                    </div>
                  </SplideSlide>
                );
              })}
            </Splide>
            <div className="p-4 flex-shrink-0">
              <Createfolder />
            </div>
          </div>

          {/* Folder Carousel */}
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

          {/* Notes Carousel */}
          <div>
            <Splide
              options={{
                perPage: 3,
                pagination: false,
                arrows: false,
                gap: "1rem",
                breakpoints: {
                  640: {
                    perPage: 1,
                    width: "90%",
                  },
                  768: {
                    perPage: 2,
                    width: "80%",
                  },
                },
              }}
            >
              {Notes?.map((note, index) => (
                <SplideSlide key={index}>
                  <NoteCard
                    id={note.id}
                    date={note.date}
                    Title={note.title}
                    folderName={note.folder}
                    desc={note.description}
                  />
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </div>
      </section>
      <Toaster />
    </>
  );
}
