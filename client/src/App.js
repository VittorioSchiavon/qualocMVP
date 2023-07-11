import { BrowserRouter, Navigate, Routes, Route  } from 'react-router-dom';
import LoginPage from 'scenes/loginPage';
import HomePage from 'scenes/homePage';
import ProfilePage from 'scenes/profilePage';
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
import MessagePage from 'scenes/messagePage';
import FAQPage from 'scenes/FAQPage';
import AboutUsPage from 'scenes/aboutUsPage';
import EditProductPage from 'scenes/editProductPage';
import EditStorePage from 'scenes/editStorePage';
import ProtectedRoute from 'state/ProtectedRoute';
import StoreProtectedRoute from 'state/StoreProtectedRoute copy';
import VerifyEmailPage from 'scenes/VerifyEmailPage';

export const PopupContext= createContext();

function App() {

  const [popup, setPopup]= useState({type: null, message:null})

  return (
    <div className="app">
      <PopupContext.Provider value={[popup, setPopup]}>
        
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/creaNegozio" element={<ProtectedRoute><NewStorePage/></ProtectedRoute>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/ilMioProfilo" element={        <ProtectedRoute>
          <ProfilePage/>
        </ProtectedRoute>}/>
        <Route path="/ilMioNegozio" element={<StoreProtectedRoute><MyStorePage/></StoreProtectedRoute>}/>
        <Route path="/modificaNegozio/:id" element={<StoreProtectedRoute><EditStorePage/></StoreProtectedRoute>}/>
        <Route path="/negozio/:id" element={<StorePage/>}/>
        <Route path="/carrello" element={<ProtectedRoute><CartPage/></ProtectedRoute>}/>
        <Route path="/aggiungiProdotto" element={<StoreProtectedRoute><NewProductPage/></StoreProtectedRoute>}/>
        <Route path="/modificaProdotto/:id" element={<StoreProtectedRoute><EditProductPage/></StoreProtectedRoute>}/>
        <Route path="/prodotto/:id" element={<ProductPage/>}/>
        <Route path="/chat" element={<ProtectedRoute><ChatPage/></ProtectedRoute>}/>
        <Route path="/cerca/:query" element={<SearchPage/>}/>
        <Route path="/404" element={<MessagePage message={"404"}/>} />
        <Route path="/successo" element={<MessagePage message={"successo"}/>} />
        <Route path="/fallimento" element={<MessagePage message={"fallimento"}/>} />
        <Route path="/FAQ" element={<FAQPage/>} />
        <Route path="/chiSiamo" element={<AboutUsPage/>} />
        <Route path="/verificaEmail" element={<VerifyEmailPage/>} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      </BrowserRouter>
      {popup.type!=null && <Popup message={popup.message} type={popup.type}/>}
      </PopupContext.Provider>
    </div>
  );
}

export default App;
