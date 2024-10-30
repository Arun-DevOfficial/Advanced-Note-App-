// import { CiCalendar } from "react-icons/ci";
import { Link } from "react-router-dom"; // Import Link for navigation
import { CiSearch } from "react-icons/ci";
import { MdOutlineDashboard } from "react-icons/md";
import { RiDraftLine } from "react-icons/ri";
import { LuTrash } from "react-icons/lu";

export default function Sidebar() {
  return (
    <aside className="flex flex-col justify-between p-12 min-h-screen w-72">
      <div>
        <h1 className="text-emerald-600 font-bold text-2xl mb-8">Notifly</h1>

        {/* Navigation Links */}
        <ul className="space-y-4">
          <li className="flex items-center gap-2 text-gray-400 font-semibold text-lg cursor-pointer hover:text-emerald-500">
            <Link to="/dashboard" className="flex items-center gap-2">
              <MdOutlineDashboard size={24} />
              <p>Dashboard</p>
            </Link>
          </li>
          {/* <li className="flex items-center gap-2 text-gray-400 font-semibold text-lg cursor-pointer hover:text-emerald-600">
            <Link to="/dashboard/calendar" className="flex items-center gap-2">
              <CiCalendar size={24} />
              <p>Calendar</p>
            </Link>
          </li> */}
          <li className="flex items-center gap-2 text-gray-400 font-semibold text-lg cursor-pointer hover:text-emerald-600">
            <Link to="/dashboard/search" className="flex items-center gap-2">
              <CiSearch size={24} color="grey" />
              <p>Search</p>
            </Link>
          </li>
          <li className="flex items-center gap-2 text-gray-400 font-semibold text-lg cursor-pointer hover:text-emerald-600">
            <Link to="/dashboard/archive" className="flex items-center gap-2">
              <RiDraftLine size={24} />
              <p>Archive</p>
            </Link>
          </li>
          <li className="flex items-center gap-2 text-gray-400 font-semibold text-lg cursor-pointer hover:text-emerald-600">
            <Link to="/dashboard/trash" className="flex items-center gap-2">
              <LuTrash size={24} />
              <p>Trash</p>
            </Link>
          </li>
        </ul>
      </div>

      {/* Upgrade Section */}
      <div className="mt-12 rounded-lg text-center">
        <p className="text-gray-700 font-medium text-sm mb-4 text-balance">
          Want unlimited note-taking features & more?
        </p>
        <img
          src="https://img.freepik.com/free-vector/agile-method-concept-illustration_114360-9826.jpg?t=st=1730266643~exp=1730270243~hmac=c4b8059fe7302baf8b1cec8365a87c5e431e95c70b0247a82649f3672a963d4c&w=1380"
          alt="Upgrade Pro"
          className="w-32 mx-auto mb-4"
        />
        <button className="w-full bg-emerald-600 text-white py-2 rounded-md font-semibold hover:bg-emerald-700 transition-colors duration-200">
          Upgrade Pro
        </button>
      </div>
    </aside>
  );
}
