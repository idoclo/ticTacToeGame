'use strict';
const request = require('supertest');
const app = require('../../');
const Game = require('../../models/games.js');
const Player = require('../../models/players.js');
const { db, loadDb, resetDb } = require('../../../db');

const testPlayer1 = { username: 'Preda', avatarIndex: 0 };
const testPlayer2 = { username: 'Esteban', avatarIndex: 1 };
const testPlayer3 = { username: 'Neil', avatarIndex: 2 };
const testPlayer4 = { username: 'Mendoza', avatarIndex: 3 };
const testPlayer5 = { username: 'Tao', avatarIndex: 6 };

describe('/games endpoints', () => {
  beforeAll(() => {
    return loadDb(db)
    .then(() => Player.addPlayer(testPlayer1.username, testPlayer1.avatarIndex))
    .then(() => Player.addPlayer(testPlayer2.username, testPlayer2.avatarIndex))
    .then(() => Player.addPlayer(testPlayer3.username, testPlayer3.avatarIndex))
    .then(() => Game.start(testPlayer1.username, testPlayer2.username))
    .then(() => Game.start(testPlayer2.username, testPlayer3.username))
    .then(() => Game.move(['X', 'O', null, null, 'X', null, 'O', null, 'X'], 1))
    .then(() => Game.declarePlayerXWinner(1))
    .then(() => Game.move(['O', 'X', null, null, 'O', null, 'X', null, 'O'], 2))
    .then(() => Game.declarePlayerOWinner(2))
    .catch(err => { console.error(err) });
  });

  afterAll(() => resetDb());

  const match = {
    value: 'reset',
    playerX: 'Preda',
    playerO: 'Neil'
  };

  describe('POST /games/reset', () => {
    it('should start up a new game', () => {
      const newBoard = [null, null, null, null, null, null, null, null, null];
      return request(app)
      .post('/games/reset')
      .send(match)
      .then(res => {
        const resObj = JSON.parse(res.text);
        expect(res.statusCode).toEqual(201);
        expect(resObj.board).toEqual(newBoard);
        expect(resObj.game_id).toEqual(3);
      });
    });
  });

  describe('POST /games/move', () => {
    // New game already started by above test
    it('should update board with new move', () => {
      const move1 = {
        squares: [null, null, null, null, 'X', null, null, null, null],
        gameId: 3,
        activePlayer: 'playerX'
      };
      return request(app)
      .post('/games/move')
      .send(move1)
      .then(res => {
        const resText = JSON.parse(res.text);
        expect(res.statusCode).toEqual(200);
        expect(resText).toEqual('continue');
      });
    });

    it('should update board with new winning move and declare winner', () => {
      const move2 = {
        squares: ['X', 'O', 'O', null, 'X', null, null, null, 'X'],
        gameId: 3,
        activePlayer: 'playerX'
      }
      const winningIndicies = [0, 4, 8];
      return request(app)
      .post('/games/move')
      .send(move2)
      .then(res => {
        const resArray = JSON.parse(res.text);
        expect(res.statusCode).toEqual(200);
        expect(resArray).toEqual(winningIndicies);
      });
    });

    it('should update board with final draw move and declare draw', () => {
      const move3 = {
        squares: ['O', 'X', 'X', 'X', 'X', 'O', 'O', 'O', 'X'],
        gameId: 4,
        activePlayer: 'playerX'
      };
      return request(app)
      .post('/games/reset')
      .send(match)
      .then(response => {
        return request(app)
        .post('/games/move')
        .send(move3)
        .then(res => {
          const resText = JSON.parse(res.text);
          expect(res.statusCode).toEqual(200);
          expect(resText).toEqual('draw');
        });
      });
    });
  });
});