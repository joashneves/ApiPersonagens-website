import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from './components/pages/login/Login.jsx'
import Home from './components/pages/Home/Home.jsx';
import Franquias from './components/pages/Persona/Franquias.jsx'
import PersonagemLista from './components/pages/PersonagemLista/PersonagemLista.jsx';
import AuthWrapperADM from './utils/AuthWrapperADM.jsx';
import Conta from './components/pages/Conta/Conta.jsx';
import Adm from './components/pages/Adm/Adm.jsx';


const App = () => {
    return (
        <div>
          <AuthWrapperADM>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Franquias" element={<Franquias />} />
              <Route path="/PersonagemLista" element={<PersonagemLista />} />
              <Route path="/Conta" element={<Conta />} />
              <Route path="/Adm" element={<Adm />} />
            </Routes>
          </AuthWrapperADM>
        </div>
    )
}

export default App;