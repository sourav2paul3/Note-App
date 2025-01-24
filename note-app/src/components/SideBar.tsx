import { FaCirclePlus, FaCircle } from "react-icons/fa6";
import { FaRegSave, FaStar } from "react-icons/fa";
import { useContext, useState, useReducer, useEffect } from "react";
import { noteContext } from "../Context/NoteContext";
import NoteDisplay from "./NoteDisplay";
import { NotesType } from "../Type/NotesType";
import { MdFilterListAlt } from "react-icons/md";

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

  const {
    notes,
    setNotes,
    editPopup,
    setEditPopup,
    note,
    setNote,
    colors,
    setColoursFc,
  } = noteContextValue;

  const [popup, setPopup] = useState(false);
  const [color, dispatch] = useReducer(colorReducer, "#eab676");
  const [starFilter, setStarFilter] = useState<boolean>(false);

  const handleColorChange = (newColor: string) => {
    dispatch({ type: "CHANGE_COLOR", payload: newColor });

    setNote((prevNote) => {
      const updatedNote = { ...prevNote, colour: newColor };

      setNotes((prevNotes) =>
        prevNotes.map((existingNote) =>
          existingNote.date === updatedNote.date ? updatedNote : existingNote
        )
      );

      return updatedNote;
    });
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

  const saveNote = (action: string) => {
    if (!note.note.trim()) return; // Prevent saving empty notes

    const updatedNote = { ...note }; // Create a copy of the note to avoid mutation

    if (action === "Save") {
      setNotes((prevNotes) => [...prevNotes, updatedNote]);
    } else if (action === "Update") {
      setNotes((prevNotes) =>
        prevNotes.map((existingNote) =>
          existingNote.date === updatedNote.date ? updatedNote : existingNote
        )
      );
    }

    setColoursFc(action);
    setPopup(false);
    setEditPopup(false);
  };

  let filteredNotes: NotesType[] = starFilter
    ? notes.filter((note) => note.star) // Show only starred notes
    : notes;

  useEffect(() => {
    filteredNotes = starFilter
      ? notes.filter((note) => note.star) // Show only starred notes
      : notes;
  }, [editPopup]);

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
        <button onClick={() => setStarFilter(!starFilter)}>
          <FaStar
            size={25}
            className={`${
              starFilter ? "text-yellow-600" : "text-gray-600"
            } transition-colors mt-5 cursor-pointer`}
          />
        </button>
        <button className="cursor-pointer mt-5">
          <MdFilterListAlt size={25} />
        </button>

        <div className="flex flex-col items-center gap-4 mt-8">
          {colors.map((col) => (
            <button
              key={col}
              onClick={() => handleColorChange(col)}
              className="cursor-pointer"
            >
              <FaCircle
                size={25}
                fill={col}
                className={`transition-transform hover:scale-110 ${
                  color === col ? "brightness-75" : ""
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Notes List */}
      <div className="flex flex-col p-4">
        <h1 className="text-3xl font-bold pb-2">Notes</h1>
        <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-5 mt-4">
          {filteredNotes.map((note) => (
            <NoteDisplay key={note.date} note={note} />
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {(popup || editPopup) && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center z-50">
          <div
            style={{ backgroundColor: note.colour }}
            className="p-6 rounded-lg shadow-xl flex flex-col gap-4 w-[600px] h-[600px] bg-white relative"
          >
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 cursor-pointer"
              onClick={() => {
                setPopup(false);
                setEditPopup(false);
              }}
            >
              ✖
            </button>

            <div className="flex items-center gap-4">
              <label className="text-2xl font-bold text-gray-800">
                {editPopup ? "Edit Note" : "New Note"}
              </label>
            </div>

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
                      className={`${
                        col === note.colour ? "brightness-75" : ""
                      }`}
                    />
                  </button>
                )
              )}
            </div>

            <textarea
              placeholder="Write something..."
              className="border rounded p-2 mt-4 h-[70%] w-full resize-none text-gray-700 shadow-sm focus:ring-2 focus:ring-gray-400"
              value={note.note}
              onChange={(e) => setNote({ ...note, note: e.target.value })}
            />

            <button
              className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
              onClick={() => saveNote(editPopup ? "Update" : "Save")}
            >
              <FaRegSave size={20} />
              <span className="font-semibold text-lg">
                {editPopup ? "Update" : "Save"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
