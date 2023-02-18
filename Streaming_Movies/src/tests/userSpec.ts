import request from 'supertest';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import userRoutes from '../handlers/userRoutes';
import { User } from '../models/userModel';

const app: Application = express();
const PORT = 3001;

app.use(bodyParser.json());
userRoutes(app);

beforeAll(() => {
    app.listen(PORT);
});

describe('Test user routes', () => {
    let testUser: User;

    it('should create a new user', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                firstName: 'Abdo',
                lastName: 'Gbr',
                email: 'abdogbr@example.com',
                password: 'password',
            });

        expect(response.status).toBe(200);
        testUser = response.body;
    });

    it('should return a list of users', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should return the newly created user', async () => {
        const response = await request(app).get(`/users/${testUser.id}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(testUser.id);
        expect(response.body.firstName).toBe(testUser.firstName);
        expect(response.body.lastName).toBe(testUser.lastName);
        expect(response.body.email).toBe(testUser.email);
    });

    it('should update the newly created user', async () => {
        const response = await request(app)
            .patch(`/users/${testUser.id}`)
            .send({
                firstName: 'Abdu',
                lastName: 'Gabr',
                email: 'newemail@example.com',
                password: 'newpassword',
            });

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(testUser.id);
        expect(response.body.firstName).toBe('John');
        expect(response.body.lastName).toBe('Doe');
        expect(response.body.email).toBe('newemail@example.com');
    });

    it('should delete the newly created user', async () => {
        const response = await request(app).delete(`/users/${testUser.id}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(testUser.id);
    });
});

afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});
