import React, { useState } from 'react';
import './VerificarCodigo.css';
import logo from '../../imgs/image 6.png';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup.object().shape({
  codigo: yup
    .string()
    .length(6, 'O código deve ter exatamente 6 dígitos')
    .matches(/^\d+$/, 'O código deve conter apenas números')
    .required('O código é obrigatório'),
});

const VerificarCodigo: React.FC = () => {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState<string[]>(['', '', '', '', '', '']);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newCodigo = [...codigo];
      newCodigo[index] = value;
      setCodigo(newCodigo);
      if (index < 5) {
        const nextInput = document.getElementById(`codigo-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };
  

  const handleAvancar = async () => {
    const codigoString = codigo.join('');
  
    try {
      await schema.validate({ codigo: codigoString });
  
      const email = localStorage.getItem('emailParaRedefinicao');
      
      console.log('Código verificado:', codigoString);
      console.log('Email associado:', email);
      
      if (email) {
        alert(`Código verificado para o email: ${email}`);
        navigate('/redefinir-senha');
      } else {
        alert('Email não encontrado.');
        navigate('/esqueci-minha-senha');
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        alert(err.message);
      }
    }
  };
  

  return (
    <>
      <img src={logo} alt="Logo da Empresa" className="logo" />
      <div className="verificar-container">
        <h1>Digite o código de verificação</h1>
        <div className="codigo-input-container">
          {codigo.map((num, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={num}
              onChange={(e) => handleChange(e, index)}
              id={`codigo-${index}`}
              className="codigo-input"
            />
          ))}
        </div>
        <button className="btn-avancar" onClick={handleAvancar}>
          Avançar
        </button>
        <p className="nao-recebeu-codigo">Não recebeu o código?</p>
        <button className="reenviar-codigo" onClick={() => navigate('/esqueci-minha-senha')}>
          Reenviar código
        </button>
      </div>
    </>
  );
};

export default VerificarCodigo;

