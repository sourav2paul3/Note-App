import { FaCirclePlus, FaCircle } from "react-icons/fa6";
import { FaRegSave } from "react-icons/fa";
import { useContext, useState, useReducer } from "react";
import { noteContext } from "../Context/NoteContext";
import NoteDisplay from "./NoteDisplay";
import { NotesType } from "../Type/NotesType";

const colorReducer = (
  state: string,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      return action.payload;
    default:
      return state;
  }
};

const SideBar = () => {
  const noteContextValue = useContext(noteContext);
  if (!noteContextValue) {
    return (
      <div className="text-red-500 text-lg">
        Error: noteContext is undefined
      </div>
    );
  }
  const { notes, setNotes } = noteContextValue;
  const [popup, setPopup] = useState(false);
  const [color, dispatch] = useReducer(colorReducer, "#eab676");
  const [colors, setColors] = useState<string[]>([]);
  const [note, setNote] = useState<NotesType>({
    note: "",
    pin: false,
    colour: "#eab676",
    star: false,
    date: new Date().getTime(),
  });

  const handleColorChange = (newColor: string) => {
    dispatch({ type: "CHANGE_COLOR", payload: newColor });
    setNote((prevNote) => ({ ...prevNote, colour: newColor }));
  };

  const handleCreateNote = () => {
    setPopup(!popup);
    setNote({
      note: "",
      pin: false,
      colour: color,
      star: false,
      date: new Date().getTime(),
    });
  };
  const handleNoteSort = () => console.log("Note Sort");
  const saveNote = () => {
    setNotes([...notes, note]);
    setPopup(!popup);
    const uniqueColors = new Set([...colors, color]);
    setColors(Array.from(uniqueColors));
  };

  return (
    <div className="mt-20 flex">
      {/* Sidebar */}
      <div className="border-r border-gray-300 w-[100px] h-[750px] flex flex-col items-center py-5 shadow-lg bg-white">
        <button
          onClick={handleCreateNote}
          className="cursor-pointer hover:scale-105 transition-transform"
        >
          <FaCirclePlus
            size={50}
            className="text-gray-600 hover:text-gray-800"
          />
        </button>
        <div className="flex flex-col items-center gap-4 mt-8">
          {colors.map((col) => (
            <button key={col} className="cursor-pointer">
              <FaCircle
                size={25}
                fill={col}
                className="transition-transform hover:scale-110"
              />
            </button>
          ))}
        </div>
      </div>
      {/* Notes List */}
      <div className="flex gap-2">
        {notes.map((note) => (
          <NoteDisplay note={note} />
        ))}
      </div>
      {/* Popup Modal */}
      {popup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center z-50">
          <div
            style={{ backgroundColor: color }}
            className="p-6 rounded-lg shadow-xl flex flex-col gap-4 w-[600px] h-[600px] bg-white relative"
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 cursor-pointer"
              onClick={handleCreateNote}
            >
              ✖
            </button>

            {/* Note Title */}
            <div className="flex items-center gap-4">
              <label className="text-2xl font-bold text-gray-800">
                New Note
              </label>
            </div>

            {/* Color Selector */}
            <div className="flex gap-3">
              {["#e28743", "#FF5733", "#5a91a0", "#b0c785", "#F2E8D7"].map(
                (col) => (
                  <button
                    key={col}
                    onClick={() => handleColorChange(col)}
                    className="focus:outline-none"
                  >
                    <FaCircle
                      size={30}
                      fill={col}
                      className="hover:scale-110 transition-transform"
                    />
                  </button>
                )
              )}
            </div>

            {/* Note Textarea */}
            <textarea
              placeholder="Write something..."
              className="border rounded p-2 mt-4 h-[70%] w-full resize-none text-gray-700 shadow-sm focus:ring-2 focus:ring-gray-400"
              value={note.note}
              onChange={(e) => setNote({ ...note, note: e.target.value })}
            />

            {/* Save Button */}
            <button
              className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
              onClick={saveNote}
            >
              <FaRegSave size={20} />
              <span className="font-semibold text-lg">Save</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
