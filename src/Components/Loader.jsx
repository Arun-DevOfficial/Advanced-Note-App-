export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-16 h-16">
        <div className="w-16 h-16 border-4 border-t-emerald-500 border-white rounded-full animate-spin"></div>
      </div>
      <span className="ml-4 text-emerald-700 font-medium">Loading...</span>
    </div>
  );
}
