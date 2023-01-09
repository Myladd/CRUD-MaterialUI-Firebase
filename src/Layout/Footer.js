import * as React from 'react';
import Box from '@mui/material/Box';

export default function Footer() {
    return (
        <Box component="span" sx={{ p: 2, border: '1px dashed grey', width:"100%", position:"fixed", bottom: 0, backgroundColor:"#1976D2"}}>
            <h3 style={{display:"flex", justifyContent:"center", color:"white"}}>Made By &#128155;</h3>
        </Box>
    );
}