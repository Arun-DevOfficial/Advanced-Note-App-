import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../Services/supabaseClient"; // Ensure this points to your actual Supabase client file

// Fetch all items from Trash
export const useFetchTrash = () => {
  return useQuery({
    queryKey: ["trash"],
    queryFn: async () => {
      const { data, error } = await supabase.from("Trash").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

// Move a trash item back to Notes table by ID
export const useMoveTrashToNotes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (trashItem) => {
      // Insert the item into the Notes table
      const { error: insertError } = await supabase.from("Notes").insert([
        {
          title: trashItem.title,
          description: trashItem.description,
          // Add other necessary fields from the trash item
        },
      ]);
      if (insertError) throw new Error(insertError.message);

      // Delete the item from the Trash table
      const { error: deleteError } = await supabase
        .from("Trash")
        .delete()
        .eq("id", trashItem.id);
      if (deleteError) throw new Error(deleteError.message);

      return trashItem.id; // Return the ID of the moved trash item
    },
    onError: (error) => {
      console.error("Error moving trash item to notes:", error);
    },
    onSuccess: (movedId) => {
      console.log("Trash item moved to notes successfully:", movedId);
      // Invalidate and refetch trash items after moving
      queryClient.invalidateQueries(["trash"]);
    },
  });
};
