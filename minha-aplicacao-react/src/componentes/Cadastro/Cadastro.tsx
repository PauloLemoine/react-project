import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import logo from '../../imgs/image 6.png';
import './Cadastro.css';

interface FormData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

const schema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório'),
  email: yup
    .string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),
  senha: yup
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .matches(/[A-Z]/, 'Deve conter pelo menos uma letra maiúscula')
    .matches(/[a-z]/, 'Deve conter pelo menos uma letra minúscula')
    .matches(/\d/, 'Deve conter pelo menos um número')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Deve conter pelo menos um caractere especial'
    )
    .notOneOf([yup.ref('nome')], 'A senha não pode conter seu nome')
    .required('A senha é obrigatória'),
  confirmarSenha: yup
    .string()
    .oneOf([yup.ref('senha')], 'As senhas não coincidem')
    .required('Confirmação de senha é obrigatória'),
});

const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const newUser = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      historicoPontos: [],
    };

    const storedUsers = localStorage.getItem('registeredUsers');
    const usersArray = storedUsers ? JSON.parse(storedUsers) : [];

    if (
      usersArray.some(
        (user: FormData & { historicoPontos: unknown[] }) =>
          user.email === newUser.email
      )
    ) {
      alert('Este e-mail já está cadastrado!');
      return;
    }

    usersArray.push(newUser);

    console.log('Dados do usuário ao cadastrar:', data);
    localStorage.setItem('registeredUsers', JSON.stringify(usersArray));
    alert('Cadastro realizado com sucesso!');
    navigate('/login');
  };

  return (
    <div className='cadastro-page'>
      <img src={logo} alt='Logo da Empresa' className='logo' />
      <div className='cadastro-container'>
        <h1>Criar Conta</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Nome</label>
          <input
            type='text'
            placeholder='Digite seu nome'
            {...register('nome')}
            className={errors.nome ? 'input-error' : ''}
          />
          {errors.nome && (
            <p className='error-message'>{errors.nome.message}</p>
          )}

          <label>E-mail</label>
          <input
            type='email'
            placeholder='Digite seu e-mail'
            {...register('email')}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && (
            <p className='error-message'>{errors.email.message}</p>
          )}

          <button
            type='button'
            className='btn-info'
            onClick={() => setShowPopup(true)}
          >
            Requisitos da Senha
          </button>

          <label>Senha</label>
          <div className='password-field'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Digite sua senha'
              {...register('senha')}
              className={errors.senha ? 'input-error' : ''}
            />
            <button
              type='button'
              className='toggle-password'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.senha && (
            <p className='error-message'>{errors.senha.message}</p>
          )}

          <label>Confirme sua senha</label>
          <div className='password-field'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Confirme sua senha'
              {...register('confirmarSenha')}
              className={errors.confirmarSenha ? 'input-error' : ''}
            />
            <button
              type='button'
              className='toggle-password'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.confirmarSenha && (
            <p className='error-message'>{errors.confirmarSenha.message}</p>
          )}

          <button type='submit' className='btn-cadastrar'>
            Cadastrar
          </button>
        </form>

        <div className='divider'>ou</div>
        <p>Já possui uma conta?</p>
        <button className='btn-action' onClick={() => navigate('/login')}>
          Fazer Login
        </button>
      </div>

      {showPopup && (
        <div className='popup-overlay' onClick={() => setShowPopup(false)}>
          <div className='popup-content' onClick={(e) => e.stopPropagation()}>
            <h2>Requisitos para a senha</h2>
            <ul>
              <li>No mínimo 8 caracteres</li>
              <li>Pelo menos uma letra maiúscula (A-Z)</li>
              <li>Pelo menos uma letra minúscula (a-z)</li>
              <li>Pelo menos um número (0-9)</li>
              <li>Pelo menos um caractere especial (ex: @, #, $, !, &, ?)</li>
              <li>A senha não deve conter seu nome</li>
            </ul>
            <button className='btn-fechar' onClick={() => setShowPopup(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cadastro;
