import React, { useState } from 'react';
import './Cadastro.css';
import logo from '../../imgs/image 6.png';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface FormData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

const Cadastro: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null);
  };

  const isPasswordStrong = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;
    const doesNotContainName = !password.toLowerCase().includes(formData.nome.toLowerCase());

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongEnough && doesNotContainName;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      return;
    }

    if (!isPasswordStrong(formData.senha)) {
      setError('A senha deve atender a todos os requisitos.');
      return;
    }

    const userData = {
      nome: formData.nome,
      email: formData.email,
      senha: formData.senha,
    };
    localStorage.setItem('usuario', JSON.stringify(userData));

    console.log('Dados cadastrados:', userData);

    alert('Cadastro realizado com sucesso!');
    setFormData({ nome: '', email: '', senha: '', confirmarSenha: '' });
    navigate('/login');
  };

  return (
    <div className="cadastro-page">
      <img src={logo} alt="Logo da Empresa" className="logo" />
      <div className="cadastro-container">
        <h1>Criar Conta</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Nome
            <input type="text" name="nome" placeholder="Digite seu nome" value={formData.nome} onChange={handleChange} required />
          </label>
          <label>
            E-mail
            <input type="email" name="email" placeholder="Digite seu e-mail" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Senha
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                name="senha"
                placeholder="Digite sua senha"
                value={formData.senha}
                onChange={handleChange}
                required
              />
              <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {/* Botão para abrir o pop-up */}
            <button type="button" className="btn-info" onClick={() => setShowPopup(true)}>
              Requisitos da Senha
            </button>
          </label>
          <label>
            Confirme a sua senha
            <div className="password-field">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmarSenha"
                placeholder="Confirme sua senha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                required
              />
              <button type="button" className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </label>
          <button type="submit" className="btn-cadastrar">Cadastrar</button>
        </form>
        <div className="divider">ou</div>
        <p>Já possui uma conta?</p>
        <button className="btn-login" onClick={() => navigate('/login')}>
          Fazer Login
        </button>
      </div>

      {/* Pop-up com os requisitos da senha */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>Requisitos para a senha</h2>
            <ul>
              <li>No mínimo 8 caracteres</li>
              <li>Pelo menos uma letra maiúscula (A-Z)</li>
              <li>Pelo menos uma letra minúscula (a-z)</li>
              <li>Pelo menos um número (0-9)</li>
              <li>Pelo menos um caractere especial (ex: @, #, $, %)</li>
              <li>Não deve conter seu nome ou informações pessoais</li>
            </ul>
            <button className="btn-fechar" onClick={() => setShowPopup(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cadastro;




// import React, { useState } from 'react';
// import './Cadastro.css';
// import logo from '../../imgs/image 6.png';
// import { FiEye, FiEyeOff } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';

// interface FormData {
//   nome: string;
//   email: string;
//   senha: string;
//   confirmarSenha: string;
// }

// const Cadastro: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     nome: '',
//     email: '',
//     senha: '',
//     confirmarSenha: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setError(null);
//   };

//   // Função para validar a senha
//   const isPasswordStrong = (password: string) => {
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasNumber = /\d/.test(password);
//     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
//     const isLongEnough = password.length >= 8;
//     const doesNotContainName = !password.toLowerCase().includes(formData.nome.toLowerCase());

//     return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongEnough && doesNotContainName;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validar se as senhas coincidem
//     if (formData.senha !== formData.confirmarSenha) {
//       setError('As senhas não coincidem');
//       return;
//     }

//     // Validar a força da senha
//     if (!isPasswordStrong(formData.senha)) {
//       setError('A senha deve atender a todos os requisitos.');
//       return;
//     }

//     // Salvar os dados no localStorage
//     const userData = {
//       nome: formData.nome,
//       email: formData.email,
//       senha: formData.senha,
//     };
//     localStorage.setItem('usuario', JSON.stringify(userData));

//     // Exibir os dados no console
//     console.log('Dados cadastrados:', userData);

//     alert('Cadastro realizado com sucesso!');
//     setFormData({ nome: '', email: '', senha: '', confirmarSenha: '' });
//     navigate('/login');
//   };

//   return (
//     <div className="cadastro-page">
//       <img src={logo} alt="Logo da Empresa" className="logo" />
//       <div className="cadastro-container">
//         <h1>Criar Conta</h1>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <label>
//             Nome
//             <input type="text" name="nome" placeholder="Digite seu nome" value={formData.nome} onChange={handleChange} required />
//           </label>
//           <label>
//             E-mail
//             <input type="email" name="email" placeholder="Digite seu e-mail" value={formData.email} onChange={handleChange} required />
//           </label>
//           <label>
//             Senha
//             <div className="password-field">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="senha"
//                 placeholder="Digite sua senha"
//                 value={formData.senha}
//                 onChange={handleChange}
//                 required
//               />
//               <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
//                 {showPassword ? <FiEyeOff /> : <FiEye />}
//               </button>
//             </div>
//           </label>
//           <label>
//             Confirme a sua senha
//             <div className="password-field">
//               <input
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 name="confirmarSenha"
//                 placeholder="Confirme sua senha"
//                 value={formData.confirmarSenha}
//                 onChange={handleChange}
//                 required
//               />
//               <button type="button" className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//                 {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
//               </button>
//             </div>
//           </label>
//           <button type="submit" className="btn-cadastrar">Cadastrar</button>
//         </form>
//         <div className="divider">ou</div>
//         <button className="btn-login" onClick={() => navigate('/login')}>
//           Fazer Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cadastro;


