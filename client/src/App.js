import './App.css';
import AllPets from './components/AllPets';
import PetCreate from './components/PetCreate';
import PetUpdate from './components/PetUpdate';
import PetDetails from './components/PetDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<AllPets/>} path="/" />
          <Route element={<PetCreate/>} path="/new" />
          <Route element={<PetDetails/>} path="/:id" />
          <Route element={<PetUpdate/>} path="/:id/edit" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;