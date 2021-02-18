const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');
const store = require('../playstore.js');


describe('playstore GET /app endpoint', () => {

  it('return all the apps', () => {
    return request(app)
      .get('/app') // invoke the endpoint // send the query string ?n=5
      .then(res => {
        expect(res.body).to.eql(store);
      });
  });

  
    it('invalid sort', () => {
    return request(app)
      .get('/app') // invoke the endpoint //assert that you get a 200  OK status
      .query({'sort':'name',})
      .expect(400, 'Can only sort by rating or app');
  });

  
  
  it('invalid sort valid genre', () => {
    return request(app)
      .get('/app') // invoke the endpoint //assert that you get a 200  OK status
      .query({'sort':'name',
    'genres':'Action'})
      .expect(400, 'Can only sort by rating or app');
  });


    
  it('invalid genre', () => {
    return request(app)
      .get('/app') // invoke the endpoint //assert that you get a 200  OK status
      .query({'genres':'notgenre',})
      .expect(400, 'can only filter by Action,Puzzle,Strategy,Casual,Arcade,or Card');
  });


      
  it('valid sort invalid genre', () => {
    return request(app)
      .get('/app') // invoke the endpoint //assert that you get a 200  OK status
      .query({'genres':'notgenre',
                'sort': 'app'})
      .expect(400, 'can only filter by Action,Puzzle,Strategy,Casual,Arcade,or Card');
  });

  it('Valid sort', () => {
    return request(app)
      .get('/app') // invoke the endpoint //assert that you get a 200  OK status
      .query({'sort':'app',})
      .then(res => {
        expect(res.body).to.be.an('array');
        let i = 0;
        let sorted = true;
        while(sorted && i < res.body.length - 1) {
          sorted = sorted && res.body[i].App < res.body[i + 1].App;
          i++;
        }
        expect(sorted).to.be.true;
      });
  });

  it('Valid sort', () => {
    return request(app)
      .get('/app') // invoke the endpoint //assert that you get a 200  OK status
      .query({'sort':'rating',})
      .then(res => {
        expect(res.body).to.be.an('array');
        let i = 0;
        let sorted = true;
        while(sorted && i+1 < res.body.length - 1) {
          sorted = sorted && res.body[i].Rating >= res.body[i + 1].Rating;
          i++;
        }
        expect(sorted).to.be.true;
      });
  });

  it('filter by genre', () => {
    return request(app)
      .get('/app') // invoke the endpoint //assert that you get a 200  OK status
      .query({'genres':'Action',})
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(6);
      });
  });
  
  it('sort by app name and filter by action ', () => {
    return request(app)
      .get('/app') // invoke the endpoint //assert that you get a 200  OK status
      .query({'genres':'Action',
            'sort':'app'})
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(6);
        let i = 0;
        let sorted = true;
        while(sorted && i < res.body.length - 1) {
          sorted = sorted && res.body[i].App < res.body[i + 1].App;
          i++;
        }
        expect(sorted).to.be.true;

      });
  });