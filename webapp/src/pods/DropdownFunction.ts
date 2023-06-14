import {SelectChangeEvent} from "@mui/material";

export async function handleChangeDropdown(event: SelectChangeEvent<string | string[]>, props: any, setPersonName: any) {
    const {target: {value}} = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value,
    );
    props.onChange(typeof value === 'string' ? value.split(',') : value);
};