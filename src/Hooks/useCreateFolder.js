// src/Hooks/useCreateFolder.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// Create a function to post a new folder
const createFolder = async (folderData) => {
  try {
    const response = await axios.post("http://localhost:3000/folders", folderData);
    return response.data; // Return the created folder data
  } catch (error) {
    // Handle errors accordingly
    throw new Error(error.response?.data?.message || "Failed to create folder");
  }
};

// Export the custom hook that uses the mutation
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
