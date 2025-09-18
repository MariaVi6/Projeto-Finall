import "./CorpoHome.css"
import { useState } from "react";
const CorpoHome = () => {

    const [texto, settexto] = useState(" ");
    const [notas, setnotas] = useState([]);

    const handleKeyDown = (e) =>{

        if(e.key === "Enter") {
            e.preventDefault();
            if(texto.trim() !== ""){
                setnotas([...notas, texto]);
                settexto("");
            }
        }

    }

    return ( 
    <>
    <div className="container-home">
        <div className="div-calendarios-eventos">
        <div className="calendarios-eventos">
            <div className="titulo-calendarios-eventos">Notícias</div>
            <div className="itens-calendarios-eventos"></div>
            <div className="itens-calendarios-eventos"></div>
            <div className="itens-calendarios-eventos"></div>
            <div className="itens-calendarios-eventos"></div>
            <div className="itens-calendarios-eventos"></div>
            <div className="itens-calendarios-eventos"></div>
        </div>
        </div>
        <div className="div-notas">
        <div className="notas">
            <h2 className="titulo-notas">
                <div>Bloco de Notas</div>
            </h2>
            <textarea className="input-notas" placeholder="Digite seu lembrete" value={texto} onChange={(e) => settexto(e.target.value)} onKeyDown={handleKeyDown}></textarea>
            <div className="caixa-guarda-notas">{notas.map((n, i) => (
        <div className="nota" key={i}>{n} </div>
        ))}</div>
        </div>
        <div className="torpedos">
            <h2 className="titulo-notas">Comunicação</h2>
        </div>
        </div>
    </div>
    </>
    );
}

export default CorpoHome;