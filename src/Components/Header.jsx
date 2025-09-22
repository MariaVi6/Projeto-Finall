import "./Header.css"
const Header = () => {
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
            <div className="aluno"></div>
        </div>
    </div>
    </>
);
}

export default Header;