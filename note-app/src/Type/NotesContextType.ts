import { NotesType } from "./NotesType";

export type NotesContextType = {
  notes: Array<NotesType>;
  setNotes: React.Dispatch<React.SetStateAction<NotesType[]>>;
};
