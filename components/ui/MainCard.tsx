import React, { FC, useState, useEffect } from 'react'
import { Box, Grid } from '@mui/material'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IPokemonClean, SmallPokemon } from '../../interfaces';
import { Buttom, ButtomBack, List, PokeImage } from '.';
import { Description } from '.';

interface Props {
    pokemons: IPokemonClean[];
    pokemonsApi: number;
    selectedValue: string;
    back: any;
    next: any;
    setBack: any;
    setNext: any;
}

export const MainCard: FC<Props> = ({ pokemons, selectedValue, pokemonsApi , back, next, setBack, setNext }) => {

    // const [back, setBack ] = useState<number>( 0  );
    // const [next, setNext ] = useState<number>( 5 );
    const [active, setActive ] = useState( 0 );

    const nextPage = () => {
        setNext(next + 5)
        setBack(back + 5) 
        setActive( back + 5 )
    }
    
    const backPage = () => {
        next === 5 ? setNext(5) : setNext(next - 5)
        back === 0 ? setBack(0) : setBack(back - 5)
        setActive( back - 5 )
    }
    
  return (
    <>
    { 
        pokemons.map((pokemon) => (
        pokemons.indexOf(pokemon) === active
        ?  
        <Box key={ pokemon.id } maxWidth='500px' width='100%'
            display='flex' justifyContent='flex-end' alignItems='center' flexDirection='column'>
            <PokeImage id={ pokemon.id } name={pokemon.name} img={ pokemon.img } />
            <Description name={ pokemon.name } id={ pokemon.id } selectedValue={ selectedValue } pokemonsApi={ pokemonsApi } />
        </Box>
        :
        <div></div>
        ))
    }  
        <List pokemons={pokemons} back={back} next={next} active={ active } setActive={ setActive } />                                                                 
        <Box maxWidth={'450px'} width='100%' display='flex' alignItems='center' justifyContent='space-between' margin='0 auto'>
            <ButtomBack value={ back } onClick={ ()=> backPage() } pokemonsApi={ pokemonsApi } icon={ <ArrowBackIcon fontSize="inherit" /> }  />
            <Buttom value={ next } onClick={ ()=> nextPage() } pokemonsApi={ pokemonsApi } icon={ <ArrowForwardIcon fontSize="inherit" /> }  />
        </Box> 
    </>
  )

}

