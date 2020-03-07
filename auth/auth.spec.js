const request = require('supertest');
const db = require('../database/dbConfig.js');
const server = require('../api/server.js');

describe('server.js', () => {
    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
})

describe('POST /register', () => {
    it('should register the user', async () => {
        let res = await request(server)
            .post('/api/auth/register')
            .send({username: "chris_test", password: "password", role: "Operator"})
            .set('Accept', 'application/json');
        expect(res.status).toBe(201);
    })

    it('should return 500 if username is missing', async () => {
        let res = await request(server)
            .post('/api/auth/register')
            .send({username: "", password: "password"})
            .set('Accept', 'application/json');
        expect(res.status).toBe(500);
    })

    it('should return 400 if password is missing', async () => {
        let res = await request(server)
            .post('/api/auth/register')
            .send({username: "chris_test"})
            .set('Accept', 'application/json');
        expect(res.status).toBe(400);
    })
})

describe('POST /login', () => {
    it('should log the user in', async () => {
        let res = await request(server)
            .post('/api/auth/login')
            .send({username: "cquinntest", password: "password"})
            .set('Accept', 'application/json')
        expect(res.status).toBe(200);
    })

    it('should return status 401 if password is missing or incorrect', async () => {
        let res = await request(server)
            .post('/api/auth/login')
            .send({username: "cquinntest", password: ""})
            .set('Accept', 'application/json')
        expect(res.status).toBe(401);
    })

    it('should return 500 if the username is missing', async () => {
        let res = await request(server)
            .post('/api/auth/login')
            .send({username: "cquinntest"})
            .set('Accept', 'application/json')
        expect(res.status).toBe(500);
    })
})

beforeEach(async () => {
    await db('users').truncate();
    await request(server)
        .post('/api/auth/register')
        .send({username: "cquinntest", password: "password", role: "Operator"})
        .set('Accept', 'application/json');
})