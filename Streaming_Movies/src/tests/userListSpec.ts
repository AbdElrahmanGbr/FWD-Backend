import request from 'supertest';
import express, { Application } from 'express';
import userListRoutes from '../handlers/userListRoutes';

const app: Application = express();
app.use(express.json());
userListRoutes(app);

describe('User List API', () => {
    let userlistId: number;

    it('should create a new user list item', async () => {
        const res = await request(app)
            .post('/userlist')
            .send({
                userID: 1,
                movieID: 2,
            });

        expect(res.status).toEqual(200);
        expect(res.body.userID).toEqual(1);
        expect(res.body.movieID).toEqual(2);
        userlistId = res.body.id;
    });

    it('should return a list of user lists', async () => {
        const res = await request(app).get('/userlist');

        expect(res.status).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should return a single user list item', async () => {
        const res = await request(app).get(`/userlist/${userlistId}`);

        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(userlistId);
    });

    it('should update an existing user list item', async () => {
        const res = await request(app)
            .patch(`/userlist/${userlistId}`)
            .send({
                userID: 1,
                movieID: 3,
            });

        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(userlistId);
        expect(res.body.userID).toEqual(1);
        expect(res.body.movieID).toEqual(3);
    });

    it('should delete a user list item', async () => {
        const res = await request(app).delete(`/userlist/${userlistId}`);

        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(userlistId);

        const verify = await request(app).get(`/userlist/${userlistId}`);
        expect(verify.status).toEqual(404);
    });
});
