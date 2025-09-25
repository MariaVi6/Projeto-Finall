import "./Perfil.css";
import { useState } from 'react'
const Perfil = () => {
  const [usuario] = useState(JSON.parse(localStorage.getItem('usuario')) || null)

  return (
    <div className="perfil-usuário">

      <aside className="barra-lateral">
        <img
          className="foto-usuário"
          src="https://img.icons8.com/?size=100&id=HmQQr0jYHZxu&format=png&color=000000"

          alt="Icone de Foto de Perfil do usuário"
        />
        <h3>Olá, {usuario && (usuario.nome || 'Fulano de Tal')}</h3>
        <p>Bem vindo ao seu perfil onde você fica por dentro dos assuntos! 💜</p>

        <nav className="menu-barra-lateral">
          <a href="/home">
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
            <h2>Bem-vindo(a), {usuario && (usuario.nome || 'Fulano de Tal')}</h2>
          </div>
        </div>


        <div className="cards">
          <div className="card">
            <p>Provas Concluídas</p>
            <h3>3/10</h3>
          </div>

          <div className="card">
            <p>Frequências</p>
            <h3>147/320</h3>
          </div>

          <div className="card">
            <p>Atividades entregues</p>
            <h3>16/42</h3>
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