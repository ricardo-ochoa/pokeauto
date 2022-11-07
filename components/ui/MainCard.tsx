import React, { FC, useEffect,useState } from 'react'
import { Box, CardMedia, Typography, IconButton, Grid } from '@mui/material'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IPokemonClean } from '../../pages';



interface Props {
    pokemons: IPokemonClean[];
    back: string | null;
    next: string | null;
    current: string;
}


export const MainCard: FC<Props> = ({ pokemons, back, next, current }) => {

    const [currentPage, setCurrentPage ] = useState(current);

    const [goback, setGoback ] = useState(back);
    const [gonext, setGonext ] = useState(next);

    const [miniaturas, setMiniaturas ] = useState( pokemons );


    useEffect(() => {
        setMiniaturas( pokemons )
    }, [pokemons])
    
  return (

            
            <>

            </>

  )

}

