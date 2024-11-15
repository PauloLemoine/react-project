import React, { useState } from 'react';
import './Login.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import logo from '../../imgs/image 6.png';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface LoginForm {
  email: string;
  senha: string;
}


const schema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
  senha: yup.string().required('A senha é obrigatória'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      const { email: storedEmail, senha: storedSenha } = JSON.parse(storedUser);

      if (data.email === storedEmail && data.senha === storedSenha) {
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
      <img src={logo} alt="Logo da Empresa" className="logo" />
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Digite seu email"
              {...register('email')}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label>Senha</label>
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
          </div>

          <a 
            className="forgot-password" 
            onClick={(e) => {
              e.preventDefault();
              navigate('/esqueci-minha-senha');
            }}
          >
            Esqueci minha senha
          </a>

          <button type="submit" className="btn-login">Entrar</button>
        </form>

        <div className="divider">ou</div>
        <p className="possui-conta">Não tem conta?</p>
        <button className="btn-cadastro" onClick={() => navigate('/cadastro')}>
          Cadastre-se
        </button>
      </div>
    </>
  );
};

export default Login;


