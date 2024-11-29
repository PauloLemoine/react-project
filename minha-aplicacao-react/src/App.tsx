
import CircularProgress from '@mui/material/CircularProgress';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cadastro from './componentes/Cadastro/Cadastro';
import EsqueciASenha from './componentes/EsqueciASenha/EsqueciASenha';
import Home from './componentes/Home/Home';
import Login from './componentes/Login/Login';
import PainelHorarios from './componentes/PainelHorarios/PainelHorarios';
import RedefinirSenha from './componentes/RedefinirSenha/RedefinirSenha';
import VerificarCodigo from './componentes/VerificarCodigo/VerificarCodigo';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<CircularProgress />}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/cadastro' element={<Cadastro />} />
          <Route path='/painel-horarios' element={<PainelHorarios />} />
          <Route path='/home' element={<Home />} />
          <Route path='/esqueci-minha-senha' element={<EsqueciASenha />} />
          <Route path='/codigo-de-verificacao' element={<VerificarCodigo />} />
          <Route path='/redefinir-senha' element={<RedefinirSenha />} />
          <Route path='*' element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
