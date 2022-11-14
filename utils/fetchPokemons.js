import { pokeApi } from '../ApiAxios';
//import { PokemonListResponse, SmallPokemon } from '../interfaces';

export const fetchPokemons = async (current, setPokemons, setPokemonsApi, setNext, setBack, selectedValue ) => { 

    const { data } = await pokeApi.get(current);
    console.log(data)

    const getPokemonsData = async (url) => {
      const { data } = await pokeApi.get(url);
      
      const poke = {name: data.name, id: data.id, img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${ data.id }.png` }
      return poke
    }

    if (selectedValue === "") {

      const promises = data.results.map( (poke, i) => ({
      ...poke,
      id: i + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${ i + 1 }.png`,
      }))

      const results = await Promise.all(promises)
      setPokemons( results )
      setPokemonsApi( results.length )

    } else if ( selectedValue === "female") {


      const promises = data.pokemon_species_details.map(async (pokemon) => {
        return await getPokemonsData( pokemon.pokemon_species.url)
      })

      const results = await Promise.all(promises)
      setPokemons( results )
      setPokemonsApi( results.length )

    } else if ( selectedValue === 'genderless') {
  
        const promises = data.pokemon_species_details.map(async (pokemon) => {
          return await getPokemonsData( pokemon.pokemon_species.url)
        })
  
        const results = await Promise.all(promises)
        setPokemons( results )
        setPokemonsApi( results.length )

  
    } else if ( selectedValue === 'male') {

      const fetchPromises = data.pokemon_species_details.map(async (pokemon) => {

        return await getPokemonsData( pokemon.pokemon_species.url)
      })
  
        const results = await Promise.all(fetchPromises)
        setPokemons( results )
        setPokemonsApi( results.length )

  
    } else {


        const promises = data.pokemon_species.map(async (pokemon) => {
          return await getPokemonsData( pokemon.url)
        })
  
        const results = await Promise.all(promises)
        setPokemons( results )
        setPokemonsApi( results.length )

    }

      setNext( 5 )
      setBack( 0 )
}