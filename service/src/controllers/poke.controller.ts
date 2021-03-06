import { Application, Request, Response } from 'express';
import { PokeService } from '../services';
import { logger } from '../utils';

export default class PokeController {

    constructor(private app: Application) { }

    /**
     * Sets PokeApi specific routes
     * 
     * @memberof PokeController
     */
    public setRoutes() {
        /** Get most powerful pokemon from supplied names */
        this.app.route('/strongest').get(async (req: Request, res: Response) => {
            try {
                const { query: { names } } = req;

                if (!names) throw new Error('Missing one or more names of pokemon to compare');

                const requests = await PokeService.getPokemonsByName(names.split(','));

                let highestMoves = 0; // holds current highest move count
                let pokemon = null; // holds the current pokemon with the highest moves

                requests.map(({ data }) => {
                    const { moves } = data;
                    const movesCount = moves.length;

                    if (movesCount > highestMoves) {
                        highestMoves = movesCount;
                        pokemon = data;
                    }
                });

                return res.status(200).json({ code: 'OK', data: pokemon });
            } catch (error) {
                logger.error(`Error getting most powerful pokemon ==> ${JSON.stringify(error)}`);
                return res.status(500).json({
                    code: 'E_INTERNAL_SERVER_ERROR',
                    message: 'Internal Server Error'
                });
            }
        });
    }
}
