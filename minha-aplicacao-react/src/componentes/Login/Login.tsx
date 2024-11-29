import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import logo from '../../imgs/image 6.png';
import useAuthRedirect from '../../utils/useAuthRedirect';
import './Login.css';

interface LoginForm {
  email: string;
  senha: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),
  senha: yup.string().required('A senha é obrigatória'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  useAuthRedirect();

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    // Recupera os usuários cadastrados do localStorage
    const storedUsers = localStorage.getItem('registeredUsers');
    if (storedUsers) {
      const usersArray = JSON.parse(storedUsers);

      // Verifica se o email e a senha conferem com algum usuário cadastrado
      const user = usersArray.find(
        (user: { email: string; senha: string }) =>
          user.email === data.email && user.senha === data.senha
      );

      if (user) {
        // Salva o usuário logado no localStorage
        localStorage.setItem('loggedUser', JSON.stringify(user));
        alert('Login realizado com sucesso!');
        navigate('/home');
      } else {
        alert('E-mail ou senha incorretos');
      }
    } else {
      alert('Nenhum usuário cadastrado encontrado');
    }
  };

  return (
    <>
      <img src={logo} alt='Logo da Empresa' className='logo' />
      <div className='login-container'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>
            <label>E-mail</label>
            <input
              type='email'
              placeholder='Digite seu email'
              {...register('email')}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && (
              <p className='error-message'>{errors.email.message}</p>
            )}
          </div>

          <div className='form-group'>
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
          </div>

          <a
            className='forgot-password'
            onClick={(e) => {
              e.preventDefault();
              navigate('/esqueci-minha-senha');
            }}
          >
            Esqueci minha senha
          </a>

          <button type='submit' className='btn-login'>
            Entrar
          </button>
        </form>

        <div className='divider'>ou</div>
        <p className='possui-conta'>Não tem conta?</p>
        <button className='btn-cadastro' onClick={() => navigate('/cadastro')}>
          Cadastre-se
        </button>
      </div>
    </>
  );
};

export default Login;
