import React, { useEffect, useState } from 'react';

import { Autocomplete, TextField, Typography, Box, Grid, Chip, Avatar, CardMedia, Button, IconButton, Zoom } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Filter } from '../components/ui';

import { MainLayout } from '../components/Layouts'

import styles from '../styles/Home.module.css'
import 'animate.css';
import { IPokemonClean, IPokemonColor, IPokemonFiltered } from '../interfaces/pokemon-list';
import { ConstructionOutlined } from '@mui/icons-material';
import { useLocalStorage } from '../hooks/useLocalStorage';


export default function Home() {

  const [pokemonsApi, setPokemonsApi ] = useState<IPokemonClean[]>( [] );
  const [pokemons, setPokemons ] = useState<IPokemonClean[]>( [] );
  const [active, setActive ] = useState( 0 );

  const [ open, setOpen] = useState(false)
  const [ valueColor, setValuecolor ] = useState('')

  const [back, setBack ] = useState<RequestInfo | URL>( '' );
  const [next, setNext ] = useState<RequestInfo | URL>( '' );
  const [current, setCurrent ] = useState<RequestInfo | URL>('https://pokeapi.co/api/v2/pokemon?limit=5&offset=0');


  const [colorId, setColorId ] = useState( 1 );
  const [pokemonsByColor, setPokemonsByColor ] = useState<IPokemonColor[]>( [] );
  const [currentColor, setCurrentColor ] = useState(`https://pokeapi.co/api/v2/pokemon-color`);

  const [pokemonsByGenderDos, setPokemonsByGenderDos ] = useState<IPokemonColor[]>( [] );
  const [pokemonsByGender, setPokemonsByGender ] = useState<IPokemonColor[]>( [] );
  const [currentGender, setCurrentGender ] = useState('https://pokeapi.co/api/v2/gender');



  const [genders, setGenders ] = useState('https://pokeapi.co/api/v2/gender/');


  const [allPokes, setAllPokes ] = useState<RequestInfo | URL >('https://pokeapi.co/api/v2/pokemon?limit=500&offset=0')
  const [pokemonscol, setPokemonscol ] = useState<IPokemonFiltered[] | void[]>( [] );
  // -> 
  const [newArrayPokes, setNewArrayPokes ] = useState<IPokemonFiltered[] | void[]>( [] );

  const [pokes, setPokes ] = useState<IPokemonFiltered[] | void[]>( [] );

  const [gender, setGender] = useState<string>(() => '2');

  // const [pokeMains, setPokeMains] = useLocalStorage('pokelist', '') 

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

  const reedLocalStorage = () => {
    
    if( localStorage.getItem("pokelist") ){
      let pokelist = JSON.parse( localStorage.getItem('pokelist') as string )
      setPokemons(pokelist)
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
     
      setPokemons( results )


    } catch( error ) {}
  }


  useEffect(() => {
    fetchPokemons()
    localStorage.setItem( 'pokelist', JSON.stringify( pokemons ) );

  }, [ current ])

  useEffect(() => {

    

  }, [  ])

  // const handleDelete = () => {
  //     console.info('You clicked the delete icon.');
  // };

  return (
    <div className={styles.container} >

    <MainLayout title={'PokeAuto'} pageDescription={'This is a Frontend test'}> 
      <>
      <nav style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end',
          alignItems:'end', position:'absolute', maxWidth:'1200px', width:'100%', padding:'1rem' }}>
            <Box zIndex="tooltip"  display='flex' width='100%' justifyContent='space-between'>
                <img src="../pokeapi_256.png" width="126px" height='51'/>
                <Button onClick={() => setOpen( true ) } sx={{ width:"106px" }} size="large" variant="outlined" startIcon={<TuneIcon />}>
                Filters
                </Button>


                <Filter open={open} selectedValue={ valueColor } onClose={function (value: string): void {
                  setOpen( false ); setValuecolor( value ); 
                } } />

            </Box>

            <Box display='flex' flexDirection='column' width='fit-content' justifyContent='flex-end' zIndex="tooltip">
              {/* <Chip label="Deletable" onDelete={handleDelete} sx={{ marginBottom:'6px'}} />
              <Chip label="Deletable" onDelete={handleDelete} sx={{ marginBottom:'6px'}}/> */}
            </Box>
      </nav>



      <Grid container className='animate__animated animate__zoomInDown animate-duration_2s animate__delay-2s'>
        <Grid item xs={ 12 } >
        <>
      { 
        pokemons.map((poke) => (
          pokemons.indexOf(poke) === active ? 
        <>
          <Box  flexDirection='column' display='flex' alignItems='center' justifyContent='center' m={2}>
            {/* <MainCard pokemons={pokemons} back={back} next={next} current={current} /> */}
            
            <Box className='black' style={{ minHeight:"400px", margin: "15rem 0 0 0 ", top: "50%",left: "50%", borderRadius:'50px', maxWidth:'500px', width:'100%',
                    display:'flex', justifyContent:'flex-end', alignItems:' center', flexDirection:'column',
                    boxShadow: '0px 60px 71px -40px rgba(0, 0, 0, 0.4)', padding:'1rem' }}>


                          <Box key={poke.id } className=' mainpokemons'  maxWidth='240px' width='100%' position="absolute" marginBottom="16rem" >
                                <CardMedia
                                    component="img"
                                    sx={{ width: "100%", filter: "drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.5))", objectFit:'fill' }}
                                    image={ `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${ poke.id }.png` }
                                    //image={ }
                                    //image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9061.png"
                                    alt={poke.name}
                                />
                          </Box>
                            
                          <Box width='100%'  marginTop='0rem' sx={{ marginBottom:{xs:'12px', sm:"12px", md:'12px'} }} >
                      
                                <Typography className='animate__animated animate__pulse animate__delay-500s' variant='h2' component='h1' textAlign='center' sx={{ textTransform:'capitalize' }} >{poke.name}</Typography>
                                
                                <Box display='flex' alignItems='space-between' justifyContent='center'
                                    sx={{ flexDirection:{xs:'column', sm:"row", md:'row'} }}>

                                        {/* <Box display='flex' justifyContent='center' width='100%' alignItems='center' 
                                        sx={{ marginTop:{xs:'12px', sm:"12px", md:'6px'}  }}>
                                            <Typography variant='subtitle1' component='h3' textAlign='center' fontWeight={800} marginRight={1}>Color:</Typography>
                                            <Typography variant='subtitle1' component='h3' textAlign='center' marginRight={1}>Red</Typography>
                                            <Box sx={{ backgroundColor:'#E50020' }} width='20px' height='20px' borderRadius={10} border='1px solid #ffffff'></Box>
                                        </Box> */}

                                        {/* <Box display='flex' justifyContent='center' width='100%' 
                                        sx={{  marginTop:{xs:'12px', sm:"12px", md:'12px'} }}>
                                            <Typography variant='subtitle1' component='h3' textAlign='center' fontWeight={800} marginRight={1}>Gender:</Typography>
                                            <Typography variant='subtitle1' component='h3' textAlign='center'>name</Typography>
                                        </Box> */}
                                </Box>

                                <Box display='flex' justifyContent='center' alignItems='center' width='100%' marginTop='6px'> 
                                <Typography variant='subtitle1'  textAlign='center'  marginRight={1}>ID:</Typography>
                                    <Typography variant='h6'  textAlign='center' fontWeight={800} marginRight={1}>{poke.id}</Typography>
                                    <Typography variant='subtitle2'  textAlign='center'  marginRight={1}>/</Typography>
                                    <Typography variant='subtitle2'  textAlign='center'>{ pokemonsApi as any }</Typography>
                                </Box>
                           
                          </Box>

                        <Box maxWidth='350px' width='100%' display='flex' alignItems='center' justifyContent='space-between' marginBottom='1rem' marginTop='1rem'>
                                {
                                pokemons.map((poke) =>(
                                        <CardMedia
                                        
                                        className='thumbs animate__animated animate__swing'
                                        onClick={() => mainPokemons( pokemons.indexOf(poke), `https://pokeapi.co/api/v2/type/${ poke.id }`  )}
                                        key={poke.name}
                                        component="img"
                                        image={poke.sprites.other.home.front_default }
                                        sx={{width: "50px", maxHeight:'50px',borderRadius:'100px',filter: pokemons.indexOf(poke) === active ? "drop-shadow(0px 10px 10px rgba(50, 70, 0, 1))": 'none', objectFit:'fill', cursor:'pointer'}}
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

      
      </>
    </MainLayout>


    </div>
  )
}


