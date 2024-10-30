import { useArchiveData } from "../Hooks/useArchiveData";

export default function Archive() {
  const { archiveItems, isLoading, isError, error } = useArchiveData();

  if (isLoading) {
    return (
      <div className="text-center text-xl font-semibold mt-10">Loading...</div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        Error: {error.message}
      </div>
    );
  }

  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-8">Archive</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {archiveItems?.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <button className="mt-auto bg-emerald-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
