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


export default function Home() {

  const [pokemonsApi, setPokemonsApi ] = useState<IPokemonClean[]>( [] );
  const [pokemons, setPokemons ] = useState<IPokemonClean[]>( [] );
  const [active, setActive ] = useState( 0 );

  const [colorId, setColorId ] = useState( 1 );
  const [pokemonsByColor, setPokemonsByColor ] = useState<IPokemonColor[]>( [] );
  const [currentColor, setCurrentColor ] = useState(`https://pokeapi.co/api/v2/pokemon-color`);

  const [pokemonsByGenderDos, setPokemonsByGenderDos ] = useState<IPokemonColor[]>( [] );
  const [pokemonsByGender, setPokemonsByGender ] = useState<IPokemonColor[]>( [] );
  const [currentGender, setCurrentGender ] = useState('https://pokeapi.co/api/v2/gender');

  const [back, setBack ] = useState<RequestInfo | URL>( '' );
  const [next, setNext ] = useState<RequestInfo | URL>( '' );

  const [current, setCurrent ] = useState<RequestInfo | URL>('https://pokeapi.co/api/v2/pokemon?limit=5&offset=0');
  const [genders, setGenders ] = useState('https://pokeapi.co/api/v2/gender/');

  const [ open, setOpen] = useState(false)
  const [ valueColor, setValuecolor ] = useState('')

  const [allPokes, setAllPokes ] = useState<RequestInfo | URL >('https://pokeapi.co/api/v2/pokemon?limit=500&offset=0')
  const [pokemonscol, setPokemonscol ] = useState<IPokemonFiltered[] | void[]>( [] );
  const [newArrayPokes, setNewArrayPokes ] = useState<IPokemonFiltered[] | void[]>( [] );

  const [gender, setGender] = useState<string>(() => '2');



  
  const getAllPokemons = async () => {
    try {
      let url = allPokes
      const response = await fetch( url );
      const data = await response.json();
      
      return data;
      
    } catch(err) {
  
    }
  }

  const getAllPokemonsData = async (url: RequestInfo | URL) => {
    try {
      const response = await fetch(url).then();
      const data = await response.json();
      return data 
    } catch( error ){

    }
  }

  const fetchAllPokemons= async () => {
    try {
      const data = await getAllPokemons();

      const promises = data.results.map(async (pokemon: { url: any; }) => {
        return await getAllPokemonsData( pokemon.url )
      })

      const results = await Promise.all(promises)
      setPokemonscol( results );

    } catch( error ) {}
  }

  //// Fetch Old //////////////////////

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

      setNext( data.next );
      setBack( data.previous );

      setPokemonsApi( data.count )

      const promises = data.results.map(async (pokemon: { url: any; }) => {
        return await getPokemonsData( pokemon.url)
      })

      const results = await Promise.all(promises)
      localStorage.setItem( 'pokelist', JSON.stringify( results ) );

    } catch( error ) {}
  }

  const reedLocalStorage = () => {
    
    if( localStorage.getItem("pokelist") ){

      let resultlist = JSON.parse( localStorage.getItem('pokelist') as string )
    
      setPokemons(resultlist)
    }
     else {
      console.log('No hay lista de pokemons')
    }
  }

  ////////////////////
  ///By Gender  ///

    const getPokemonsByGender = async () => {
      try {
        let url = currentGender
        const response = await fetch(url);
        const data = await response.json();
        
        return data;
        
      } catch(err) {
    
      }
    }
  
    const getPokemonsDataByGender = async (url: RequestInfo | URL) => {
      try {
        const response = await fetch( url );
        const data = await response.json();
        
        return data;
       
      } catch( error ){}
    }
  
    const fetchPokemonsByGender = async () => {
      try {
        const data = await getPokemonsByGender();
  
        const promises = data.results.map( async (gender: { url: any; }) => {
          return await getPokemonsDataByGender( gender.url )
        })
  
        const results = await Promise.all(promises)
  
        setPokemonsByGender(results)
  
        
      } catch( error ) {}
    }

    ///////////////////// GENDER /////////////////////

    const pokesGenderSpecies = async (): Promise<void> => {
      setPokemonsByGenderDos([]);
      const response = await fetch(`${currentGender}/${gender}/`);
      const data = await response.json();
     
      setPokemonsByGender.pokemon_species_details?.forEach((item: any) => {
        setPokemonsByGenderDos((prev) => [
          ...prev,
          {
            name: item?.pokemon_species?.name,
            url: item?.pokemon_species?.url,
          },
        ]);
      });
    };
  
    //////////////////// COLOR ///////////////////////

    const pokesColorSpecies = async (): Promise<void> => {
      setPokemonsByColor([]);
      const response = await fetch(`${currentColor}/${colorId}/`);
      const data = await response.json();
    
      setPokemonsByColor( data['pokemon_species'] )
     
      data['pokemon_species'].forEach((item: any) => {
        setPokemonsByColor((prev) => [
          ...prev,
          {
            name: item?.pokemon_species?.name,
            url: item?.pokemon_species?.url,
          },
        ]);
      });
    };

  ////////////////////////////////////////////////////////  

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

  const newPokes = () => {

    const newresults = pokemonscol.map( poke => poke.id || undefined )
    const names = pokemonscol.map( poke => poke.name )

    const color = pokemonsByColor.map( poke => poke[0] )
    
    const pokeGenders = pokemonsByGender.map( poke => poke.name )

    // const fem = pokemonscol.map( poke => 'female' )
    // const mal = pokemonscol.map( poke => 'male' )
    const less = pokeGenders.map( poke => 
                                          {
      if( gender === "3"){
        return 'Genderless'
      } else if( gender === "2") {
        return"Male"
      } else {
        return 'Female'
      }
    }
      )

    let pokemonsFilteredGenders = pokeGenders.map((name, index_value) => {
      return {
          name: name,
          gender: less[index_value],
      };
  });
////////////////////////////

  const colors = pokemonsByColor.map( poke => 
    {    
      switch (colorId) {
        case 1:
          return 'Black';
          break;
        case 2:
          return 'Blue'
          break;
        case 3:
          return 'Brown';
          break;
        case 4:
          return 'Gray'
          break;
        case 5:
          return 'Green';
          break;
        case 6:
          return 'Pink'
          break;
        case 7:
          return 'Purple';
          break;
        case 8:
          return 'Red'
          break;
        case 9:
          return 'White';
          break;
        case 10:
          return 'Yellow'
          break;
      
        default:
          break;
      }
      }
    )

  let pokemonsFilteredColor = pokemonsByColor.map((name, index_value) => {
    return {
        name: name.name,
        color: colors[index_value],
    };
    });

    console.log(pokemonsFilteredColor)
    
    let pokemonsFilteredGeneral = newresults.map((id, index_value) => {
        return {
            name: names[index_value],
            id: id,
            //color: color[index_value],
            //gender: less[index_value],
        };
    });

    setNewArrayPokes(pokemonsFilteredGeneral)

  };


  useEffect(() => {
    getPokemons()
    fetchPokemons()
    reedLocalStorage()

    pokesColorSpecies()

    newPokes()


  }, [ current ])

  useEffect(() => {
    
    //getPokemonsByColor()
    //fetchPokemonsByColor()

    getPokemonsByGender()
    fetchPokemonsByGender()

    // getAllPokemons()
    //fetchAllPokemons()

    // newPokes()

    pokesGenderSpecies()


    
  
  }, [  ])

  useEffect(() => {
    
    
  }, [ valueColor ])


  // const handleDelete = () => {
  //     console.info('You clicked the delete icon.');
  // };


    
  return (
    <div className={styles.container} >

    <MainLayout title={'PokeAuto'} pageDescription={'This is a Frontend test'}> 
      <>
      <nav style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end',
          alignItems:'end', position:'absolute', maxWidth:'1200px', width:'100%', padding:'1rem' }}>
            <Box display='flex' width='100%' justifyContent='space-between'>
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
                          <Box key={poke.id } className='animate__animated animate__pulse animate__delay-500s'  maxWidth='240px' width='100%' position="absolute" marginBottom="20rem" >
                                <CardMedia
                                    component="img"
                                    sx={{ width: "100%", filter: "drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.5))", objectFit:'fill' }}
                                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${poke.id}.png`}
                                    //image={ }
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

                                <Box display='flex' justifyContent='center' alignItems='center' width='100%' marginTop='6px'> 
                                <Typography variant='subtitle1'  textAlign='center'  marginRight={1}>ID:</Typography>
                                    <Typography variant='h6'  textAlign='center' fontWeight={800} marginRight={1}>{poke.id}</Typography>
                                    <Typography variant='subtitle2'  textAlign='center'  marginRight={1}>/</Typography>
                                    <Typography variant='subtitle2'  textAlign='center'>{ pokemonsApi as any }</Typography>
                                </Box>
                           
                          </Box>
                      </>
                        :
                        <div><span></span></div>
                    ))
                    }

                        <Box maxWidth='350px' width='100%' display='flex' alignItems='center' justifyContent='space-between' marginBottom='1rem' marginTop='1rem'>
                                {
                                pokemons.map((poke) =>(
                                        <CardMedia
                                        className='thumbs animate__animated animate__swing'
                                        onClick={() => mainPokemons( pokemons.indexOf(poke), `https://pokeapi.co/api/v2/type/${ poke.id }`  )}
                                        key={poke.name}
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


