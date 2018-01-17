const request = require('supertest');
const app = require('../../');
console.log('APPPPPPP', app);


const server = require('../../index.js');
const Player = require('../../models/players.js');
const { db, loadDb, resetDb } = require('../../../db');

const testPlayer1 = { username: 'Preda', avatarIndex: 0 };
const testPlayer2 = { username: 'Esteban', avatarIndex: 1 };
const testPlayer3 = { username: 'Neil', avatarIndex: 2 };
const testPlayer4 = { username: 'Mendoza', avatarIndex: 3 };
const testPlayer5 = { username: 'Tao', avatarIndex: 6 };

describe('Players endpoints', () => {
  beforeAll(() => {
    return loadDb(db)
    .then(() => Player.addPlayer(testPlayer1.username, testPlayer1.avatarIndex))
    .then(() => Player.addPlayer(testPlayer2.username, testPlayer2.avatarIndex))
    .then(() => Player.addPlayer(testPlayer3.username, testPlayer3.avatarIndex))
    // .then(() => Game.start(testPlayer1.username, testPlayer2.username))
    // .then(() => Game.start(testPlayer2.username, testPlayer3.username))
    // .then(() => Game.move(['X', 'O', null, null, 'X', null, 'O', null, 'X'], 1))
    // .then(() => Game.declarePlayerXWinner(1))
    // .then(() => Game.move(['O', 'X', null, null, 'O', null, 'X', null, 'O'], 2))
    // .then(() => Game.declarePlayerOWinner(2))
    .catch(err => { console.error(err) });
  });

  afterAll(() => resetDb());

  describe('GET /players', () => {
    it('should get all users', () => {
      return request(app)
      .get('/players')
      .then(res => {
        // console.log('res man', res.text);
        const resArray = JSON.parse(res.text);
        expect(res.statusCode).toEqual(200);
        expect(resArray).toHaveLength(3);
        expect(resArray[0].username).toEqual(testPlayer1.username);
        expect(Number(resArray[2].avatar)).toEqual(testPlayer3.avatarIndex);
      });
    });
  });

  describe('GET /players/:id', () => {
    it('should get a specific user', () => {
      return request(app)
      .get(`/players/${testPlayer2.username}`)
      .then(res => {
        // console.log('res man', res.text);
        const resObj = JSON.parse(res.text);
        expect(res.statusCode).toEqual(200);
        expect(resObj.username).toEqual(testPlayer2.username);
        expect(Number(resObj.avatar)).toEqual(testPlayer2.avatarIndex);
      });
    });
  });

  describe('POST /new', () => {
    it('should create a new player', () => {
      return request(app)
      .post('/players/new')
      .send(testPlayer4)
      .then(res => {
        // console.log('res man', res);
        const resObj = JSON.parse(res.text);
        expect(res.statusCode).toEqual(201);
        expect(resObj.username).toEqual(testPlayer4.username);
        expect(Number(resObj.avatar)).toEqual(testPlayer4.avatarIndex);
      })
    });

    it('should require a username', () => {
      return request(app)
      .post('/players/new')
      .send()
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.text).toEqual('A username is required to create a user.');
      });
    });

    it('should not allow a new player entry if username already exists', () => {
      return request(app)
      .post('/players/new')
      .send(testPlayer1)
      .then(res => {
        const resObj = JSON.parse(res.text);
        expect(res.statusCode).toEqual(405);
        expect(resObj.username).toEqual(testPlayer1.username);
      });
    });
  });
});