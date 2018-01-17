const Player = require('../../models/players.js');
const Game = require('../../models/games.js');
const { db, loadDb, resetDb } = require('../../../db');

const testPlayer1 = { username: 'Preda', avatarIndex: 0 };
const testPlayer2 = { username: 'Esteban', avatarIndex: 1 };
const testPlayer3 = { username: 'Neil', avatarIndex: 2 };
const testPlayer4 = { username: 'Mandoza', avatarIndex: 3 };
let game1;
let game2;

describe('Players table', () => {
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

  it('should add a new player to the players table', () => {
    Player.addPlayer(testPlayer4.username, testPlayer4.avatarIndex)
    .then(player => {
      expect(player.username).toEqual('Mandoza');
    });
  });

  it('should return a player by username', () => {
    Player.getByUsername('Preda')
    .then(player => {
      expect(player.player_id).toEqual(1);
    });
  });

  it('should return all players', () => {
    Player.getAll()
    .then(allPlayers => {
      expect(allPlayers[0].username).toEqual('Preda');
      expect(allPlayers[1].username).toEqual('Esteban');
      expect(allPlayers[2].username).toEqual('Neil');
      expect(allPlayers[3].username).toEqual('Mandoza');
    });
  });

  it('should return all winning players', () => {
    Player.getWinningPlayers()
    .then(allWinningPlayers => {
      expect(allWinningPlayers[0]).toEqual(1);
      expect(allWinningPlayers[1]).toEqual(3);
    });
  });

  it('should calculate first winning player\'s score', () => {
    Player.calculatePlayerScore(1, 100)
    .then(player => {
      expect(player.score).toEqual(100);
    });
  });
});