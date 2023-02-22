import React from 'react';

type TabProps = {
    title:String;
    selected?:boolean;
}

//Elemento Tab que indica la pestaña de la información en la que te encuentras.
function Tab(props:TabProps):JSX.Element{
    return (
        <>
            {/* Posiblemente a posteriori se necesite utilizar un botón en vez de un div */}
            <div className="tab">
                <p className="titulo">{props.title}</p>
            </div>
        </>
    );
}

export default Tab;