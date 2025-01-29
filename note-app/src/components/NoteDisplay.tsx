import React, { useContext } from "react";
import { FaStar } from "react-icons/fa";
import { TiPin } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { NoteContext } from "../Context/NoteContext";
import { NotesType } from "../Type/NotesType";

const NoteDisplay: React.FC<{ note: NotesType }> = ({ note }) => {
  const noteContextValue = useContext(NoteContext);

  if (!noteContextValue) {
    return <div className="text-red-500 text-lg">Error: Context undefined</div>;
  }

  const { setNote, setEditPopup, notes, setNotes } = noteContextValue;

  // Handle Star Toggle
  const handleStar = () => {
    const updatedNote = { ...note, star: !note.star };
    setNotes((prevNotes) =>
      prevNotes.map((existingNote) =>
        existingNote.date === updatedNote.date ? updatedNote : existingNote
      )
    );
  };

  // Handle Pin Toggle
  const handlePin = () => {
    const updatedNote = { ...note, pin: !note.pin };
    setNotes((prevNotes) =>
      prevNotes.map((existingNote) =>
        existingNote.date === updatedNote.date ? updatedNote : existingNote
      )
    );
  };

  // Handle Edit
  const handleEdit = () => {
    setEditPopup(true);
    setNote(note); // Pass the note to context for editing
  };

  // Handle Delete
  const handleDelete = () => {
    setNotes(notes.filter((existingNote) => existingNote.date !== note.date));
  };

  return (
    <div>
      <p className="font-bold text-sm">
        {new Date(note.date).toLocaleString()}
      </p>
      <div
        style={{ backgroundColor: note.colour }}
        className="w-[150px] h-[220px] md:h-[450px] md:w-[350px] rounded-lg "
      >
        <div className="custom-scrollbar h-[85%] border-b border-gray-600 overflow-y-auto max-h-[85%]">
          {note.pin && (
            <div className="flex justify-end p-1">
              <TiPin />
            </div>
          )}
          <div className="ml-2 text-xl font-semibold ">
            <p className="break-words">{note.note}</p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-4 py-2">
          <span>
            <button className="px-2 cursor-pointer" onClick={handlePin}>
              <TiPin size={20} fill={note.pin ? "green" : "gray"} />
            </button>
            <button className="px-2 cursor-pointer" onClick={handleEdit}>
              <MdEdit size={20} />
            </button>
            <button
              className="px-2 cursor-pointer"
              onClick={handleDelete}
              disabled={note.pin}
            >
              <RiDeleteBin6Line size={20} fill={note.pin ? "gray" : "black"} />
            </button>
          </span>
          <button className="px-4 cursor-pointer" onClick={handleStar}>
            <FaStar size={20} fill={note.star ? "green" : "gray"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteDisplay;
