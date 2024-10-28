import { createContext, useState } from "react";

export const NoteContext = createContext(); // Note Context to share

export const Provider = ({ children }) => {
  const [folderModel, setFolderModel] = useState(false);
  const [NoteModel, setNoteModel] = useState(false);

  return (
    <NoteContext.Provider
      value={{ folderModel, setFolderModel, NoteModel, setNoteModel }}
    >
      {children}
    </NoteContext.Provider>
  );
};
