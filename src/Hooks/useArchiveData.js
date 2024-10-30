import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../Services/supabaseClient"; // Ensure this points to your actual Supabase client file

// Function to fetch archive data from Supabase
const fetchArchiveData = async () => {
  const { data, error } = await supabase.from("Archive").select("*");
  if (error) throw new Error("Failed to fetch archive data: " + error.message);
  return data;
};

// Function to post new archive data to Supabase
const postArchiveData = async (newItem) => {
  const { data, error } = await supabase.from("Archive").insert([newItem]);
  if (error) throw new Error("Failed to post archive data: " + error.message);
  return data;
};

// Custom hook for fetching and posting archive data
export function useArchiveData() {
  const queryClient = useQueryClient();

  // Query for fetching archive data
  const archiveQuery = useQuery({
    queryKey: ["archiveData"],
    queryFn: fetchArchiveData,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    refetchOnWindowFocus: false,
  });

  // Mutation for posting new archive data
  const archiveMutation = useMutation({
    mutationFn: postArchiveData,
    onSuccess: () => {
      // Invalidate and refetch archive data after a new item is added
      queryClient.invalidateQueries(["archiveData"]);
    },
    onError: (error) => {
      console.error("Error posting archive data:", error.message);
    },
  });

  return {
    archiveItems: archiveQuery.data,
    isLoading: archiveQuery.isLoading,
    error: archiveQuery.error,
    postArchive: archiveMutation.mutate, // function to post new data
  };
}
