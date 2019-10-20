import axios, { AxiosResponse } from 'axios';
import { PokemonInterface } from '../models';

/**
 * Calls to the PokeAPI
 *
 * @class PokeService
 */
export class PokeService {

    /**
     * Accepts an array of names and return Promisified axios response objects
     * of the pokemon endpoint
     *
     * @param {string[]} names
     * @returns {Promise<AxiosResponse<PokemonInterface>[]>}
     * @memberof PokeService
     */
    public static getPokemonsByName(names: string[]): Promise<AxiosResponse<PokemonInterface>[]> {
        const promiseArray = names.map(name => this.getPokemonByName(name));
        return axios.all(promiseArray);
    }

    /**
     * Returns a Promisified axios response object of the pokemon endpoint
     *
     * @param {string} name
     * @returns {Promise<AxiosResponse<PokemonInterface>>}
     * @memberof PokeService
     */
    public static getPokemonByName(name: string): Promise<AxiosResponse<PokemonInterface>> {
        return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    }
}
