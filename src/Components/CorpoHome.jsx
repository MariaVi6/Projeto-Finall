import Chat from './Chat';
import './CorpoHome.css';
import { useState, useEffect } from 'react';

const CorpoHome = ({ usuarioId, token, nome }) => {
  const [texto, setTexto] = useState('');
  const [notas, setNotas] = useState([]);
  const [noticias, setNoticias] = useState([]);

  // Buscar notícias
  useEffect(() => {
    fetch("http://localhost:3000/noticias")
      .then(res => res.json())
      .then(data => {
        if (data.articles) setNoticias(data.articles);
      })
      .catch(err => console.error('Erro ao buscar notícias:', err));
  }, []);

  // Buscar notas do usuário
  const buscarNotas = async () => {
    if (!usuarioId) return;

    try {
      const response = await fetch(`http://localhost:3000/usuarios/${usuarioId}/notas`);
      if (!response.ok) throw new Error('Erro ao buscar notas');
      const data = await response.json();
      if (data && data.notas) setNotas(data.notas);
    } catch (err) {
      console.error('Erro ao buscar notas:', err);
    }
  };

  useEffect(() => {
    buscarNotas();
  }, [usuarioId]);

  // Adicionar nota
  const adicionarNota = async () => {
    if (!texto.trim()) {
      alert("Erro: Usuário não encontrado ou texto vazio.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/usuarios/${usuarioId}/notas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conteudo: texto }), // ajustado para conteudo
        
      });

      if (!response.ok) throw new Error('Erro ao adicionar nota');

      const { nota } = await response.json();
      setNotas([...notas, nota]);
      setTexto('');
    } catch (err) {
      console.error('Erro ao adicionar nota:', err);
    }
  };

  // Deletar nota
  const deletarNota = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/notas/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erro ao deletar nota');
      setNotas(notas.filter(nota => nota.id !== id));
    } catch (err) {
      console.error('Erro ao deletar nota:', err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      adicionarNota();
    }
  };

  return (
    <div className="container-home">
      <div className="div-calendarios-eventos">
        <div className="calendarios-eventos">
          <div className="titulo-calendarios-eventos">Notícias</div>
          {noticias.map((noticia, index) => (
            <div key={index} className="itens-calendarios-eventos">
              <h3 className="titulo-noticia">
                {noticia.title.length > 60 ? noticia.title.substring(0, 60) + "..." : noticia.title}
              </h3>
              <p className="conteudo-noticia">{noticia.description}</p>
              <a className="ler-mais-noticias" href={noticia.url} target="_blank" rel="noopener noreferrer">
                Ler mais
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="div-notas-assistente-virtual">
        <div className="notas">
          <div className="titulo-notas">Bloco de Notas</div>
          <textarea
            className="input-notas"
            placeholder="Digite seu lembrete"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="botao-adicionar-notas" onClick={adicionarNota}>
            Adicionar Nota
          </button>
          <div className="caixa-guarda-notas">
            {notas.map((nota) => (
              <div className="nota" key={nota.id}>
                {nota.conteudo} {/* ajustado para conteudo */}
                <button className="botao-excluir-notas" onClick={() => deletarNota(nota.id)}>
                  Excluir
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="assistente-virtual">
          <h2 className="titulo-assistente-virtual">Assistente Virtual</h2>
          <Chat usuarioId={usuarioId} token={token} nome={nome} />
        </div>
      </div>
    </div>
  );
};

export default CorpoHome;
