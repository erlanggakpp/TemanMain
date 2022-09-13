import './App.css';
import NavBar from './components/NavBar';
import TableEvent from './components/TableEvent';
import { Routes, Route } from 'react-router-dom';
import EventAdd from './components/EventAdd';
import TableUser from './components/TableUser';
import UserAdd from './components/UserAdd';
import TableCategory from './components/TableCategory';
import CategoryAdd from './components/CategoryAdd';
import UserEdit from './components/UserEdit';
import EventEdit from './components/EventEdit';
import CategoryEdit from './components/CategoryEdit';
import LoginPages from './pages/LoginPages';
import AuthAdmin from './components/AuthAdmin';
import AuthDashboard from './components/AuthDashboard';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={
          <AuthDashboard>
            <LoginPages />
          </AuthDashboard>
        } />
        <Route path="/listevent" element={
          <AuthAdmin>
            <TableEvent />
          </AuthAdmin>
        } />
        <Route path="/event" element={
          <AuthAdmin>
            <EventAdd />
          </AuthAdmin>
        } />
        <Route path="/event/:id" element={
          <AuthAdmin>
            <EventEdit />
          </AuthAdmin>
        } />
        <Route path="/listuser" element={
          <AuthAdmin>
            <TableUser />
          </AuthAdmin>
        } />
        <Route path="/user" element={
          <AuthAdmin>
            <UserAdd />
          </AuthAdmin>
        } />
        <Route path="/user/:id" element={
          <AuthAdmin>
            <UserEdit />
          </AuthAdmin>
        } />
        <Route path="/listcategory" element={
          <AuthAdmin>
            <TableCategory />
          </AuthAdmin>
        } />
        <Route path="/category" element={
          <AuthAdmin>
            <CategoryAdd />
          </AuthAdmin>
        } />
        <Route path="/category/:id" element={
          <AuthAdmin>
            <CategoryEdit />
          </AuthAdmin>
        } />
      </Routes>
    </div>
  );
}

export default App;
