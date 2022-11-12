import React, { useEffect, useState } from 'react';
import { Box, Chip, Button } from '@mui/material';
import { NavBar, MainCard } from '../components/ui';
import { MainLayout } from '../components/Layouts'
import { IPokemonClean } from '../interfaces/pokemon-list';

import 'animate.css';
import styles from '../styles/Home.module.css'

export default function Home() {

  const [pokemonsApi, setPokemonsApi ] = useState<number>( 0 );
  const [pokemons, setPokemons ] = useState<IPokemonClean[]>( [] ); 
  const [ selectedValue, setSelectedValue ] = useState("");


  const [current, setCurrent ] = useState<RequestInfo | URL>(`https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`);

  const [allcurrent, setAllCurrent ] = useState<RequestInfo | URL>(`https://pokeapi.co/api/v2/pokemon?limit=500&offset=0`);


////
  const getPokemons = async () => {
    try {
      let url = current
      const response = await fetch( url );
      const data = await response.json();

      return data;
      
    } catch(err) {
  
    }
  }

  const getPokemonsData = async (url: RequestInfo | URL) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      return data;
    } catch( error ){

    }
  }

  const fetchPokemons= async () => {
    try {
      const data = await getPokemons();
      const promises = data.pokemon_species.map(async (pokemon: { url: any; }) => {
        return await getPokemonsData( pokemon.url)
      })

      const results = await Promise.all(promises)
      setPokemons( results )
      setPokemonsApi( results.length )
    } catch( error ) {}
  }

///// All /////

  const getAllPokemons = async () => {
    try {
      let url = allcurrent
      const response = await fetch( url );
      const data = await response.json();

      return data;
      
    } catch(err) {
  
    }
  }

  const fetchAllPokemons= async () => {
    try {
      const data = await getPokemons();

      const promises = data.results.map(async (pokemon: { url: any; }) => {
        return await getPokemonsData( pokemon.url)
      })

      const results = await Promise.all(promises)
     
      setPokemons( results )
      setPokemonsApi( results.length )

    } catch( error ) {}
  }

///// Gender /////

const getGendersPokemons = async () => {
  try {
    let url = current
    const response = await fetch( url );
    const data = await response.json();

    
    return data;
    
  } catch(err) {

  }
}

const getPokemonsGenderData = async (url: RequestInfo | URL) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    return data
  } catch( error ){

  }
}

const fetchGenderPokemons= async () => {
  try {
    const data = await getPokemons();
    

    const promises = data.results.pokemon_species.pokemon_species_details.map(async (pokemon: { url: any; }) => {
      return await getPokemonsData( pokemon.url)
    })
    
   
    const results = await Promise.all(promises)
   
    setPokemons( results )
    setPokemonsApi( results.length )

  } catch( error ) {}
}

  useEffect(() => {

    if ( selectedValue != "" ){
      fetchPokemons();
      fetchGenderPokemons();
    } else {
      fetchAllPokemons();
    }
    
  }, [ current, selectedValue ])

  useEffect(() => {

    if( selectedValue === 'male' ){
      setCurrent(`https://pokeapi.co/api/v2/gender/${selectedValue}`)
    } else if ( selectedValue === 'female' ){
      setCurrent(`https://pokeapi.co/api/v2/gender/${selectedValue}`)
    } else if ( selectedValue === 'genderless' ) {
      setCurrent(`https://pokeapi.co/api/v2/gender/${selectedValue}`)
    } else if ( selectedValue === '' ){
      setCurrent(`https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`)
    } else {
      setCurrent(`https://pokeapi.co/api/v2/pokemon-color/${selectedValue}`)
    }

  }, [ selectedValue ])
  

  return (
    <Box className={styles.container} >
      <MainLayout title={'PokeAuto'} pageDescription={'Front End Developer Skill Tests'} 
      imageFullUrl={'https://res.cloudinary.com/dnxxkvpiz/image/upload/v1667940010/ochoagram/James-pokemon-guys-17827969-1280-720-4124311520_dca9t3.jpg'}> 
       
        <NavBar selectedValue={ selectedValue } setSelectedValue={ setSelectedValue } />
        <MainCard pokemons={pokemons} pokemonsApi={pokemonsApi} selectedValue={selectedValue}  />
        
      </MainLayout>
    </Box>
  )
}


