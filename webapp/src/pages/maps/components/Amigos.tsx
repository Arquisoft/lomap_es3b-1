import Friends from "../../../pods/Friends";
import { Friend } from "../../../shared/shareddtypes";
import Amigo from "./Amigo";


type AmigosProps = {
    friends:Friend[];
}

function Amigos({friends}: AmigosProps): JSX.Element {
    return (
        <>
            <div className="amigos">
                <div className="header">
                    <p>Amigos</p>
                </div>
                <div className="content">
                    {
                        friends.map((friend) => <Amigo name={friend.name}/>)
                    }
                </div>
            </div>
        </>
    );
}

export default Amigos;