import { useEffect, useState } from 'react';
import useAuthRedirect from '../../utils/useAuthRedirect';
import Nav from '../Nav/Nav';
import './PainelHorarios.css';

const PainelHorarios = () => {
  // Estado para controlar a exibição do formulário de edição
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editPonto, setEditPonto] = useState<{
    entrada: string;
    saida: string;
  }>({
    entrada: '',
    saida: '',
  });
  const [historicoPontos, setHistoricoPontos] = useState<{ date: string }[]>(
    []
  );

  useAuthRedirect();

  // Busca o usuário logado do localStorage
  const loggedUser = localStorage.getItem('loggedUser');

  useEffect(() => {
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setHistoricoPontos(user.historicoPontos || []);
    }
  }, [loggedUser]);

  if (!loggedUser) {
    return (
      <div className='painelHorariosContainer'>
        <Nav />
        <p style={{ margin: 'auto' }}>Nenhum usuário logado encontrado!</p>
      </div>
    );
  }

  const user = JSON.parse(loggedUser);

  if (!historicoPontos || historicoPontos.length === 0) {
    return (
      <div className='painelHorariosContainer'>
        <Nav />
        <p style={{ margin: 'auto' }}>
          Não há registros de pontos para exibir.
        </p>
      </div>
    );
  }

  // Função para agrupar os pontos de 2 em 2 (entrada e saída)
  const agruparPontos = (pontos: { date: string }[]) => {
    const pontosAgrupados: { entrada: string; saida: string }[] = [];

    for (let i = 0; i < pontos.length; i += 2) {
      const entrada = pontos[i];
      const saida = pontos[i + 1];

      pontosAgrupados.push({
        entrada: entrada ? entrada.date : '',
        saida: saida ? saida.date : '',
      });
    }

    return pontosAgrupados;
  };

  // Formata cada ponto do histórico
  const formatarPonto = (ponto: { date: string }) => {
    const dateObj = new Date(ponto.date);
    const data = dateObj.toLocaleDateString('pt-BR');
    const horario = dateObj.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    return { data, horario };
  };

  // Função para editar um grupo
  const editarGrupo = (groupIndex: number) => {
    const entradaIndex = groupIndex * 2;
    const saidaIndex = entradaIndex + 1;

    const entrada = historicoPontos[entradaIndex]?.date || '';
    const saida = historicoPontos[saidaIndex]?.date || '';

    setEditIndex(groupIndex);
    setEditPonto({ entrada, saida });
  };

  // Função para salvar a edição
  const salvarEdicaoGrupo = () => {
    if (editIndex === null) return;

    const entradaIndex = editIndex * 2;
    const saidaIndex = entradaIndex + 1;

    const updatedHistorico = [...historicoPontos];

    if (editPonto.entrada)
      updatedHistorico[entradaIndex] = { date: editPonto.entrada };
    if (editPonto.saida)
      updatedHistorico[saidaIndex] = { date: editPonto.saida };

    setHistoricoPontos(updatedHistorico);
    user.historicoPontos = updatedHistorico;
    localStorage.setItem('loggedUser', JSON.stringify(user));

    setEditIndex(null);
    setEditPonto({ entrada: '', saida: '' });
  };

  // Função para excluir um grupo
  const excluirGrupo = (groupIndex: number) => {
    const entradaIndex = groupIndex * 2;

    const updatedHistorico = [...historicoPontos];
    updatedHistorico.splice(entradaIndex, 2);

    setHistoricoPontos(updatedHistorico);
    user.historicoPontos = updatedHistorico;
    localStorage.setItem('loggedUser', JSON.stringify(user));
  };

  const pontosAgrupados = agruparPontos(historicoPontos);

  return (
    <div className='painelHorariosContainer'>
      <Nav />
      <h1 className='painelHorariosTitle'>Histórico de Pontos</h1>

      {editIndex !== null ? (
        <div className='form-edicao'>
          <h2>Editar Ponto</h2>
          <label>
            Entrada:
            <input
              type='datetime-local'
              value={editPonto.entrada}
              onChange={(e) =>
                setEditPonto({ ...editPonto, entrada: e.target.value })
              }
            />
          </label>
          <label>
            Saída:
            <input
              type='datetime-local'
              value={editPonto.saida}
              onChange={(e) =>
                setEditPonto({ ...editPonto, saida: e.target.value })
              }
            />
          </label>
          <button onClick={salvarEdicaoGrupo} className='btn-salvar'>
            Salvar
          </button>
          <button onClick={() => setEditIndex(null)} className='btn-cancelar'>
            Cancelar
          </button>
        </div>
      ) : (
        <table className='painelHorariosTable'>
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Entrada</th>
              <th>Saída</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pontosAgrupados.map((ponto, index) => {
              const entrada = formatarPonto({ date: ponto.entrada });
              const saida = formatarPonto({ date: ponto.saida });

              return (
                <tr key={index}>
                  <td>{user.nome}</td>
                  <td>
                    {entrada.data} {entrada.horario}
                  </td>
                  <td>
                    {saida.data} {saida.horario}
                  </td>
                  <td>
                    <button
                      onClick={() => editarGrupo(index)}
                      className='btn-editar'
                    >
                      Corrigir
                    </button>
                    <button
                      onClick={() => excluirGrupo(index)}
                      className='btn-excluir'
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PainelHorarios;
