import "./Login.css"
const Login = () => {
    return (
        <>
            <form className="container-login">
                <div className="caixa-login-1">
                    <img className="logo-login" alt="logo-da-escola-faculdade" />
                    <p className="descricao-login"></p>

                    <div className="input-container">
                        <input className="input-login" type="text" id="matricula" placeholder=" " />
                        <label className="label-login" htmlFor="matricula">Matrícula</label>
                        <div />

                    </div>
                    <div className="input-container">
                        <input className="input-login" type="password" id="senha" placeholder=" " />
                        <label className="label-login" htmlFor="senha">Senha</label>
                        <h6 className="esqueceu-senha">Esqueceu a senha?</h6>
                    </div>

                    <button className="botao-login" type="submit">Acessar</button>

                </div>

                <div className="caixa-login-2"></div>
            </form>
        </>
    );
}

export default Login;