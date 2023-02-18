import request from 'supertest';
import {app} from '../server';
import { MovieListModel, MovieList } from '../models/movieListModel';

const store = new MovieListModel();

describe('Movie List API', () => {
    let createdMovieList: MovieList;
    const movieList: MovieList = {
        id: 1,
        userListID: 1,
        movieID: 1,
        name: 'My Movie List'
    };

    describe('POST /movielist', () => {
        it('creates a new movie list', async () => {
            const response = await request(app)
                .post('/movielist')
                .send(movieList);
            createdMovieList = response.body[0];
            expect(response.status).toBe(200);
            expect(createdMovieList.userListID).toEqual(movieList.userListID);
            expect(createdMovieList.movieID).toEqual(movieList.movieID);
            expect(createdMovieList.name).toEqual(movieList.name);
        });
    });

    describe('GET /movielist/:id', () => {
        it('returns a movie list by id', async () => {
            const response = await request(app)
                .get(`/movielist/${createdMovieList.id}`);
            expect(response.status).toBe(200);
            expect(response.body[0].userListID).toEqual(createdMovieList.userListID);
            expect(response.body[0].movieID).toEqual(createdMovieList.movieID);
            expect(response.body[0].name).toEqual(createdMovieList.name);
        });
    });

    describe('GET /movielist', () => {
        it('returns a list of all movie lists', async () => {
            const response = await request(app)
                .get('/movielist');
            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThan(0);
        });
    });

    describe('PATCH /movielist/:id', () => {
        it('updates a movie list', async () => {
            const updatedMovieList: MovieList = {
                id: 1,
                userListID: 1,
                movieID: 2,
                name: 'My Updated Movie List'
            };
            const response = await request(app)
                .patch(`/movielist/${createdMovieList.id}`)
                .send(updatedMovieList);
            const updated = response.body[0];
            expect(response.status).toBe(200);
            expect(updated.userListID).toEqual(updatedMovieList.userListID);
            expect(updated.movieID).toEqual(updatedMovieList.movieID);
            expect(updated.name).toEqual(updatedMovieList.name);
        });
    });

    describe('DELETE /movielist/:id', () => {
        it('deletes a movie list', async () => {
            const response = await request(app)
                .delete(`/movielist/${createdMovieList.id}`);
            expect(response.status).toBe(200);
        });
    });
});
