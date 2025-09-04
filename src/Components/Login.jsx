import "./Login.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Login = () => {

    const [matricula, setMatricula] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!matricula || !senha) {
            setErro("Preencha todos os campos.");
            return;
        }

        if (senha.length < 6) {
            setErro("A senha deve ter pelo menos 6 caracteres");
            return;
        }

        console.log("Matrícula:", matricula, "Senha:", senha);
        setErro("");

        navigate("/home");
    }

    return (
        <>
            <form className="container-login" onSubmit={handleSubmit}>
                <div className="caixa-login-1">
                    <img className="logo-login" src="/public/logo-2.svg" alt="logo-da-escola-faculdade" />
                    <p className="descricao-login">Bem vindo aos serviços digitais da Universidade IntelliPort</p>

                    <div className="input-container">
                        <input className="input-login" type="text" id="matricula" placeholder=" " value={matricula} onChange={(e) => setMatricula(e.target.value)} />
                        <label className="label-login" htmlFor="matricula">Matrícula</label>

                    </div>
                    <div className="input-container">
                        <input className="input-login" type="password" id="senha" placeholder=" " value={senha} onChange={(e) => setSenha(e.target.value)} />
                        <label className="label-login" htmlFor="senha">Senha</label>
                        <h6 className="esqueceu-senha">Esqueceu a senha?</h6>

                        {erro && <p className="erro-login">{erro}</p>}

                    </div>

                    <button className="botao-login" type="submit">Acessar</button>

                </div>

                <div className="caixa-login-2"></div>
            </form>
        </>
    );
}

export default Login;