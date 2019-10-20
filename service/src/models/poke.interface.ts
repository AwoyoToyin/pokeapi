interface Move {
    move: {
        name: string;
        url: string;
    };
}

export interface PokemonInterface {
    name?: string;
    moves: Move[];
}
