import "./About.css"
import asw from "./img/asw.png";

function AboutPage(): JSX.Element {

    return (
        <>
            <div className="aboutPage">
                <div className="contenidoAbout">
                    <div className="centroAbout">
                        <h2> ¿Qué es LOMAP?</h2>
                        <p>
                            LoMap es un sistema de desarrollo de software versátil y personalizable que permite a los
                            ciudadanos crear mapas personalizados, almacenar información sobre lugares de interés y
                            compartir experiencias con amigos. Su objetivo es facilitar la exploración de la ciudad y
                            brindar a los usuarios una herramienta poderosa para descubrir nuevos lugares y
                            establecimientos locales.
                        </p>
                        <h2>
                            ¿Quíenes somos?
                        </h2>
                        <p>
                            Este trabajo ha sido realiado a partir del proyecto realizado por el grupo <a
                            href="https://github.com/Arquisoft/lomap_es3b">Lomap_es3b</a>.
                        </p>
                        <p>
                            El trabajo se encuentra en un repositorio público que puedes visitar desde este <a
                            href="https://github.com/Arquisoft/lomap_es3b-1">enlace</a>.
                        </p>
                        <a href="https://arquisoft.github.io/course2223/labEnunciadoPractica.html">
                            <img src={asw} alt="asw" style={{ width: '75px', height: '75px' }} />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutPage;
