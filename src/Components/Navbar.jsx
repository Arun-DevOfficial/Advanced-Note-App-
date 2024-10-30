import { useContext, useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";
import { LuUserCircle } from "react-icons/lu";
import { NoteContext } from "../Context/NoteContext";
import { useSearchNotes } from "../Hooks/useSearchNotes"; // Import the search notes hook
import { toast, Toaster } from "react-hot-toast";

export default function Navbar() {
  const { setNotes, users } = useContext(NoteContext);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm); // Debounced search term

  // Debounce the search term to avoid too many API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Use the search notes hook with the debounced search term
  const {
    data: searchResults,

    isError,
  } = useSearchNotes(debouncedSearchTerm);
  console.log("Search Results:", searchResults);

  // Update setNotes context when searchResults is successfully fetched
  useEffect(() => {
    if (searchResults) {
      setNotes(searchResults); // Update context with search results
      console.log("Navbar search results:", searchResults);
    }
  }, [searchResults, setNotes]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isError) return toast.error("Failed to search result!");

  return (
    <>
      <nav className="flex flex-col p-3 space-y-4">
        <div className="flex justify-between items-center">
          <a
            href="#home"
            className="uppercase font-semibold text-2xl text-neutral-800"
          >
            My Notes
          </a>

          {/* Search Box */}
          <div className="max-w-xs bg-gray-100 rounded-md py-2 px-4 flex gap-3 items-center focus-within:border-emerald-500 transition-all duration-200">
            <IoSearchOutline className="text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search Notes"
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-transparent placeholder:font-medium flex-1 outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* User Info */}
          <div className="flex gap-12 items-center">
            <div className="flex items-center gap-5">
              <p className="font-medium text-lg">
                {users?.displayName || "Guest"}{" "}
                {/* Use fetched user's display name */}
              </p>
              {users?.photoURL ? (
                <img
                  src={users?.photoURL} // Use fetched user's photoURL
                  alt={users.displayName || "Profile"}
                  className="rounded-full w-8 h-8"
                  onError={(e) => {
                    e.target.src =
                      "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?t=st=1730259992~exp=1730263592~hmac=a5208271330bec31877056d193244145984403690842458093dfb91ce323be5a&w=826"; // Placeholder image
                  }}
                />
              ) : (
                <LuUserCircle size={23} color="gray" />
              )}
            </div>
            <CiMenuFries size={22} />
          </div>
        </div>
      </nav>
      <Toaster />
    </>
  );
}
