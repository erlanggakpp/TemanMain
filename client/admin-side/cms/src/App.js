import './App.css';
import NavBar from './components/NavBar';
import TableEvent from './components/TableEvent';
import { Routes, Route } from "react-router-dom";
import EventAdd from './components/EventAdd';
import TableUser from './components/TableUser';
import UserAdd from './components/UserAdd';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/listevent" element={<TableEvent />} />
        <Route path="/event" element={<EventAdd />} />
        <Route path="/listuser" element={<TableUser />} />
        <Route path="/user" element={<UserAdd />} />
      </Routes>
    </div>
  );
}

export default App;
