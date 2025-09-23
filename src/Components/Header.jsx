import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Header.css'

const Header = () => {
  const [token, setToken] = useState(localStorage.getItem('access_token') || '')
  const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('usuario')) || null)

  const navigate = useNavigate()

  const limparCredenciais = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('usuario')
    setToken('')
    setUsuario(null)
  }

  const logout = () => {
    limparCredenciais()
    navigate('/')
  }

  useEffect(() => {
    if (!token || !usuario) {
      console.log('teste')
      navigate('/')
    }
  }, [token, usuario, navigate])

  return (
    <>
      <div className="header">
        <img className="logo-home" src="/src/Image/Logo-intelliport-header.svg" alt="logo-home" />
        <div className="indice-header">
          <div className="itens-indice-header">Frequência</div>
          <div className="itens-indice-header">Bloco de Notas</div>
          <div className="itens-indice-header">Matrícula</div>
          <div className="itens-indice-header">Assistente Virtual</div>
        </div>
        <div className="login-aluno">
          <div className="aluno">Bem Vindo{" "}{usuario && (usuario.nome || 'Fulano de Tal')}</div>
          <div className="div-botao-sair">
            <a className="cursor-pointer" onClick={logout}>
              Sair
            </a>
          </div>
        </div> 
      </div>
    </>
  )
}

export default Header
