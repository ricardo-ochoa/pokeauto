import React, { useEffect, useState } from 'react';
import { NextPage, GetStaticProps } from 'next';
import { Box, Grid } from '@mui/material';
import { NavBar, MainCard } from '../components/ui';
import { MainLayout } from '../components/Layouts'
import { IPokemonClean, PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list';

import 'animate.css';
import styles from '../styles/Home.module.css'
import { pokeApi } from '../ApiAxios';
import { getPokemonInfo } from '../utils/getPokemonInfo';

interface Props {
  pokemonsGeneral: SmallPokemon[];
}

const Home: NextPage<Props> = ({ pokemonsGeneral }) => {

  const [pokemons, setPokemons ] = useState<SmallPokemon[]>( pokemonsGeneral ); 
  const [pokemonsApi, setPokemonsApi ] = useState<number>( pokemons.length );
  
  const [ selectedValue, setSelectedValue ] = useState<any>("");
  const [current, setCurrent ] = useState(`https://pokeapi.co/api/v2/pokemon-color/${selectedValue}`);

  const [back, setBack ] = useState<number>( 0  );
  const [next, setNext ] = useState<number>( 5 );


const getPokemons = async () => {
    try {
        let url = current
        const { data } = await pokeApi.get( url );

      return data;
      
    } catch(err) {}
}

const getPokemonsData = async (url: RequestInfo | URL) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      return data;
    } catch( error ){}
}

const fetchPokemons = async () => {
    try {
      const data = await getPokemons();

      setNext( 5 )
      setBack( 0 )

      const promises = data.pokemon_species.map(async (pokemon: { url: any; }) => {
          return await getPokemonsData( pokemon.url)
      })
      

      const results = await Promise.all(promises)
      setPokemons( results )
      setPokemonsApi( results.length )
      console.log( results )
      

    } catch( error ) {}
}


useEffect(() => {

  if ( selectedValue === 'male' || 'female' || 'genderless' ) {
  
    setCurrent(`https://pokeapi.co/api/v2/gender/${selectedValue}`)
   
  } else if (selectedValue === "" ) {
    setPokemons(pokemonsGeneral)
    setCurrent(`https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=800`)
    setPokemonsApi( pokemonsGeneral.length )
  }
  else {
    setCurrent(`https://pokeapi.co/api/v2/pokemon-color/${selectedValue}`)
  }


}, [ selectedValue  ])

useEffect(() => {
  getPokemons()
  fetchPokemons()
 console.log( selectedValue, current )

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
                  back={ back } next={ next } setBack={ setBack } setNext={ setNext } />

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