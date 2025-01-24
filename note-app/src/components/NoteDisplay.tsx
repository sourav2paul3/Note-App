import { NotesType } from "../Type/NotesType";

const NoteDisplay: React.FC<{ note: NotesType }> = ({ note }) => {
  return <div style={{ backgroundColor: note.colour }}>{note.note}</div>;
};

export default NoteDisplay;
