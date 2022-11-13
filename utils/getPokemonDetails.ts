import { pokeApi } from '../ApiAxios';
import { IPokemonFiltered } from '../interfaces';


export const getPokemonInfo = async( current: string, setNext, setBack, setPokemons, setPokemonsApi  ) => {
  
    const getPokemons = async () => {
        try {
            let url = current
            const { data } = await pokeApi.get<IPokemonFiltered>( url );
    
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
    
        } catch( error ) {}
    }

    return fetchPokemons

}