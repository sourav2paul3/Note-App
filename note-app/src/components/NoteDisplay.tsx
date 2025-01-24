import React, { useReducer, useContext } from "react";
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
  const { setNote, setEditPopup, notes, setNotes } = useContext(noteContext)!; // Added ! to ensure non-null context
  const [state, dispatch] = useReducer(noteReducer, note);

  const handleStar = () => {
    dispatch({ type: "TOGGLE_STAR" });
  };

  const handlePin = () => {
    dispatch({ type: "TOGGLE_PIN" });
  };

  const handleEdit = () => {
    setEditPopup(true);
    setNote(note);
  };

  const handleDelete = () => {
    // Filter the notes to remove the selected note
    const updatedNotes = notes.filter(
      (existingNote) => existingNote.date !== note.date
    );
    setNotes(updatedNotes); // Update notes state
  };

  return (
    <div
      style={{ backgroundColor: state.colour }}
      className="h-[450px] w-[350px] rounded-lg"
    >
      <div className="h-[90%] border-b border-gray-600">
        {state.pin ? (
          <div className="flex justify-end">
            <TiPin />
          </div>
        ) : (
          ""
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
            <RiDeleteBin6Line size={20} />
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
