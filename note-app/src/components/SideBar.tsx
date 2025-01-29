import { FaCirclePlus, FaCircle } from "react-icons/fa6";
import { FaRegSave, FaStar } from "react-icons/fa";
import { useContext, useState, useEffect, useReducer } from "react";
import { NoteContext } from "../Context/NoteContext";
import NoteDisplay from "./NoteDisplay";

import { MdFilterListAlt } from "react-icons/md";
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
  const noteContextValue = useContext(NoteContext);

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
    starFilter,
    setStarFilter,
    colorFilter,
    setColorFilter,
  } = noteContextValue;

  const [popup, setPopup] = useState(false);
  const [color, dispatch] = useReducer(colorReducer, "#eab676");
  const [filteredNotes, setFilteredNotes] = useState<NotesType[]>([]);
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
    setPopup(true);
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

    setNotes((prevNotes) => {
      let newNotes: NotesType[] = [];
      if (action === "Save") {
        newNotes = [...prevNotes, updatedNote]; // Add the new note to the array
      } else if (action === "Update") {
        // Use map to create a new array with the updated note
        newNotes = prevNotes.map((existingNote) =>
          existingNote.date === updatedNote.date ? updatedNote : existingNote
        );
      }
      return newNotes; // Ensure you're setting a new array
    });

    setColoursFc(action);
    setPopup(false);
    setEditPopup(false);
    setFilteredNotes([...notes]); // Ensure to trigger re-render with new array
  };

  useEffect(() => {
    // This effect will trigger when `notes` change
    let updatedNotes = notes.slice();

    if (starFilter) {
      updatedNotes = updatedNotes.filter((note) => note.star); // Apply star filter
    }

    if (colorFilter) {
      updatedNotes = updatedNotes.filter((note) => note.colour === colorFilter); // Apply color filter
    }

    setFilteredNotes(updatedNotes);
    // Set filtered notes after applying filters
  }, [notes, starFilter, colorFilter, editPopup]); // Trigger whenever `notes`, `starFilter`, or `colorFilter` change

  const removeFilters = () => {
    setStarFilter(false);
    setColorFilter("");
  };

  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    setScrollPercentage(progress);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="mt-20 flex">
      <div className="border-r border-gray-300 md:w-[100px] md:h-[420px] w-[50px] h-[200px]  flex flex-col items-center py-5 bg-white">
        <button
          onClick={handleCreateNote}
          className="cursor-pointer hover:scale-105 transition-transform"
        >
          <FaCirclePlus
            size={50}
            className="text-gray-600 hover:text-gray-800 sm:w-[50px]"
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
        <button className="cursor-pointer mt-5" onClick={removeFilters}>
          <MdFilterListAlt size={25} />
        </button>

        <div className="flex flex-col items-center gap-4 mt-8">
          {colors.map((col) => (
            <button
              key={col}
              onClick={() => setColorFilter(col)}
              className={"cursor-pointer"}
            >
              <FaCircle
                size={25}
                fill={col}
                className={`transition-transform hover:scale-110 ${
                  colorFilter === col
                    ? "brightness-75 border-3 rounded-full"
                    : ""
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Notes List */}
      <div>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "7px",
            background: "#ccc",
          }}
        >
          <div
            style={{
              width: `${scrollPercentage}%`,
              height: "100%",
              background: "#4caf50",
            }}
          ></div>
        </div>
        <div className="flex flex-col p-4">
          <h1 className="text-3xl font-bold pb-2">Notes</h1>
          <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-5 mt-4">
            {filteredNotes.map((note) => (
              <NoteDisplay key={note.date} note={note} />
            ))}
          </div>
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
              {["#e28743", "#FF5733", "#5a91a0", "#b0c785", "#E0D6C5"].map(
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
              className="border rounded p-2 mt-4 h-[70%] w-full resize-none text-black font-semibold shadow-sm"
              value={note.note}
              maxLength={1000}
              onChange={(e) => setNote({ ...note, note: e.target.value })}
            />
            <p className="text-right text-gray-600/70 t-0">
              {note.note.length}/1000 characters
            </p>
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
