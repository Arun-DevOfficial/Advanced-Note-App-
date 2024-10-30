import { createContext, useState } from "react";

export const NoteContext = createContext(); // Note Context to share

export const Provider = ({ children }) => {
  const [folderModel, setFolderModel] = useState(false);
  const [NoteModel, setNoteModel] = useState(false);
  const [UpdateNoteModel, setUpdateNoteModel] = useState(false);
  const [notes, setNotes] = useState([]);
  const [users, setUsers] = useState([
    {
      displayName: "",
      email: "",
      photoURL: "",
    },
  ]);

  // Function to set user and save it to localStorage
  const handleSetUser = (user) => {
    setUsers(user);
    localStorage.setItem("user", JSON.stringify(user)); // Store user data in localStorage
  };

  return (
    <NoteContext.Provider
      value={{
        folderModel,
        setFolderModel,
        NoteModel,
        setNoteModel,
        setUsers,
        users,
        notes,
        setNotes,
        UpdateNoteModel,
        setUpdateNoteModel,
        handleSetUser
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
