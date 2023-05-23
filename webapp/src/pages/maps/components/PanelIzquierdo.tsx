import React from "react";
import Dropdown from "./Dropdown";
import MinimumDistanceSlider from "./MinimumDistanceSlider";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../styles.css";
import {Friend, MapType} from "../../../shared/shareddtypes";
import Amigos from "./Amigos";

type FiltersProps = {
    mapas: MapType[];
    friends: Friend[];
    onCategoriaChange: (selectedOption: string[]) => void;
    onAmigoChange: (selectedOption: string[]) => void;
    onMapaChange: (selectedOption: string[]) => void;
    onMinDistanceChange: (selectedMinDistance: number, selectedMaxDistance: number) => void;
    onButtonClick: () => void;
};

type AmigosProps = {
    friends: Friend[];
};

function PanelIzquierdo({
                            mapas,
                            friends,
                            onCategoriaChange,
                            onAmigoChange,
                            onMapaChange,
                            onMinDistanceChange,
                            onButtonClick,
                        }: FiltersProps): JSX.Element {
    const categories = [
        'Biblioteca',
        'Monumento',
        'Restaurante',
        'Tienda',
        'Parking'
    ];

    const handleCategoriaChange = (selectedOption: string[]) => {
        onCategoriaChange(selectedOption);
    };

    const handleAmigoChange = (selectedOption: string[]) => {
        onAmigoChange(selectedOption);
    };

    const handleMapaChange = (selectedOption: string[]) => {
        onMapaChange(selectedOption);
    };

    const handleMinDistanceChange = (selectedMinDistance: number, selectedMaxDistance: number) => {
        onMinDistanceChange(selectedMinDistance, selectedMaxDistance);
    };

    const handleButtonClick = () => {
        onButtonClick();
    };

    return (
        <div className="panel">
            <div className="filtros">
                <div className="header">
                    <p>Filtros</p>
                </div>
                <div className="menu">
                    <div className="dCategorias">
                        <Dropdown items={categories} dropdownTitle="Categorias" onChange={handleCategoriaChange}/>
                    </div>
                    <div className="dAmigos">
                        <Dropdown items={friends.map((friend) => friend.name)} dropdownTitle="Amigos"
                                  onChange={handleAmigoChange}/>
                    </div>
                    <div className="dMapas">
                        <Dropdown items={mapas.map((mapa) => mapa.id + "-" + mapa.ownerName)} dropdownTitle="Mapas"
                                  onChange={handleMapaChange}/>
                    </div>
                    <div className="slider">
                        <MinimumDistanceSlider value={0} onChange={handleMinDistanceChange}/>
                    </div>
                    <button
                        type="button"
                        onClick={handleButtonClick}
                        className="btn btn-primary"
                    >
                        Aplicar filtros
                    </button>
                </div>
                <Amigos friends={friends}/>
            </div>
        </div>
    );
}

export default PanelIzquierdo;
