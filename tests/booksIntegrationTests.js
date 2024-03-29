require('should');

const request = require('supertest');

const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app = require('../app');

const Book = mongoose.model('Book');

// Agent running app
const agent = request.agent(app);

describe('Book Crud Test', () => {
  it('should allow a book to be posted and return read and _id', (done) => {

    const bookPost = { title: 'My book', autho: 'Vinay', genre: 'Fiction' };

    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        results.body.read.should.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });


  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done)=>{
    mongoose.connection.close();
    app.server.close(done());
  })

});