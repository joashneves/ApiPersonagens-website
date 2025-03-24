import { BrowserRouter, Routes, Route } from "react-router";

import Login from "./components/pages/login/Login.jsx";
import Home from "./components/pages/Home/Home.jsx";
import Franquias from "./components/pages/Persona/Franquias.jsx";
import PersonagemLista from "./components/pages/PersonagemLista/PersonagemLista.jsx";

import Conta from "./components/pages/Conta/Conta.jsx";
import Adm from "./components/pages/Adm/Adm.jsx";
import AuthWrapperADM from "./utils/AuthWrapperADM.jsx";

const App = () => (
  <BrowserRouter>
      <AuthWrapperADM/>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/PersonagemLista/:id" element={<PersonagemLista />} />
        <Route path="/PersonagemLista" element={<Franquias />} />
        <Route path="/Conta" element={<Conta />} />
        <Route path="/Adm" element={<Adm />} />
      
    </Routes>
  </BrowserRouter>
);

export default App;