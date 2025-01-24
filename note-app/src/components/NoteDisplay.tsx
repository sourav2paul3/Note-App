import { NotesType } from "../Type/NotesType";

const NoteDisplay: React.FC<{ note: NotesType }> = ({ note }) => {
  return (
    <div
      style={{ backgroundColor: note.colour }}
      className="h-[450px] w-[350px] rounded-lg"
    >
      <div className="h-[90%] border-b border-gray-600">
        <div className="ml-2 text-xl font-semibold">{note.note}</div>
      </div>
      <div className="flex justify-between items-center gap-4 py-2">
        <button>...</button>
        <p className="font-bold text-sm">
          {new Date(note.date).toLocaleString()}
        </p>
        <button>...</button>
      </div>
    </div>
  );
};

export default NoteDisplay;
