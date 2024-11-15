// src/App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Cadastro from './componentes/Cadastro/Cadastro';
import Login from './componentes/Login/Login';
import Home from './componentes/Home/Home';
import EsqueciASenha from './componentes/EsqueciASenha/EsqueciASenha';
import VerificarCodigo from './componentes/VerificarCodigo/VerificarCodigo';
import RedefinirSenha from './componentes/RedefinirSenha/RedefinirSenha'

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/esqueci-minha-senha" element={<EsqueciASenha/>}/>
        <Route path="/codigo-de-verificacao" element={<VerificarCodigo />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha/>}/>
        <Route path="*" element={<Login />} />
      </Routes>
    </Suspense>
    </BrowserRouter>
  );
};

export default App;
