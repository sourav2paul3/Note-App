import "./App.css";
import SideBar from "./components/SideBar";
import { NoteContextProvider } from "./Context/NoteContext";
function App() {
  return (
    <div>
      <NoteContextProvider>
        <SideBar />
      </NoteContextProvider>
    </div>
  );
}

export default App;
