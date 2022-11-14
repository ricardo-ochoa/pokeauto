import React, { useEffect, useState } from 'react';
import { NextPage, GetStaticProps } from 'next';
import { Box, Grid } from '@mui/material';
import { NavBar, MainCard } from '../components/ui';
import { MainLayout } from '../components/Layouts'
import { IPokemonClean, PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list';

import 'animate.css';
import styles from '../styles/Home.module.css'
import { pokeApi } from '../ApiAxios';
import { fetchPokemons } from '../utils/fetchPokemons';

interface Props {
  pokemonsGeneral: SmallPokemon[];
}

const Home: NextPage<Props> = ({ pokemonsGeneral }) => {

  const [pokemons, setPokemons ] = useState<SmallPokemon[]>( pokemonsGeneral ); 
  const [pokemonsApi, setPokemonsApi ] = useState<number>( pokemons.length );
  
  const [ selectedValue, setSelectedValue ] = useState("");
  const [current, setCurrent ] = useState(`pokemon-color/${selectedValue}`);

  const [back, setBack ] = useState<number>( 0  );
  const [next, setNext ] = useState<number>( 5 );

  const [active, setActive ] = useState( 0 );

  
useEffect(() => {
  if (selectedValue === "" ) {
    setPokemons(pokemonsGeneral)
    setCurrent(`/pokemon-species/?offset=0&limit=800`)
    setPokemonsApi( pokemonsGeneral.length )
  } else if (selectedValue === 'female'){
    setCurrent(`/gender/${selectedValue}`)
  }else if (selectedValue === 'male'){
    setCurrent(`/gender/${selectedValue}`)
  }else if (selectedValue === 'genderless'){
    setCurrent(`/gender/${selectedValue}`)
  }
  else {
    setCurrent(`/pokemon-color/${selectedValue}`)
  }
}, [ selectedValue  ])

useEffect(() => {
  fetchPokemons(current, setPokemons, setPokemonsApi, setNext, setBack, selectedValue)
  setActive( 0 )
}, [ current  ])


  return (
    <Box className={styles.container} >
      <MainLayout title={'PokeAuto'} pageDescription={'Front End Developer Skill Tests'} 
      imageFullUrl={'https://res.cloudinary.com/dnxxkvpiz/image/upload/v1667940010/ochoagram/James-pokemon-guys-17827969-1280-720-4124311520_dca9t3.jpg'}> 
       
        <NavBar selectedValue={ selectedValue } setSelectedValue={ setSelectedValue } />

        <Grid container className='animate__animated animate__zoomInUp animate__delay-2s' >
          <Grid item xs={ 12 }>
            <Box flexDirection='column' display='flex' alignItems='center' justifyContent='center' m={2}>
                <Box style={{ backgroundColor: "#121212",border:"3px solid #000000", minHeight:"400px", margin: "15rem 0 0 0 ",
                                top: "50%",left: "50%", borderRadius:'50px', maxWidth:'500px', width:'100%',
                                display:'flex', justifyContent:'flex-end', alignItems:' center', flexDirection:'column',
                                boxShadow: '0px 60px 71px -40px rgba(0, 0, 0, 0.4)', padding:'1rem' }} >

                  <MainCard pokemonsApi={pokemonsApi} selectedValue={selectedValue} pokemons={pokemons} 
                  back={ back } next={ next } setBack={ setBack } setNext={ setNext } 
                  setActive={ setActive } active={ active}/>

                </Box>
            </Box>
          </Grid>
        </Grid>

      </MainLayout>
    </Box>
  )
}

export async function getServerSideProps() {

  const { data } = await pokeApi.get<PokemonListResponse>('pokemon-species/?offset=0&limit=800');

  const pokemonsGeneral: SmallPokemon[] = data.results.map( (poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${ i + 1 }.png`,
  }))

  return {
    props: {
      pokemonsGeneral
    }
  }
}

export default Home;