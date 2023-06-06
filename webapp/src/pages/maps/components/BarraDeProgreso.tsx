import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

type progresoProps = {
    progress: number;
}

export default function LinearDeterminate(props: progresoProps) {

    return (
        <Box sx={{ width: '10%', marginRight: '1%'}}>
            <p>Exp: {props.progress}/100</p>
            <LinearProgress variant="determinate" value={props.progress} />
        </Box>
    );
}