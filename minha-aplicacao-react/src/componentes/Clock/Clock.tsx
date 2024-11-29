import React, { useEffect, useState } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); // Atualiza o estado a cada segundo

    return () => clearInterval(timer); // Limpa o intervalo quando o componente desmonta
  }, []);

  const formattedTime = time.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const handlePunchClock = () => {
    // Busca o usuário logado do localStorage
    const loggedUser = localStorage.getItem('loggedUser');

    if (!loggedUser) {
      alert('Nenhum usuário logado encontrado!');
      return;
    }

    const user = JSON.parse(loggedUser);

    // Atualiza o histórico de pontos
    const newPunch = { date: new Date().toISOString() };
    user.historicoPontos = user.historicoPontos || [];
    user.historicoPontos.push(newPunch);

    // Salva o usuário atualizado no localStorage
    localStorage.setItem('loggedUser', JSON.stringify(user));

    alert('Ponto registrado com sucesso!');
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{ fontSize: '8rem', fontWeight: 'bold', marginBottom: '20px' }}
      >
        {formattedTime}
      </div>
      <button
        onClick={handlePunchClock}
        style={{
          padding: '20px 40px',
          fontSize: '1.6rem',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Bater Ponto
      </button>
    </div>
  );
};

export default Clock;
