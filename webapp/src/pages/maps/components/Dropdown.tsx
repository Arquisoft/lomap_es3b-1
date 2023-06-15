import * as React from 'react';
import {Theme, useTheme} from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {SelectChangeEvent} from "@mui/material";
import {handleChangeDropdown} from "../../../pods/DropdownFunction";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: string[], theme: Theme): any {
    if (personName !== undefined) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
            color: "white",
            background: "#131516",
            border: "#131516",
        };
    } else {
        return {
            fontWeight:
            theme.typography.fontWeightRegular,
            color: "white",
            background: "#131516",
            border: "#131516",
        }
    }
}

type DropdownProps = {
    items: string[];
    dropdownTitle: string;
    onChange: (selectedOption: string[]) => void;
}


function Dropdown(props: DropdownProps): JSX.Element {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);


    const handleChange = (event: SelectChangeEvent<string | string[]>) => {
        handleChangeDropdown(event, props, setPersonName).catch(r => {});
    };

    return (
        <div>
            <FormControl sx={{m: 1, width: 300}}>
                <InputLabel id={"dropdown-" + props.dropdownTitle + "-label"}
                            style={{color: "white"}}
                >{props.dropdownTitle}</InputLabel>
                <Select
                    labelId={"dropdown-" + props.dropdownTitle + "-label"}
                    style={{color: "white"}}
                    id={"dropdown-" + props.dropdownTitle}
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label={props.dropdownTitle}/>}
                    MenuProps={MenuProps}
                    sx={{
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: "#7C00D4", // Cambiar aquí el color del borde cuando desplegado
                        },
                        '& .MuiSelect-icon': {
                            color: 'white', // Cambiar aquí el color de la flecha
                        },
                    }}
                >
                    {props.items.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default Dropdown;
