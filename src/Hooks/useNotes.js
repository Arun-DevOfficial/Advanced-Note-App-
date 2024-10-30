import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../Services/supabaseClient";

// Fetch all notes
export const useFetchNotes = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("Notes").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

// Create a new note
export const useCreateNote = () => {
  return useMutation({
    mutationFn: async (note) => {
      const { data, error } = await supabase.from("Notes").insert(note);
      if (error) throw new Error(error.message);
      return data;
    },
    onError: (error) => {
      console.error("Error creating note:", error);
    },
  });
};

// Update an existing note
export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updatedNote }) => {
      const { data, error } = await supabase
        .from("Notes")
        .update(updatedNote)
        .eq("id", id);
      if (error) throw new Error(error.message);
      return data;
    },
    onError: (error) => {
      console.error("Error updating note:", error);
    },
    onSuccess: () => {
      // Invalidate and refetch notes after update
      queryClient.invalidateQueries(["notes"]);
    },
  });
};

// Delete a note by ID and move it to Trash
export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      // Step 1: Fetch the note to be deleted
      const { data: noteData, error: fetchError } = await supabase
        .from("Notes")
        .select("*")
        .eq("id", id)
        .single(); // Get a single note
      if (fetchError)
        throw new Error(`Error fetching note: ${fetchError.message}`);
      if (!noteData) throw new Error("No note found with this ID.");

      // Step 2: Insert the note into the Trash table
      const { error: insertError } = await supabase.from("Trash").insert({
        title: noteData.title,
        description: noteData.description,
        folder: noteData.folder,
        deleted_at: new Date(), 
      });
      if (insertError)
        throw new Error(`Error moving note to Trash: ${insertError.message}`);

      // Step 3: Delete the note from the Notes table
      const { error: deleteError } = await supabase
        .from("Notes")
        .delete()
        .eq("id", id);
      if (deleteError)
        throw new Error(`Error deleting note: ${deleteError.message}`);

      return id; // Return the deleted note ID
    },
    onError: (error) => {
      console.error("Error deleting note:", error);
    },
    onSuccess: (deletedId) => {
      console.log("Note deleted successfully:", deletedId);
      // Invalidate and refetch notes after deletion
      queryClient.invalidateQueries(["notes"]);
    },
  });
};
