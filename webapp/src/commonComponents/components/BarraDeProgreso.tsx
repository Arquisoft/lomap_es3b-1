import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from "@mui/material/Tooltip";

type progresoProps = {
    progress: number;
    level: number;
    widthPercent: number;
}

export default function LinearDeterminate(props: progresoProps) {
    return (
        <Box sx={{ width: `${props.widthPercent}%`, marginRight: '1%', marginLeft: '1%'}}>
            <p>Nivel: {props.level}</p>
            <Tooltip title={`${props.progress}/100`} placement="top">
                <LinearProgress variant="determinate" value={props.progress} />
            </Tooltip>
        </Box>
    );
}