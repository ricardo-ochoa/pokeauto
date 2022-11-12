import React, { FC, useState } from 'react'
import { Box, Grid } from '@mui/material'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IPokemonClean } from '../../interfaces';
import { Buttom, ButtomBack, List, PokeImage } from '.';
import { Description } from '.';

interface Props {
    pokemons: IPokemonClean[];
    pokemonsApi: number;
    selectedValue: string;
}

export const MainCard: FC<Props> = ({ pokemons, selectedValue, pokemonsApi }) => {

    const [back, setBack ] = useState<number>( 0  );
    const [next, setNext ] = useState<number>( 5 );
    const [active, setActive ] = useState( back );

    const nextPage = () => {
        setNext(next + 5)
        setBack(back + 5) 
        setActive( back + 5 )

        console.log( back, next)
    }
    
    const backPage = () => {
        next === 5 ? setNext(5) : setNext(next - 5)
        back === 0 ? setBack(0) : setBack(back - 5)
        
        setActive( back - 5 )
        console.log( back, next)
    }

    const mainPokemons = ( id: React.SetStateAction<number> ) => {
        setActive( id )
    }
    
  return (
    <Grid container className='animate__animated animate__zoomInDown'>
        <Grid item xs={ 12 } >
            <>
            { 
            pokemons.map((poke) => ( pokemons.indexOf(poke) === active 
            ? 
                <>
                    <Box  flexDirection='column' display='flex' alignItems='center' justifyContent='center' m={2}>

                        <Box style={{ backgroundColor: "#121212",border:"3px solid #000000", minHeight:"400px", margin: "15rem 0 0 0 ",
                            top: "50%",left: "50%", borderRadius:'50px', maxWidth:'500px', width:'100%',
                            display:'flex', justifyContent:'flex-end', alignItems:' center', flexDirection:'column',
                            boxShadow: '0px 60px 71px -40px rgba(0, 0, 0, 0.4)', padding:'1rem' }} >

                        <PokeImage id={ poke.id } name={ poke.name } />
                        <Description name={ poke.name } id={ poke.id } selectedValue={ selectedValue } pokemonsApi={ pokemonsApi } />               
                        <List pokemons={pokemons} back={back} next={next} active={ active } mainPokemons={ mainPokemons } />                   
                        
                        <Box maxWidth={'450px'} width='100%' display='flex' alignItems='center' justifyContent='space-between' margin='0 auto'>
                            <ButtomBack value={ back } onClick={ ()=> backPage() } pokemonsApi={ pokemonsApi } icon={ <ArrowBackIcon fontSize="inherit" /> }  />
                            <Buttom value={ next } onClick={ ()=> nextPage() } pokemonsApi={ pokemonsApi } icon={ <ArrowForwardIcon fontSize="inherit" /> }  />
                        </Box>  

                        </Box>
                    </Box>
                </>
            : 
                <div><span></span></div>
            ))
            }
            </>
        </Grid>
    </Grid>
  )

}

