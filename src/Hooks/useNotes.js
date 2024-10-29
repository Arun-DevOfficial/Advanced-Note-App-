import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

// API Base URL for notes
const NOTES_API_URL = "http://localhost:3000/notes";

// Fetch all notes
export const useFetchNotes = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const { data } = await axios.get(NOTES_API_URL);
      return data;
    },
  });
};

// Create a new note
export const useCreateNote = () => {
  return useMutation({
    mutationFn: async (note) => {
      const { data } = await axios.post(NOTES_API_URL, note);
      return data;
    },
  });
};
