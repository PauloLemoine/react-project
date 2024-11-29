import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser');
    if (!loggedUser) {
      navigate('/login'); // Redireciona para Home se loggedUser não existir
    }
  }, [navigate]);
};

export default useAuthRedirect;
