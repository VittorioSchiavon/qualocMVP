import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import LoginPage from 'scenes/loginPage';
import HomePage from 'scenes/homePage';
import ProfilePage from 'scenes/profilePage';
import NewProfilePage from 'scenes/newProfilePage';
import NewStorePage from 'scenes/newStorePage';
import StorePage from 'scenes/storePage';
import CartPage from 'scenes/cartPage';
import MyStorePage from 'scenes/myStorePage';
import NewProductPage from 'scenes/newProductPage';
import ProductPage from 'scenes/productPage';
import ChatPage from 'scenes/chatPage';
import SearchPage from 'scenes/SearchPage';
import Popup from 'components/Popup';
import { createContext, useState } from 'react';


export const PopupContext= createContext();

function App() {

  const [popup, setPopup]= useState({type: null, message:null})

  return (
    <div className="app">
      <PopupContext.Provider value={[popup, setPopup]}>
      <BrowserRouter>
      <Routes>
      <Route path="/selezionaTipologia" element={<NewProfilePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/creaNegozio" element={<NewStorePage/>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/ilMioProfilo" element={<ProfilePage/>}/>
        <Route path="/ilMioNegozio" element={<MyStorePage/>}/>
        <Route path="/negozio/:id" element={<StorePage/>}/>
        <Route path="/carrello" element={<CartPage/>}/>
        <Route path="/aggiungiProdotto" element={<NewProductPage/>}/>
        <Route path="/prodotto/:id" element={<ProductPage/>}/>
        <Route path="/chat" element={<ChatPage/>}/>
        <Route path="/cerca/:query" element={<SearchPage/>}/>
      </Routes>
      </BrowserRouter>
      {popup.type!=null && <Popup message={popup.message} type={popup.type}/>}
      </PopupContext.Provider>
    </div>
  );
}

export default App;
