import React, { createContext, useState, useCallback, useEffect } from "react";
import { NotesType } from "../Type/NotesType";
import { NotesContextType } from "../Type/NotesContextType";

export const NoteContext = createContext<NotesContextType | undefined>(
  undefined
);

export const NoteContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [notes, setNotes] = useState<NotesType[]>(() => {
    try {
      const getNotes = localStorage.getItem("notes");
      const parsedNotes = getNotes ? JSON.parse(getNotes) : [];
      return Array.isArray(parsedNotes) ? parsedNotes : [];
    } catch (error) {
      console.error("Error parsing notes from localStorage:", error);
      return [];
    }
  });

  const [editPopup, setEditPopup] = useState<boolean>(false);
  const [colors, setColors] = useState<string[]>([]);
  const [note, setNote] = useState<NotesType>({
    note: "",
    pin: false,
    colour: "#eab676",
    star: false,
    date: new Date().getTime(),
  });

  useEffect(() => {
    console.log("NOTES=", notes); // 🔹 Moved logging here to prevent initialization issues
    localStorage.setItem("notes", JSON.stringify(notes)); // 🔹 Ensured it updates even when empty
  }, [notes]);

  const [starFilter, setStarFilter] = useState<boolean>(false);
  const [colorFilter, setColorFilter] = useState<string>("");

  const addNote = useCallback((newNote: NotesType) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }, []);

  const updateNote = useCallback((updatedNote: NotesType) => {
    setNotes((prevNotes) =>
      prevNotes.map((existingNote) =>
        existingNote.date === updatedNote.date ? updatedNote : existingNote
      )
    );
  }, []);

  const deleteNote = useCallback((noteToDelete: NotesType) => {
    setNotes((prevNotes) =>
      prevNotes.filter(
        (existingNote) => existingNote.date !== noteToDelete.date
      )
    );
  }, []);

  useEffect(() => {
    setColors([...new Set(notes.map((n) => n.colour))]);
  }, [notes]);

  const setColoursFc = (action: string): void => {
    setColors(() => {
      const updatedNotes =
        action === "Save"
          ? [...notes, note]
          : notes.map((existingNote) =>
              existingNote.date === note.date
                ? { ...existingNote, ...note }
                : existingNote
            );

      return [...new Set(updatedNotes.map((n) => n.colour))];
    });
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        editPopup,
        setEditPopup,
        note,
        setNote,
        addNote,
        updateNote,
        deleteNote,
        colors,
        setColoursFc,
        starFilter,
        setStarFilter,
        colorFilter,
        setColorFilter,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
