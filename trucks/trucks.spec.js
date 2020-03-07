const request = require('supertest');
const db = require('../database/dbConfig.js');
const server = require('../api/server.js');
const jwt = require('jsonwebtoken');

describe('server.js', () => {
    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
})

describe('GET /', () => {
    it('should retrieve a list of trucks', async () => {
        let res = await request(server)
            .get('/api/trucks')
            .set('Accept', 'application/json')
        expect(res.status).toBe(200);
    })
})

describe('POST /add', () => {
    it('it should return 201 when attempting to add a truck', async () => {
        let token = await Operator();
        let res = await AddTruck(token);
        expect(res.status).toBe(201);
    }) 
});

beforeEach(async () => {
    await db('users').truncate();
    await db('foodtrucks').truncate();
})

const Customer = async () => {
    await Register("Customer");
    let token = await Login();
    return token;
}

const Operator = async () => {
    await Register("Operator");
    let token = await Login();
    return token;
}

const Register = async (role) => {
    await request(server)
        .post('/api/auth/register')
        .send({username: "cquinntest", password: "password", role: role})
        .set('Accept', 'application/json')
}

const Login = async () => {
    let token;
    await request(server)
        .post('/api/auth/login')
        .send({username: "cquinntest", password: "password"})
        .set('Accept', 'application/json')
        .then(response => {
            token = response.body.token;
        })
    return token;
}

const AddTruck = async (token) => {
    let res = await request(server)
        .post('/api/trucks/add')
        .send({
            truckName: "Test Truck Name",
            location: "Test Location",
            foodType: "Test Food Type",
            owner: token.username
        })
        .set('Accept', 'application/json')
        .set('authorization', token);
    return res;
}