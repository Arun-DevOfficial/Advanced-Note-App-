import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "../Services/supabaseClient"; // Ensure this points to your actual Supabase client file

// Function to save a draft
const saveDraft = async (noteData) => {
  const { data, error } = await supabase.from("archive").insert(noteData);
  if (error) throw new Error(error.message || "Failed to save draft");
  return data;
};

// Function to fetch drafts
const fetchDrafts = async () => {
  const { data, error } = await supabase.from("archive").select("*");
  if (error) throw new Error(error.message || "Failed to fetch drafts");
  return data;
};

// Custom hook for managing drafts
export const useSaveDraft = () => {
  // Mutation for saving a draft
  const saveDraftMutation = useMutation(saveDraft, {
    onSuccess: () => {
      console.log("Draft saved successfully");
      // Handle success if needed, e.g., refetch drafts
    },
    onError: (error) => {
      console.error("Error saving draft:", error);
    },
  });

  // Query for fetching drafts
  const draftsQuery = useQuery("drafts", fetchDrafts, {
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
  });

  return {
    saveDraftMutation,
    draftsQuery,
  };
};
