import { useContext } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";
import { LuUserCircle } from "react-icons/lu";
import { NoteContext } from "../Context/NoteContext";

export default function Navbar() {
  const { users } = useContext(NoteContext);
  console.log(users.photoURL);

  return (
    <nav className="flex justify-between items-center">
      <div>
        <a
          href="#home"
          className="uppercase font-semibold text-2xl text-neutral-800"
        >
          My Notes
        </a>
      </div>

      {/* Search Box */}
      <div className="max-w-xs bg-gray-100 rounded-md py-2 px-4 flex gap-3 items-center focus-within:border-emerald-500 transition-all duration-200">
        <IoSearchOutline className="text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search Notes"
          className="bg-transparent placeholder:font-medium flex-1 outline-none text-gray-700 placeholder-gray-400"
        />
      </div>

      <div className="flex gap-12 items-center">
        <div className="flex items-center gap-5">
          <p className="font-medium text-lg">
            {users ? users.displayName : "Guest"}
          </p>
          {users?.photoURL ? ( // Using optional chaining
            <img
              src={users.photoURL} // Ensure this URL is correct and accessible
              alt={users.displayName || "Profile"}
              className="rounded-full w-8 h-8"
              onError={(e) => {
                // Optional: Fallback to a default image if the provided URL fails
                e.target.src = "https://via.placeholder.com/32"; // Placeholder image
              }}
            />
          ) : (
            <LuUserCircle size={23} color="gray" />
          )}
        </div>
        <CiMenuFries size={22} />
      </div>
    </nav>
  );
}
