import request from 'supertest';
import app from '../server';

describe("Given a title, author, price, and category", () => {
    //Should save the title, author, price, and category to the database
    //Should respond with a JSON object containing the book id

    it("Should respond with a 200 status code", async () => {
        const response = await request(app).post('/api/books').send({
            title: 'title',
            author: 'author',
            price: 20,
            category: 'category',
            addedBy: '6223f1a312ddc996740dcf45'
        })
        expect(response.statusCode).toBe(200);
    })

    it('Should specify JSON in the content type header ', async () => {
        const response = await request(app).post('/api/books').send({
            title: 'title',
            author: 'author',
            price: 20,
            category: 'category',
            addedBy: '6223f1a312ddc996740dcf45'
        })
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    });

    it('Response has book ID ', async () => {
        const response = await request(app).post('/api/books').send({
            title: 'title',
            author: 'author',
            price: 20,
            category: 'category',
            addedBy: '6223f1a312ddc996740dcf45'
        })
        expect(response.body._id).toBeDefined()
    });

    it("Should respond with a 500 status code (not registered/authorised)", async () => {
        const response = await request(app).post('/api/books').send({
            title: 'title',
            author: 'author',
            price: 20,
            category: 'category',
        })
        expect(response.statusCode).toBe(500);
    })

})