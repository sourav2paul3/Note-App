import React, { useReducer } from "react";
import { NotesType } from "../Type/NotesType";
import { FaStar } from "react-icons/fa";
import { TiPin } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";

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

const NoteDisplay: React.FC<{
  note: NotesType;
  setNote: React.Dispatch<React.SetStateAction<NotesType>>;
}> = ({ note, setNote }) => {
  const [state, dispatch] = useReducer(noteReducer, note);

  const handleStar = () => {
    dispatch({ type: "TOGGLE_STAR" });
    setNote((prevNote) => ({ ...prevNote, star: !prevNote.star })); // Corrected update
  };

  const handlePin = () => {
    dispatch({ type: "TOGGLE_PIN" });
    setNote((prevNote) => ({ ...prevNote, star: !prevNote.star })); // Corrected update
  };

  const HandleDelet = () => {
    // setNotes(notes.filter((noteMap) => noteMap.date !== note.date));
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
          <button className="px-4 cursor-pointer" onClick={handlePin}>
            <TiPin size={20} fill={state.pin ? "black" : "gray"} />
          </button>
          <button className="px-4 cursor-pointer" onCanPlay={HandleDelet}>
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
