import { useState } from 'react';
import { Box, Button, Chip } from '@mui/material';
import Filter from './Filter';
import TuneIcon from '@mui/icons-material/Tune';

export const NavBar = ({ selectedValue, setSelectedValue  }) => {

  return (
    <nav style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end',
    alignItems:'end', position:'absolute', maxWidth:'1200px', width:'100%', padding:'1rem' }} >
        
        <Box zIndex="tooltip"  display='flex' width='100%' justifyContent='space-between'>
        
            <img src="../pokeapi_256.png" width="126px" height='51'/>
            <Filter selectedValue={ selectedValue } setSelectedValue={ setSelectedValue } />
              
        </Box>

    </nav>
  )
}
