import React from 'react';
import './EsqueciASenha.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import logo from '../../imgs/image 6.png';
import { useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
}

// Função para verificar se o e-mail está cadastrado no localStorage
const emailExiste = async (email: string) => {
  const storedUser = localStorage.getItem('usuario');
  if (storedUser) {
    const { email: storedEmail } = JSON.parse(storedUser);
    return email === storedEmail;
  }
  return false;
};

// Esquema de validação usando Yup com validação assíncrona
const schema = yup.object().shape({
  email: yup
    .string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório')
    .test('email-existente', 'E-mail não encontrado', async (value) => {
      if (!value) return false;
      const emailValido = await emailExiste(value);
      return emailValido;
    }),
});

const EsqueciASenha: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log('Email informado para recuperação:', data.email);
    localStorage.setItem('emailParaRedefinicao', data.email);
    alert(`E-mail de recuperação enviado para ${data.email}`);
    navigate('/codigo-de-verificacao');
  };
  
  return (
    <>
      <img src={logo} alt="Logo da Empresa" className="logo" />
      <div className="esqueci-senha-container">
        <h1>Esqueci minha senha</h1>
        <p>Para redefinir a sua senha, informe o seu email cadastrado. Nós enviaremos um código com as instruções.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>E-mail</label>
          <input
            type="email"
            placeholder="Digite seu email"
            {...register('email')}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
          
          <div className="button-group">
            <button type="button" className="btn-voltar" onClick={() => navigate('/login')}>
              Voltar
            </button>
            <button type="submit" className="btn-redefinir">Redefinir</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EsqueciASenha;

