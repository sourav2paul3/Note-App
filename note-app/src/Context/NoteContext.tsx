import React, { createContext, useState } from "react";
import { NotesType } from "../Type/NotesType";
import { NotesContextType } from "../Type/NotesContextType";

export const noteContext = createContext<NotesContextType | undefined>(
  undefined
);

export const NoteContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [notes, setNotes] = useState<NotesType[]>([]);
  return (
    <noteContext.Provider value={{ notes, setNotes }}>
      <div>{children}</div>
    </noteContext.Provider>
  );
};
