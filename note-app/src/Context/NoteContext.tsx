import React, { createContext, useState, useCallback, useEffect } from "react";
import { NotesType } from "../Type/NotesType";
import { NotesContextType } from "../Type/NotesContextType";

// Create the context with initial type definitions
export const noteContext = createContext<NotesContextType | undefined>(
  undefined
);

export const NoteContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  // State for notes, editPopup, and the current note being edited
  const [notes, setNotes] = useState<NotesType[]>([]);
  const [editPopup, setEditPopup] = useState<boolean>(false);
  const [colors, setColors] = useState<string[]>([]);
  const [note, setNote] = useState<NotesType>({
    note: "",
    pin: false,
    colour: "#eab676",
    star: false,
    date: new Date().getTime(),
  });

  // Filters (starFilter, colorFilter) and filteredNotes in the context
  const [starFilter, setStarFilter] = useState<boolean>(false);
  const [colorFilter, setColorFilter] = useState<string>("");

  // Add a new note to the notes array
  const addNote = useCallback((newNote: NotesType) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }, []);

  // Update an existing note
  const updateNote = useCallback((updatedNote: NotesType) => {
    setNotes((prevNotes) =>
      prevNotes.map((existingNote) =>
        existingNote.date === updatedNote.date ? updatedNote : existingNote
      )
    );
  }, []);

  // Delete a note
  const deleteNote = useCallback((noteToDelete: NotesType) => {
    setNotes((prevNotes) =>
      prevNotes.filter(
        (existingNote) => existingNote.date !== noteToDelete.date
      )
    );
  }, []);

  // Effect hook to update color list based on current notes
  useEffect(() => {
    const noteColors = notes.map((n) => n.colour); // Extract colors from notes
    setColors(Array.from(new Set(noteColors))); // Ensure unique colors
  }, [notes]);
  // Update colors when notes are added or updated
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

      const noteColors = updatedNotes.map((n) => n.colour); // Extract colors from notes
      return Array.from(new Set(noteColors)); // Ensure unique colors
    });
  };

  return (
    <noteContext.Provider
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
    </noteContext.Provider>
  );
};
