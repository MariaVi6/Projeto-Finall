import './CorpoHome.css'
import { useState, useEffect } from 'react'

const CorpoHome = () => {
  const [texto, setTexto] = useState(' ')
  const [notas, setNotas] = useState([])
  const [noticias, setNoticias] = useState([])

  // Puxar 6 notícias de educação automaticamente
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (texto.trim() !== '') {
        setNotas([...notas, texto])
        setTexto('')
      }
    }
  }

  const deletarNota = (index) => {
    setNotas(notas.filter((_, i) => i !== index))
  }

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
        <div className="div-notas">
          <div className="notas">
            <h2 className="titulo-notas">
              <div>Bloco de Notas</div>
            </h2>

            <textarea
              className="input-notas"
              placeholder="Digite seu lembrete"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              onKeyDown={handleKeyDown}></textarea>

            <div className="caixa-guarda-notas">
              {notas.map((n, i) => (
                <div className="nota" key={i}>
                  {n}
                  <button className="botao-excluir-notas" onClick={() => deletarNota(i)}>
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="torpedos">
            <h2 className="titulo-notas">Comunicação</h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default CorpoHome
