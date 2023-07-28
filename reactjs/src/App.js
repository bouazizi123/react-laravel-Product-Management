import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./composant/Authentication_user/Sing_Up";
import SingIN from "./composant/Authentication_user/Sing_In";
import ProductManagement from "./composant/ProductManagement";
import NavBar from "./composant/NavBar/Navbar";
import AddPRoduit from "./composant/AddProduct";
import EditProduit from "./composant/EditProduit";

function App() {
  const [userName, setUserName] = useState("");

  return (
    <BrowserRouter>
      <NavBar  userName={userName} handleLogout={() => setUserName("")}/> 
      <Routes>
        <Route path="/singup" element={<SignUp />} />
        <Route path="/" element={<SingIN   setUserName={setUserName}  />} />
        <Route path="/produit" element={<ProductManagement />} />
        <Route path="/addproduit" element={<AddPRoduit />} />
        <Route path="/editproduit/:id" element={<EditProduit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
