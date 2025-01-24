import React, { useReducer, useContext, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { TiPin } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { noteContext } from "../Context/NoteContext";
import { NotesType } from "../Type/NotesType";

type ActionType = { type: "TOGGLE_STAR" | "TOGGLE_PIN" };

const noteReducer = (state: NotesType, action: ActionType): NotesType => {
  switch (action.type) {
    case "TOGGLE_STAR":
      return { ...state, star: !state.star };
    case "TOGGLE_PIN":
      return { ...state, pin: !state.pin };
    default:
      return state;
  }
};

const NoteDisplay: React.FC<{ note: NotesType }> = ({ note }) => {
  const noteContextValue = useContext(noteContext);
  if (!noteContextValue) {
    return <div className="text-red-500 text-lg">Error: Context undefined</div>;
  }

  const { setNote, setEditPopup, notes, setNotes } = noteContextValue;
  const [state, dispatch] = useReducer(noteReducer, note);

  const updateGlobalState = (updatedNote: NotesType) => {
    setNotes((prevNotes) =>
      prevNotes.map((existingNote) =>
        existingNote.date === updatedNote.date ? updatedNote : existingNote
      )
    );
  };

  const handleStar = () => {
    dispatch({ type: "TOGGLE_STAR" });
    updateGlobalState({ ...note, star: !note.star });
  };

  const handlePin = () => {
    dispatch({ type: "TOGGLE_PIN" });
    updateGlobalState({ ...note, pin: !note.pin });
  };

  const handleEdit = () => {
    console.log("Editing note:", note);
    setEditPopup(true);
    setNote(note); // Ensure note is correctly passed here
  };

  const handleDelete = () => {
    if (!note.pin)
      setNotes(notes.filter((existingNote) => existingNote.date !== note.date));
  };

  return (
    <div
      style={{ backgroundColor: state.colour }}
      className="h-[450px] w-[350px] rounded-lg"
    >
      <div className="h-[90%] border-b border-gray-600">
        {state.pin && (
          <div className="flex justify-end">
            <TiPin />
          </div>
        )}
        <div className="ml-2 text-xl font-semibold">
          <p className="break-words">{state.note}</p>
        </div>
      </div>
      <div className="flex justify-between items-center gap-4 py-2">
        <span>
          <button className="px-2 cursor-pointer" onClick={handlePin}>
            <TiPin size={20} fill={state.pin ? "black" : "gray"} />
          </button>
          <button className="px-2 cursor-pointer" onClick={handleEdit}>
            <MdEdit size={20} />
          </button>
          <button className="px-2 cursor-pointer" onClick={handleDelete}>
            <RiDeleteBin6Line size={20} fill={state.pin ? "gray" : "black"} />
          </button>
        </span>
        <p className="font-bold text-sm">
          {new Date(state.date).toLocaleString()}
        </p>
        <button className="px-4 cursor-pointer" onClick={handleStar}>
          <FaStar size={20} fill={state.star ? "black" : "gray"} />
        </button>
      </div>
    </div>
  );
};

export default NoteDisplay;
