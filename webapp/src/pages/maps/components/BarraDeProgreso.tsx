import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearDeterminate() {
    const [progress, setProgress] = React.useState(0);

    return (
        <Box sx={{ width: '10%', marginRight: '1%'}}>
            <p>Exp:</p>
            <LinearProgress variant="determinate" value={progress} />
        </Box>
    );
}