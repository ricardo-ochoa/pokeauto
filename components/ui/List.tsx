import React, { useState } from 'react'
import { CardMedia, Box } from '@mui/material'

export const List = ({ pokemons, back, next, active, setActive }) => {

  const mainPokemons = ( id: React.SetStateAction<number> ) => {
    setActive( id )
  }


  return (
    <Box maxWidth='350px' width='100%' display='flex' alignItems='center' justifyContent='space-between' marginBottom='1rem' marginTop='1rem'>
    {
    pokemons.slice(back, next).map((poke: { name: React.Key; id: number }) =>( 
      <CardMedia
          key={ poke.id + 2 }
          className='thumbs animate__animated animate__swing'
          onClick={ () => mainPokemons( pokemons.indexOf( poke ) ) }
          component="img"
          image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${ poke.id }.png`}
          sx={{width: "50px", maxHeight:'50px',borderRadius:'100px',
              filter: pokemons.indexOf( poke ) === active ? "drop-shadow(0px 10px 10px rgba(50, 70, 0, 1))": 'none', objectFit:'fill', cursor:'pointer'}}
      />
    ))
    }
    </Box>
  )
}
