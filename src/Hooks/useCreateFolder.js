import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../Services/supabaseClient"; // Ensure this points to your actual Supabase client file


// Function to create a new folder
const createFolder = async (folderData) => {
  const { data, error } = await supabase.from("folders").insert(folderData);
  if (error) throw new Error(error.message || "Failed to create folder");
  return data;
};

// Custom hook for creating a folder
export const useCreateFolder = () => {
  return useMutation({
    mutationFn: createFolder,
    onError: (error) => {
      console.error("Error creating folder:", error);
    },
    onSuccess: (data) => {
      console.log("Folder created successfully:", data);
    },
  });
};

// Function to fetch all folders
const getFolders = async () => {
  const { data, error } = await supabase.from("folders").select("*");
  if (error) throw new Error(error.message || "Failed to fetch folders");
  return data;
};

// Custom hook for fetching folders
export const useFetchFolders = () => {
  return useQuery({
    queryKey: ["folders"],
    queryFn: getFolders,
    staleTime: 30000, // 30 seconds
    onError: (error) => {
      console.error("Error fetching folders:", error);
    },
  });
};

// Function to delete a folder by ID
const deleteFolder = async (folderId) => {
  const { error } = await supabase.from("folders").delete().eq("id", folderId);
  if (error) throw new Error(error.message || "Failed to delete folder");
  return folderId;
};

// Custom hook for deleting a folder
export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFolder,
    onError: (error) => {
      console.error("Error deleting folder:", error);
    },
    onSuccess: (deletedFolderId) => {
      console.log("Folder deleted successfully:", deletedFolderId);
      // Invalidate and refetch folders to update the UI
      queryClient.invalidateQueries(["folders"]);
    },
  });
};
