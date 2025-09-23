import "./Perfil.css";

const Perfil = () => {
  const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('usuario')) || null)
  return (
    <div className="perfil-usuário">

      <aside className="barra-lateral">
        <img
          className="foto-usuário"
          src="https://cdn-icons-png.flaticon.com/512/3106/3106807.png"

          alt="Icone de Foto de Perfil do usuário"
        />
        <h3>Olá, {usuario && (usuario.nome || 'Fulano de Tal')}</h3>
        <p>Docente em Análise e Desenvolvimento de Sistemas!</p>


        <nav className="menu-barra-lateral">
          <a href="#">
            <img src="https://img.icons8.com/ios-filled/24/ffffff/home.png" alt="Painel" />
            Início
          </a>
          <a href="#">
            <img src="https://img.icons8.com/ios-filled/24/ffffff/document.png" alt="Histórico" />
            Histórico
          </a>
          <a href="#">
            <img src="https://img.icons8.com/ios-filled/24/ffffff/appointment-reminders.png" alt="Notificações" />
            Comunicados e Notificações
          </a>

        </nav>

      </aside>

      {/* Conteúdo  dos cards  */}
      <main className="conteudo">
        <div className="barra-bemvindo">
          <div className="bemvindo-texto">
            <h2>Bem-vindo(a), .</h2>
          </div>
        </div>


        <div className="cards">
          <div className="card">
            <p>Total de alunos da turma</p>
            <h3>320</h3>
          </div>

          <div className="card">
            <p>Notas pendentes</p>
            <h3>47</h3>
          </div>

          <div className="card">
            <p>Atividades entregues</p>
            <h3>157/320</h3>
          </div>

          <div className="card">
            <p>Notificações</p>
            <h3>3</h3>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Perfil;