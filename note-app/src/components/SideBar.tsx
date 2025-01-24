import { FaCirclePlus } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa6";
import { useContext } from "react";
import { noteContext } from "../Context/NoteContext";
const SideBar = () => {
  const noteContextValue = useContext(noteContext);
  if (!noteContextValue) {
    return <div>Error: noteContext is undefined</div>;
  }
  const { notes } = noteContextValue;

  const handleCreateNote = () => {
    console.log("Create Note");
  };
  const handleNoteSort = () => {
    console.log("Note Sort");
  };
  return (
    <div>
      <div
        className=" border-r border-gray-200 w-35 h-screen flex flex-col items-center gap-15
    py-10"
      >
        <button onClick={handleCreateNote} className="cursor-pointer">
          <FaCirclePlus size={70} />
        </button>
        <div className="flex flex-col items-center gap-6 ">
          {notes.map((note) => {
            return (
              <button
                key={note.colour}
                onClick={handleNoteSort}
                className="cursor-pointer"
              >
                <FaCircle size={30} fill={note.colour} />
              </button>
            );
          })}
        </div>
        ;
      </div>
    </div>
  );
};

export default SideBar;
