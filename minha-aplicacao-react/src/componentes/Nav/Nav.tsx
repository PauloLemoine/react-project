import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../imgs/image 6.png';
import './Nav.css';

const Nav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove o usuário logado do localStorage
    localStorage.removeItem('loggedUser');
    // Redireciona para a página de login
    navigate('/login');
  };

  return (
    <nav className='navbar'>
      <Link to='/home' className='navbar-logo'>
        <img src={logo} alt='Logo da Empresa' className='logo' />
      </Link>
      <ul className='nav-menu'>
        <li className='nav-item'>
          <Link to='/painel-horarios' className='nav-links'>
            Painel de horários
          </Link>
        </li>
        <li className='nav-item'>
          <span className='nav-links' onClick={handleLogout}>
            <LogoutIcon />
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
