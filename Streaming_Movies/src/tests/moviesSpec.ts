import {app} from '../server';
import request from 'supertest';

describe('Movie Routes', () => {
    it('should return a list of movies', async () => {
        const res = await request(app).get('/movies');
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should return a single movie', async () => {
        const res = await request(app).get('/movies/1');
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Example Movie');
    });

    it('should create a new movie', async () => {
        const res = await request(app)
            .post('/movies')
            .send({
                name: 'New Movie',
                releaseDate: '2022-01-01',
                rate: 8.5
            });
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('New Movie');
    });

    it('should update a movie', async () => {
        const res = await request(app)
            .patch('/movies/1')
            .send({
                name: 'Updated Movie',
                releaseDate: '2022-02-01',
                rate: 7.5
            });
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Updated Movie');
    });

    it('should delete a movie', async () => {
        const res = await request(app).delete('/movies/1');
        expect(res.status).toBe(200);
    });
});

describe('UserList Routes', () => {
    it('should return a list of userlists', async () => {
        const res = await request(app).get('/userlist');
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should return a single userlist', async () => {
        const res = await request(app).get('/userlist/1');
        expect(res.status).toBe(200);
        expect(res.body.userID).toBe(1);
    });

    it('should create a new userlist', async () => {
        const res = await request(app)
            .post('/userlist')
            .send({
                userID: 1,
                movieID: 1
            });
        expect(res.status).toBe(200);
        expect(res.body.userID).toBe(1);
    });

    it('should update a userlist', async () => {
        const res = await request(app)
            .patch('/userlist/1')
            .send({
                userID: 2,
                movieID: 1
            });
        expect(res.status).toBe(200);
        expect(res.body.userID).toBe(2);
    });

    it('should delete a userlist', async () => {
        const res = await request(app).delete('/userlist/1');
        expect(res.status).toBe(200);
    });
});
