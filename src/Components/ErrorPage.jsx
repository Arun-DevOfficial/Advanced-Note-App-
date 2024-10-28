// src/components/ErrorPage.jsx
import { Link } from "react-router-dom";
import { AiOutlineReload, AiOutlineHome } from "react-icons/ai";

export default function ErrorPage() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500">Something Went Wrong</h1>
        <p className="text-lg mt-4">We encountered an unexpected error.</p>
        <p className="mt-2 text-gray-500">Please try reloading the page or returning to the homepage.</p>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleReload}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-200"
        >
          <AiOutlineReload className="text-xl" />
          Reload Page
        </button>
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors duration-200"
        >
          <AiOutlineHome className="text-xl" />
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
