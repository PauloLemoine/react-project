import React, { useState } from 'react';
import './Login.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import logo from '../../imgs/image 6.png';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      const { email: storedEmail, senha: storedSenha } = JSON.parse(storedUser);

      if (email === storedEmail && senha === storedSenha) {
        alert('Login realizado com sucesso!');
        navigate('/home');
      } else {
        setError('E-mail ou senha incorretos');
      }
    } else {
      setError('Nenhum usuário cadastrado encontrado');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* Logo fora do container */}
      <img src={logo} alt="Logo da Empresa" className="logo" />

      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          {error && <p className="error-message">{error}</p>}
          <label>
            E-mail
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Senha
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </label>
          <a href="/forgot-password" className="forgot-password">Esqueci minha senha</a>
          <button type="submit" className="btn-action">Entrar</button>
        </form>
        <div className="divider">ou</div>
        <p className="possui-conta">Não tem conta?</p>
        <button className="btn-action" onClick={() => navigate('/cadastro')}>
          Cadastre-se
        </button>
      </div>
    </>
  );
};

export default Login;


