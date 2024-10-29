// Hooks/useSaveDraft.js
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

// Function to save a draft
const saveDraft = async (noteData) => {
  const response = await axios.post("http://localhost:3000/archive", noteData);
  return response.data;
};

// Function to fetch drafts
const fetchDrafts = async () => {
  const response = await axios.get("http://localhost:3000/archive");
  return response.data;
};

// Custom hook for managing drafts
export const useSaveDraft = () => {
  // Mutation for saving a draft
  const saveDraftMutation = useMutation(saveDraft, {
    onSuccess: () => {
      // Handle success if needed
    },
    onError: (error) => {
      console.error("Error saving draft:", error);
    },
  });

  // Query for fetching drafts
  const draftsQuery = useQuery("drafts", fetchDrafts, {
    staleTime: "30s", // Data is fresh for 5 minutes
  });

  return {
    saveDraftMutation,
    draftsQuery,
  };
};
