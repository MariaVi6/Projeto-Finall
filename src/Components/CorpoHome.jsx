import Chat from './Chat'
import './CorpoHome.css'
import { useState, useEffect } from 'react'

const CorpoHome = () => {
  const [texto, setTexto] = useState('')
  const [notas, setNotas] = useState([])
  const [noticias, setNoticias] = useState([])

  // Obtém o e-mail do usuário do localStorage
  const userEmail = localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')).email : null;
  
  // LOG: Verifica se o e-mail do usuário está sendo encontrado
  console.log('E-mail do usuário:', userEmail);

  // Busca notícias ao carregar o componente
  useEffect(() => {
    fetch(`http://localhost:3000/noticias`)
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) {
          setNoticias(data.articles)
        }
      })
      .catch((err) => console.error('Erro ao buscar notícias:', err))
  }, [])

  // Busca as notas do usuário ao carregar o componente
  const buscarNotas = async () => {
    if (!userEmail) {
      console.error('E-mail do usuário não encontrado. Não é possível buscar as notas.');
      return;
    }
    try {
      // Esta rota DEVE ser alterada no back-end para aceitar o e-mail
      const response = await fetch(`http://localhost:3000/usuarios/email/${userEmail}/notas`);
      if (!response.ok) {
        throw new Error('Erro ao buscar notas do usuário');
      }
      const data = await response.json();
      if (data && data.notas) {
        setNotas(data.notas);
      }
    } catch (err) {
      console.error('Erro ao buscar notas:', err);
    }
  };

  useEffect(() => {
    buscarNotas();
  }, [userEmail]);

  // Adiciona uma nova nota (requisição POST)
  const adicionarNota = async () => {
    if (texto.trim() === '' || !userEmail) {
      if (!userEmail) {
        console.error('Erro: E-mail do usuário não encontrado. Por favor, faça login novamente.');
        alert("Erro: E-mail de usuário não encontrado. Por favor, faça login novamente.");
      } else {
        alert("Por favor, digite uma nota.");
      }
      return;
    }

    try {
      console.log('Enviando nova nota para o back-end:', { conteudo: texto, userEmail: userEmail });
      const response = await fetch('http://localhost:3000/notas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conteudo: texto, userEmail: userEmail }),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar a nota');
      }

      const novaNota = await response.json();
      setNotas([...notas, novaNota]);
      setTexto('');
    } catch (err) {
      console.error('Erro ao adicionar nota:', err);
      alert('Erro ao adicionar nota. Verifique a sua conexão ou a rota do back-end.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      adicionarNota();
    }
  };

  // Deleta uma nota (requisição DELETE)
  const deletarNota = async (idDaNota) => {
    try {
      const response = await fetch(`http://localhost:3000/notas/${idDaNota}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar a nota');
      }

      setNotas(notas.filter(nota => nota.id !== idDaNota));
    } catch (err) {
      console.error('Erro ao deletar nota:', err);
      alert('Erro ao deletar nota. Verifique a sua conexão.');
    }
  };

  return (
    <>
      <div className="container-home">
        {/* Notícias */}
        <div className="div-calendarios-eventos">
          <div className="calendarios-eventos">
            <div className="titulo-calendarios-eventos">Notícias</div>
            
            {noticias.map((noticia, index) => (
              <div key={index} className="itens-calendarios-eventos">
                <h3 className="titulo-noticia">{noticia.title}</h3>
                <p className="conteudo-noticia">{noticia.description}</p>
                <a className="ler-mais-noticias" href={noticia.url} target="_blank" rel="noopener noreferrer">
                  Ler mais
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Bloco de Notas */}
        <div className="div-notas-assistente-virtual">
          <div className="notas">
            <div className="titulo-notas">
              Bloco de Notas
            </div>

            {/* Campo de input para o texto da nota */}
            <textarea
              className="input-notas"
              placeholder="Digite seu lembrete"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              onKeyDown={handleKeyDown}>
            </textarea>
            
            {/* Botão para adicionar nota */}
            <button className="botao-adicionar-notas" onClick={adicionarNota}>
              Adicionar Nota
            </button>

            <div className="caixa-guarda-notas">
              {notas.map((nota) => (
                <div className="nota" key={nota.id}>
                  {nota.conteudo}
                  <button className="botao-excluir-notas" onClick={() => deletarNota(nota.id)}>
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="assistente-virtual ">
            <h2 className="titulo-assistente-virtual">Assistente Virtual</h2>
            <Chat />
          </div>
        </div>
      </div>
    </>
  )
}

export default CorpoHome;