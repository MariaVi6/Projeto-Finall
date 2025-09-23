import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [modo, setModo] = useState('login')
  const [usuario, setUsuario] = useState([])
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  const trocarModo = (modo) => {
    limparMensagens()
    limparCampos()
    setModo(modo)
  }

  const limparMensagens = () => {
    setErro('')
    setSucesso('')
  }

  const limparCampos = () => {
    setNome('')
    setEmail('')
    setSenha('')
  }

  const logar = async (e) => {
    e.preventDefault()
    limparMensagens()

    if (!email || !senha) {
      setErro('Preencha todos os campos.')
      return
    }

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres')
      return
    }

    try {
      const resultado = await axios
        .post('http://localhost:3000/logar', {
          email,
          senha
        })
        .then((res) => res.data)
        .catch((err) => {
          throw err
        })

      const data = resultado.data
      localStorage.setItem(
        'usuario',
        JSON.stringify({
          id: data.usuario.id,
          nome: data.usuario.nome
        })
      )
      localStorage.setItem('access_token', data.access_token)

      limparCampos()
      setSucesso('Logado com sucesso')
      navigate('/home')
    } catch {
      setErro('Email ou senha incorreta.')
    }
  }

  const cadastrar = async (e) => {
    e.preventDefault()
    limparMensagens()

    if (!email || !senha) {
      setErro('Preencha todos os campos.')
      return
    }

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres')
      return
    }

    try {
      const res = await axios.post('http://localhost:3000/usuarios', {
        nome,
        email,
        senha
      })
      setUsuario([...usuario, res.data])
      limparCampos()
      setSucesso('Cadastrado com sucesso')
    } catch {
      setErro(`Usuario já existente!`)
    }
  }

  return (
    <>
      <div className={`pagina-login ${modo}`}>
        <div className="container-login">
          {/* CAIXA LOGIN */}
          <form className="caixa-login-1" onSubmit={logar}>
            <img className="logo-login" src="/src/Image/Logo-intelliport.svg" alt="logo-da-faculdade" />
            <p className="descricao-login">Bem vindo aos serviços digitais da Universidade IntelliPort</p>

            <div className="input-container">
              <input
                className="input-login"
                type="email"
                id="email"
                name="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="label-login" htmlFor="email">
                Email
              </label>
            </div>
            <div className="input-container">
              <input
                className="input-login"
                type="password"
                id="senha"
                name="senha"
                placeholder=" "
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <label className="label-login" htmlFor="senha">
                Senha
              </label>
              <h6 className="esqueceu-senha">Esqueceu a senha?</h6>

              {erro && <p className="erro-login">{erro}</p>}
              {sucesso && <p className="sucesso-login">{sucesso}</p>}
            </div>

            <button className="botao-login" type="submit">
              Acessar
            </button>
            <h6 className="trocar-paineis" onClick={() => trocarModo('registro')}>
              Não tem conta? Registrar-se
            </h6>
          </form>

          {/* CAIXA IMAGEM */}

          <div className="caixa-login-2"></div>

          {/* CAIXA REGISTRO */}

          <form className="caixa-login-3" onSubmit={cadastrar}>
            <img className="logo-login" src="/src/Image/Logo-intelliport.svg" alt="logo-da-faculdade" />
            <p className="descricao-login">
              Bem vindo a Universidade IntelliPort <br />
              Crie sua conta
            </p>

            <div className="input-container">
              <input
                className="input-login"
                type="text"
                id="nome"
                placeholder=" "
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <label className="label-login" htmlFor="nome">
                Nome
              </label>
            </div>

            <div className="input-container">
              <input
                className="input-login"
                type="email"
                id="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="label-login" htmlFor="email">
                Email
              </label>
            </div>
            <div className="input-container">
              <input
                className="input-login"
                type="password"
                id="senha"
                placeholder=" "
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <label className="label-login" htmlFor="senha">
                Senha
              </label>

              {erro && <p className="erro-login-2">{erro}</p>}
              {sucesso && <p className="sucesso-login">{sucesso}</p>}
            </div>

            <button className="botao-login" type="submit">
              Registrar
            </button>
            <h6 className="trocar-modo-2" onClick={() => trocarModo('login')}>
              Já tem conta? Entrar
            </h6>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
