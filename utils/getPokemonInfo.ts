import { pokeApi } from '../ApiAxios';
import { IPokemonFiltered } from '../interfaces';


export const getPokemonInfo = async( nameOrId: number ) => {
  
    try {

        const { data } = await pokeApi.get<IPokemonFiltered>(`/pokemon-species/${ nameOrId }`);

        return {
            id: data.id,
            name: data.name,
            color: data.color["name"],
            gender: data.gender_rate
        }
        
    } catch (error) {
        return null;
    }



}