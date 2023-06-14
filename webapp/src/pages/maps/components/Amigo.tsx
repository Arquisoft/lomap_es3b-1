import { useState, useEffect } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import {
    getSolidDatasetWithAcl,
    getAgentAccess
} from "@inrupt/solid-client";
import {changePermissions, getAmigoAccess} from "../../../pods/Friends";

type AmigoProps = {
    name: string,
    webId: string
}

function Amigo({ name, webId }: AmigoProps): JSX.Element {
    const { session } = useSession();

    const [access, setAccess] = useState(false);

    useEffect(() => {
        getAmigoAccess(session,webId,setAccess);
    });

    return (
        <>
            <div className="amigo">
                <p>{name}</p>
                <button className={access ? "green" : "red"} onClick={async () => {
                    await changePermissions(webId,session,access,setAccess);
                }}></button>
            </div>
        </>
    );
}

export default Amigo;
