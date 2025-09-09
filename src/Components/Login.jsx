import "./Login.css";
import { useState } from "react";
import axios from "axios";
const Login = () => {
    const [usuario, setUsuario] = useState([]);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [sucesso,setSucesso] = useState('')
    const [erro, setErro] = useState("");
    
    const logar = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
        setErro("Preencha todos os campos.");
        return;
    }

    if (senha.length < 6) {
        setErro("A senha deve ter pelo menos 6 caracteres");
        return;
    }

    try {
        const res = await axios.post("http://localhost:3000/logar", { email, senha });
        setEmail("");
        setSenha("");
        setErro("logado com sucesso");
    } catch (error) {
        setErro("Email ou senha incorreta.");
    }
};


const cadastrar = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
        setErro("Preencha todos os campos.");
        return;
    }

    if (senha.length < 6) {
        setErro("A senha deve ter pelo menos 6 caracteres");
        return;
    }

    try {
        const res = await axios.post("http://localhost:3000/usuarios", { email, senha });
        setUsuario([...usuario, res.data]);
        setEmail("");
        setSenha("");
        setSucesso("Cadastrado com sucesso");
    } catch (error) {
        setSucesso("Usuario ja existente");
    }
};



    return (
        <>
            <div className="pagina-login">
                <form className="container-login" onSubmit={logar}>
                    <div className="caixa-login-1">
                        <img
                            className="logo-login"
                            src="logo-2.svg"
                            alt="logo-da-escola-faculdade"
                        />
                        <p className="descricao-login">
                            Bem vindo aos serviços digitais da Universidade IntelliPort
                        </p>

                        <div className="input-container">
                            <input
                                className="input-login"
                                type="email"
                                id="matricula"
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
                            <h6 className="esqueceu-senha">Esqueceu a senha?</h6>

                            {erro && <p className="erro-login">{erro}</p>}
                        </div>

                        <button className="botao-login" type="submit">
                            Acessar
                        </button>
                    </div>

                    <div className="caixa-login-2"></div>
                </form>
            </div>
            
            <div className="pagina-login">
                <form className="container-login" onSubmit={cadastrar}>
                    <div className="caixa-login-1">
                        <img
                            className="logo-login"
                            src="logo-2.svg"
                            alt="logo-da-escola-faculdade"
                        />
                        <p className="descricao-login">
                            Bem vindo aos serviços digitais da Universidade IntelliPort
                        </p>

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
                            <h6 className="esqueceu-senha">Esqueceu a senha?</h6>

                            {erro && <p className="erro-login">{erro}</p>}
                        </div>

                        <button className="botao-login" type="submit">
                            Acessar
                        </button>
                    </div>

                    <div className="caixa-login-2"></div>
                </form>
            </div>
        </>
    );
};

export default Login;
