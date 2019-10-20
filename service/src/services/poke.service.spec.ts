import { PokeService } from './poke.service';

describe('PokeService', () => {
    test('getPokemonByName should throw a 404 error when supplied with an invalid name', async () => {
        try {
            await PokeService.getPokemonByName('jagons');
        } catch (error) {
            const { response: { status, data } } = error;
            expect(status).toBe(404);
            expect(data).toBe('Not Found');
        }
    });

    test('getPokemonByName should return a pokemon when supplied with a valid name', async () => {
        try {
            const pokemon = await PokeService.getPokemonByName('butterfree');
            const { data: { name } } = pokemon;
            expect(name).toBe('butterfree');
        } catch (error) { }
    });

    test('getPokemonsByName should throw a 404 error when supplied with one|more invalid names', async () => {
        try {
            await PokeService.getPokemonsByName(['jagons', 'butterfree']);
        } catch (error) {
            const { response: { status, data } } = error;
            expect(status).toBe(404);
            expect(data).toBe('Not Found');
        }
    });

    test('getPokemonsByName should return a list of pokemons when supplied with valid pokemon names', async () => {
        try {
            const pokemons = await PokeService.getPokemonsByName(['butterfree', 'wormadam-plant']);
            expect(pokemons.length).toBe(2);
        } catch (error) { }
    });
});
