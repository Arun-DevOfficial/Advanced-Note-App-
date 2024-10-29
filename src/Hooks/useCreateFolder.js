import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Function to create a new folder
const createFolder = async (folderData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/folders",
      folderData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create folder");
  }
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
  try {
    const response = await axios.get("http://localhost:3000/folders");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch folders");
  }
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
  console.log(folderId);
  try {
    await axios.delete(`http://localhost:3000/folders/${folderId}`);
    return folderId;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete folder");
  }
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
