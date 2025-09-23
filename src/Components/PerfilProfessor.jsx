import "./PerfilProfessor.css";

const PerfilProfessor = () => {
  return (
    <div className="perfil-professor">

      <aside className="barra-lateral">
        <img
          className="foto-professor"
          src="https://cdn.mindminers.com/blog/uploads/2021/05/Dani-Almeida_auto_x1.png"

          alt="Icone de Foto de Perfil do Professor"
        />
        <h3>(nome exemplar) Nathália Almeida.</h3>
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
            <h2>Bem-vindo(a), Prof. Nathália Almeida.</h2>
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

export default PerfilProfessor;