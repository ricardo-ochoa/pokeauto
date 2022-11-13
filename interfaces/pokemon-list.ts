
export interface PokemonListResponse {
    count:     number;
    next?:     string;
    previous?: string;
    results:   SmallPokemon[];
}

export interface SmallPokemon {
    name: string;
    url:  string;
    id:   number;
    img:  string;
}


  
  export interface IPokemonClean {
    name: string;
    id?:   number;
    img?:  string;
    img2?:  string;
    img3?:  string;
    sprites?: any;
    count?: number;
    color?: IPokemonColor
    url?: string;
  }
  
  export interface IPokemonColor {
    pokemon_species: IPokemonClean;
    id:   number;
    name: string;
    sprites?: any;
    
  }
  
  export interface IPokemonFiltered {
    pokemon_species: any;
    name: string;
    id:   number;
    img?:  string;
    color?: string;
    gender_rate?: number;
  }