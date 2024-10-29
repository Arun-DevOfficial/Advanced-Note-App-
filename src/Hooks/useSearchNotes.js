// Hooks/useSearchNotes.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Function to fetch notes based on a search term
const fetchNotes = async (searchTerm) => {
  const response = await axios.get(`http://localhost:3000/notes`);
  const filteredData = response.data.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return filteredData;
};

// Custom hook for searching notes
export const useSearchNotes = (searchTerm) => {
  return useQuery({
    queryKey: ["searchNotes", searchTerm],
    queryFn: () => fetchNotes(searchTerm),
    enabled: !!searchTerm, // Only run the query if searchTerm is not empty
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
  });
};
