// src/App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Cadastro from './componentes/Cadastro/Cadastro';
import Login from './componentes/Login/Login';
import Home from './componentes/Home/Home';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Suspense>
    </BrowserRouter>
  );
};

export default App;
