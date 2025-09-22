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
          <div className="itens-indice-header">Notas</div>
          <div className="itens-indice-header">Comunicação</div>
          <div className="itens-indice-header">Matricula</div>
        </div>
        <div className="login-aluno">
          <div className="aluno">{usuario && (usuario.nome || 'Fulano de Tal')}</div>
          <div className="aluno">
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
