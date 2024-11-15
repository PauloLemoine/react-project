import React, { useEffect, useState } from 'react';
import './RedefinirSenha.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import logo from '../../imgs/image 6.png';

interface FormData {
  senha: string;
  confirmarSenha: string;
}

const schema = yup.object().shape({
  senha: yup
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .matches(/[A-Z]/, 'Deve conter pelo menos uma letra maiúscula')
    .matches(/[a-z]/, 'Deve conter pelo menos uma letra minúscula')
    .matches(/\d/, 'Deve conter pelo menos um número')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Deve conter pelo menos um caractere especial')
    .required('A senha é obrigatória'),
  confirmarSenha: yup
    .string()
    .oneOf([yup.ref('senha')], 'As senhas não coincidem')
    .required('Confirmação de senha é obrigatória'),
});

const RedefinirSenha: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('emailParaRedefinicao');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {

    const storedUser = localStorage.getItem('usuario');
    
    console.log('Dados da redefinição de senha:', data);
    console.log('Email do usuário:', email);
    
    if (storedUser) {
      const usuario = JSON.parse(storedUser);
      if (usuario.email === email) {
        usuario.senha = data.senha;
        localStorage.setItem('usuario', JSON.stringify(usuario));
        alert('Senha redefinida com sucesso!');
        navigate('/login');
      }
    }
  };

  return (
    <>
      <img src={logo} alt="Logo da Empresa" className="logo" />
      <div className="redefinir-senha-container">
        <h1>Redefinir a senha</h1>
        <div className="password-requirements">
          <ul>
            <li>No mínimo 8 caracteres</li>
            <li>Pelo menos uma letra maiúscula (A-Z)</li>
            <li>Pelo menos uma letra minúscula (a-z)</li>
            <li>Pelo menos um número (0-9)</li>
            <li>Pelo menos um caractere especial (ex: @, #, $)</li>
            <li>Não deve conter seu nome ou informações pessoais</li>
          </ul>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Digite sua nova senha</label>
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              {...register('senha')}
              className={errors.senha ? 'input-error' : ''}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.senha && <p className="error-message">{errors.senha.message}</p>}

          <label>Confirme sua nova senha</label>
          <div className="password-field">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirme sua senha"
              {...register('confirmarSenha')}
              className={errors.confirmarSenha ? 'input-error' : ''}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.confirmarSenha && <p className="error-message">{errors.confirmarSenha.message}</p>}

          <div className="button-group">
            <button type="button" className="btn-voltar" onClick={() => navigate('/login')}>
              Voltar ao Login
            </button>
            <button type="submit" className="btn-confirmar">Confirmar</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RedefinirSenha;
