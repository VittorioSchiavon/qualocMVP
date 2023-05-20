import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import LoginPage from 'scenes/loginPage';
import HomePage from 'scenes/homePage';
import ProfilePage from 'scenes/profilePage';
import NewProfilePage from 'scenes/newProfilePage';
import NewStorePage from 'scenes/newStorePage';
import StorePage from 'scenes/storePage';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Routes>
      <Route path="/selezionaTipologia" element={<NewProfilePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/creaNegozio" element={<NewStorePage/>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/ilMioProfilo" element={<ProfilePage/>}/>
        <Route path="/negozio/:id" element={<StorePage/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
