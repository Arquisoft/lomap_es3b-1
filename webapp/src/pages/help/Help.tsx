import colores from "./img/colores.png";

type HelpProps = {};

function HelpPage(props: HelpProps): JSX.Element {

    return (
        <>
            <div className="helpPage">
                <div className="contenidoHelp">
                    <div className="centroHelp">
                        <h2>Ayuda</h2>
                        <p>
                            ¡Bienvenido a LoMap, tu herramienta personalizada de mapas locales!
                        </p>
                        <p>
                            ¿Cómo funciona? Es simple. Los usuarios tienen el control total sobre sus propios mapas
                            personalizados. Pueden agregar y organizar lugares de su interés, ya sean bibliotecas,
                            restaurantes, monumentos o cualquier otro punto de referencia que deseen destacar.
                        </p>
                        <p>
                            Tan simple de usar como pulsar sobre el mapa donde quieras agregar un marcador y
                            rellenar el formulario sobre el lugar.
                        </p>
                        <h3>Gamficación</h3>
                        <p>
                            Cada vez que añadas un lugar a uno de tus mapas se te otorgarán 10 puntos a tu perfil,
                            en caso de que incluyas un comentario se añadirán otros 10 puntos, además de 5 puntos por
                            cada foto que incluyas.
                        </p>
                        <p>
                            Cada 100 puntos subirás de nivel y se te asignará un nuevo color, visible en la parte
                            inferior de tu foto de perfi.
                        </p>
                        <img src={colores}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HelpPage;
