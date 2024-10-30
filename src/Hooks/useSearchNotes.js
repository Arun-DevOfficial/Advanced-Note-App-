import { useQuery } from "@tanstack/react-query";
import { supabase } from "../Services/supabaseClient"; // Ensure this points to your actual Supabase client file


// Function to fetch notes based on a search term
const fetchNotes = async (searchTerm) => {
  const { data, error } = await supabase
    .from("Notes") // Replace with your actual table name
    .select("*")
    .ilike("title", `%${searchTerm}%`); // Use ilike for case-insensitive matching

  if (error) throw new Error(error.message);
  return data;
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
