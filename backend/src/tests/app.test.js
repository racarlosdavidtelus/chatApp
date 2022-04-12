const request = require('supertest');
const server = require('../../app');

describe(' test backend chatApp ',()=>{
    it('tests GET / endpoint', async() => {
        const response = await request(server).get("/");
        expect(response.statusCode).toBe(200);
    });

    it('tests GET /messages endpoint', async() => {
        const response = await request(server).get("/messages");
        expect(response.body).toEqual([]);
        expect(response.statusCode).toBe(200);
        expect(response.body).not.toBe({})
    });

    it('tests DELETE /messages endpoint', async() => {
        const response = await request(server).delete("/messages");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    });
})