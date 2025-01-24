import { NotesType } from "./NotesType";

export type NotesContextType = {
  // List of notes
  notes: Array<NotesType>;

  // Functions to modify notes
  setNotes: React.Dispatch<React.SetStateAction<NotesType[]>>;
  addNote: (newNote: NotesType) => void;
  updateNote: (updatedNote: NotesType) => void;
  deleteNote: (noteToDelete: NotesType) => void;

  // State for managing the edit popup visibility
  editPopup: boolean;
  setEditPopup: React.Dispatch<React.SetStateAction<boolean>>;

  // State for the current note being edited or created
  note: NotesType;
  setNote: React.Dispatch<React.SetStateAction<NotesType>>;

  // Colors (list of unique colors used in notes)
  colors: string[];
  setColoursFc: (action: string) => void;

  // Filter states and filtered notes
  starFilter: boolean;
  setStarFilter: React.Dispatch<React.SetStateAction<boolean>>;
  colorFilter: string;
  setColorFilter: React.Dispatch<React.SetStateAction<string>>;
};
