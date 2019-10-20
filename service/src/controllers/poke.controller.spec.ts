import request from 'supertest';
import App from '../app';

describe('PokeController', () => {
    let app: App;

    beforeAll(async () => {
        app = await new App().start(); // start the application
    });

    afterAll(async () => {
        app.close(); // close the application
    });

    test('Should return a 500 Internal Server Error when called without supplying one|more names', async () => {
        try {
            const response = await request(app.getApp()).get('/api/v1/strongest');
            expect(response.status).toEqual(500);
            expect(response.body).toHaveProperty('message');
        } catch (error) { }
    });

    test('Should return the most powerful pokemon from supplied pokemon names', async () => {
        try {
            const response = await request(app.getApp()).get('/api/v1/strongest?names=butterfree,wormadam-plant');
            expect(response.status).toEqual(200);
            expect(response.body).toHaveProperty('code');
        } catch (error) { }
    });
});
