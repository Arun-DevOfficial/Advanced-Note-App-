import { IoSearchOutline } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";
import { LuUserCircle } from "react-icons/lu";

export default function Navbar() {
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
          <p className="font-medium text-lg/7">Arun Kumar</p>
          <LuUserCircle size={23} color="gray"/>
        </div>
        <CiMenuFries size={22} />
      </div>
    </nav>
  );
}
