import { useEffect, useState } from 'react';

import { Autocomplete, TextField, Typography, Box, Grid, Chip, Avatar, CardMedia, Button, IconButton, Zoom } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { MainLayout } from '../components/Layouts'

import styles from '../styles/Home.module.css'
import 'animate.css';
import React from 'react';


export interface PokemonListResponse {
  name: string;
  results:   IPokemonClean[];
}

export interface IPokemonClean {
  name: string;
  id:   number;
  type: string;
  img?:  string;
  img2?:  string;
  img3?:  string;
  sprites?: any;
  count?: number;
  color: IPokemonColor
}

export interface IPokemonColor {
  pokemon_species: IPokemonClean;
  id:   number;
  name: string;
}



export default function Home() {

  const [pokemonsApi, setPokemonsApi ] = useState<IPokemonClean[]>( [] );
  const [pokemons, setPokemons ] = useState<IPokemonClean[]>( [] );

  const [pokemonsByColor, setPokemonsByColor ] = useState<IPokemonColor[]>( [] );
  const [currentColor, setCurrentColor ] = useState('https://pokeapi.co/api/v2/pokemon-color/');

  const [back, setBack ] = useState<string | null>( null );
  const [next, setNext ] = useState<string | null>( null );

  
  const [current, setCurrent ] = useState<RequestInfo | URL>('https://pokeapi.co/api/v2/pokemon?limit=5&offset=0');
  const [genders, setGenders ] = useState('https://pokeapi.co/api/v2/gender/');

  const [active, setActive ] = useState( 0 );



  
  const getPokemons = async () => {
    try {
      let url = current
      const response = await fetch( url );
      const data = await response.json();
      
      return data;
      
    } catch(err) {
  
    }
    }

  const getPokemonsData = async (url) => {
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

      setNext( data.next );
      setBack( data.previous );

      setPokemonsApi( data.count )

      const promises = data.results.map(async (pokemon: { url: any; }) => {
        return await getPokemonsData( pokemon.url)
      })

      const results = await Promise.all(promises)

      setPokemons(results)
      
    } catch( error ) {}
  }

  ///By COLOR  ///

  const getPokemonsByColor = async () => {
    try {
      let url = currentColor
      const response = await fetch(url);
      const data = await response.json();
      
      return data;
      
    } catch(err) {
  
    }
    }

  const getPokemonsDataByColor = async (url) => {
    try {
      const response = await fetch( url );
      const data = await response.json();
      
      return data;
     
    } catch( error ){}
  }

  const fetchPokemonsByColor= async () => {
    try {
      const data = await getPokemonsByColor();

      const promises = data.results.map( async (color: { url: any; }) => {
        return await getPokemonsDataByColor( color.url )
      })

      const results = await Promise.all(promises)
    
      setPokemonsByColor(results)
      
    } catch( error ) {}
  }


  ////////////////////

  const mainPokemons = ( id: React.SetStateAction<number>, type: string ) => {
    setActive( id )
  }
  
  const nextPage = () => {
    next !== null && setCurrent( next )
     setActive(0)
  }

  const backPage = () => {
    next !== null && setCurrent( back )
    
  }

  useEffect(() => {
    getPokemons()
    fetchPokemons()
    console.log( pokemonsByColor )
  }, [ current ])

  useEffect(() => {
    getPokemonsByColor()
    fetchPokemonsByColor()
  }, [  ])


  
  


  const handleDelete = () => {
      console.info('You clicked the delete icon.');
  };

    
  return (
    <div className={styles.container} >

    <MainLayout title={'PokeAuto'} pageDescription={'This is a Frontend test'}> 
      <>
      <nav style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end',
          alignItems:'end', position:'absolute', maxWidth:'1200px', width:'100%', padding:'1rem' }}>
            <Box display='flex' width='100%' justifyContent='space-between'>
                <img src="../pokeapi_256.png" width="126px" height='51'/>
                <Button sx={{ width:"106px" }} size="large" variant="outlined" startIcon={<TuneIcon />}>
                Filters
                </Button>
            </Box>

            <Box display='flex' flexDirection='column' width='fit-content' justifyContent='flex-end' zIndex="tooltip">
              <Chip label="Deletable" onDelete={handleDelete} sx={{ marginBottom:'6px'}} />
              <Chip label="Deletable" onDelete={handleDelete} sx={{ marginBottom:'6px'}}/>
            </Box>
      </nav>

      <Grid container>
        <Grid item xs={ 12 } >
          <Box  flexDirection='column' display='flex' alignItems='center' justifyContent='center' m={2}>
            {/* <MainCard pokemons={pokemons} back={back} next={next} current={current} /> */}
            
            <Box className='black' style={{ minHeight:"400px", margin: "15rem 0 0 0 ", top: "50%",left: "50%", borderRadius:'50px', maxWidth:'500px', width:'100%',
                    display:'flex', justifyContent:'flex-end', alignItems:' center', flexDirection:'column',
                    boxShadow: '0px 60px 71px -40px rgba(0, 0, 0, 0.4)', padding:'1rem' }}>

                  <>
                    { pokemons.map((poke) => (
                      pokemons.indexOf(poke) === active ? 
                      <>
                          <Box key={ poke.id } className='animate__animated animate__pulse animate__delay-500s'  maxWidth='240px' width='100%' position="absolute" marginBottom="20rem" >
                                <CardMedia
                                    component="img"
                                    sx={{ width: "100%", filter: "drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.5))", objectFit:'fill' }}
                                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${poke.id}.png`}
                                    //image={ active.img2 }
                                    //image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9061.png"
                                    alt={poke.name}
                                />
                          </Box>
                            
                          <Box width='100%' className='animate__animated animate__pulse animate__delay-500s' marginTop='0rem' sx={{ marginBottom:{xs:'12px', sm:"12px", md:'12px'} }} >
                      
                                <Typography variant='h2' component='h1' textAlign='center' sx={{ textTransform:'capitalize' }} >{poke.name}</Typography>
                                
                                <Box display='flex' alignItems='space-between' justifyContent='center'
                                    sx={{ flexDirection:{xs:'column', sm:"row", md:'row'} }}>

                                        <Box display='flex' justifyContent='center' width='100%' alignItems='center' 
                                        sx={{ marginTop:{xs:'12px', sm:"12px", md:'6px'}  }}>
                                            <Typography variant='subtitle1' component='h3' textAlign='center' fontWeight={800} marginRight={1}>Color:</Typography>
                                            <Typography variant='subtitle1' component='h3' textAlign='center' marginRight={1}>Red</Typography>
                                            <Box sx={{ backgroundColor:'#E50020' }} width='20px' height='20px' borderRadius={10} border='1px solid #ffffff'></Box>
                                        </Box>

                                        <Box display='flex' justifyContent='center' width='100%' 
                                        sx={{  marginTop:{xs:'12px', sm:"12px", md:'12px'} }}>
                                            <Typography variant='subtitle1' component='h3' textAlign='center' fontWeight={800} marginRight={1}>Gender:</Typography>
                                            <Typography variant='subtitle1' component='h3' textAlign='center'>name</Typography>
                                        </Box>
                                </Box>

                                <Box display='flex' justifyContent='center' width='100%' marginTop='6px'> 
                                    <Typography variant='h6'  textAlign='center' fontWeight={800} marginRight={1}>{poke.id}</Typography>
                                    <Typography variant='h6'  textAlign='center' fontWeight={800} marginRight={1}>/</Typography>
                                    <Typography variant='h6'  textAlign='center'>{ pokemonsApi as any }</Typography>
                                </Box>
                           
                          </Box>
                      </>
                        :
                        <div><span key={ poke.id}></span></div>
                    ))
                    }

                        <Box maxWidth='350px' width='100%' display='flex' alignItems='center' justifyContent='space-between' marginBottom='1rem' marginTop='1rem'>
                                {
                                pokemons.map((poke) =>(
                                        <CardMedia
                                        className='animate__animated animate__swing'
                                        onClick={() => mainPokemons( pokemons.indexOf(poke), `https://pokeapi.co/api/v2/type/${ poke.id }`  )}
                                        key={poke.id}
                                        component="img"
                                        image={poke.sprites.other.home.front_default }
                                        sx={{ width: "50px", maxHeight:'50px',borderRadius:'100px',filter: "drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.5))", objectFit:'fill', cursor:'pointer'}}
                                        />
                                        ))
                                }
                        </Box>

                        <Box maxWidth={'450px'} width='100%' display='flex' alignItems='center' justifyContent='space-between' margin='0 auto'>
                          <IconButton onClick={()=> backPage() } aria-label="back" size="large" sx={{ backgroundColor: '#ffffff29' }}>
                          <ArrowBackIcon fontSize="inherit" />
                          </IconButton>

                          <IconButton onClick={()=> nextPage() } aria-label="next" size="large" sx={{ backgroundColor: '#ffffff29' }}>
                          <ArrowForwardIcon fontSize="inherit" />
                          </IconButton>
                        </Box>
                  </>
            </Box>

          </Box>
        </Grid>
      </Grid>
      </>

    </MainLayout>


    </div>
  )
}

