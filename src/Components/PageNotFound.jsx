import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-emerald-500">404</h1>
        <p className="text-xl mt-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="mt-2 text-gray-500">
          It might have been moved or deleted.
        </p>
      </div>

      <Link
        to="/"
        className="mt-6 flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors duration-200"
      >
        <AiOutlineHome className="text-xl" />
        Go to Homepage
      </Link>
    </div>
  );
}
