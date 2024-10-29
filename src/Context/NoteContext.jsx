import { createContext, useState } from "react";

export const NoteContext = createContext(); // Note Context to share

export const Provider = ({ children }) => {
  const [folderModel, setFolderModel] = useState(false);
  const [NoteModel, setNoteModel] = useState(false);
  const [users, setUsers] = useState([
    {
      displayName: "",
      email: "",
      photoURL: "",
    },
  ]);

  return (
    <NoteContext.Provider
      value={{
        folderModel,
        setFolderModel,
        NoteModel,
        setNoteModel,
        setUsers,
        users,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
