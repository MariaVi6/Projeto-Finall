import "./Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { use } from "react";

const Login = () => {
    const [modo, setModo] = useState("login");
    const [usuario, setUsuario] = useState([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [sucesso, setSucesso] = useState("");
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
            await axios.post("http://localhost:3000/logar", {
                email,
                senha,
            });
            setEmail("");
            setSenha("");
            setErro("");
            setSucesso("Logado com sucesso");
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
            const res = await axios.post("http://localhost:3000/usuarios", {
                email,
                senha,
            });
            setUsuario([...usuario, res.data]);
            setEmail("");
            setSenha("");
            setErro("");
            setSucesso("Cadastrado com sucesso");
        } catch (error) {
            setErro("Usuario já existente");
        }
    };

    return (
        <>
            <div className={`pagina-login ${modo}`}>
                <div className="container-login">

                    {/* CAIXA LOGIN */}
                    <form className="caixa-login-1" onSubmit={logar}>
                        <img className="logo-login" src="/src/Image/Logo-intelliport.svg" alt="logo-da-faculdade"/>
                        <p className="descricao-login">Bem vindo aos serviços digitais da Universidade IntelliPort</p>

                        <div className="input-container">
                            <input className="input-login" type="email" id="email" placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <label className="label-login" htmlFor="email">Email</label>
                        </div>
                        <div className="input-container">
                            <input className="input-login" type="password" id="senha" placeholder=" " value={senha} onChange={(e) => setSenha(e.target.value)}/>
                            <label className="label-login" htmlFor="senha">Senha</label>
                            <h6 className="esqueceu-senha">Esqueceu a senha?</h6>

                            {erro && <p className="erro-login">{erro}</p>}
                            {sucesso && <p className="sucesso-login">{sucesso}</p>}
                        </div>

                        <Link to={"/home"}><button className="botao-login" type="submit">Acessar</button></Link>
                        <h6 className="trocar-paineis" onClick={() => setModo("registro")} >Não tem conta? Registrar</h6>
                    </form>

                    {/* CAIXA IMAGEM */}

                    <div className="caixa-login-2"></div>

                    {/* CAIXA REGISTRO */}

                    <form className="caixa-login-3" onSubmit={cadastrar}>
                        <img className="logo-login" src="/src/Image/Logo-intelliport.svg" alt="logo-da-faculdade"/>
                        <p className="descricao-login">Bem vindo a Universidade IntelliPort <br />Crie sua conta</p>

                        <div className="input-container">
                            <input className="input-login" type="text" id="nome" placeholder=" " value={nome} onChange={(e) => setNome(e.target.value)}/>
                            <label className="label-login" htmlFor="nome">Nome</label>
                        </div>

                        <div className="input-container">
                            <input className="input-login" type="email" id="email" placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <label className="label-login" htmlFor="email">Email</label>
                        </div>
                        <div className="input-container">
                            <input className="input-login" type="password" id="senha" placeholder=" " value={senha} onChange={(e) => setSenha(e.target.value)}/>
                            <label className="label-login" htmlFor="senha">Senha</label>


                            {erro && <p className="erro-login">{erro}</p>}
                            {sucesso && <p className="sucesso-login">{sucesso}</p>}
                        </div>

                        <Link to={"/home"}></Link><button className="botao-login" type="submit">Registrar</button>

                        <h6 className="trocar-modo-2" onClick={() => setModo("login")} >Já tem conta? Entrar</h6>
                    </form>

                </div>
            </div>
        </>
    );
};

export default Login;
