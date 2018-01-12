'use strict';
const { db, loadDb, resetDb } = require('../../../db');
const Game = require('../../models/games.js');
const Player = require('../../models/players.js');

let player1;
let player2;
let testGame;

const expectedtestGame = {
  game_id: 1,
  playerx: 1,
  playero: 2,
  game_status: 'active',
  board: [null, null, null, null, null, null, null, null, null],
  winner: null
};

const expectedTestGameBoardAfterMove = ['X', null, null, null, null, null, null, null, null];
const boardPlayerXWinner = ['X', 'O', null, null, 'X', null, 'O', null, 'X'];

xdescribe('Games table', () => {
  beforeAll(() => {
    return loadDb(db)
    .then(() => Player.addPlayer('Piccard'))
    .then(player => {
      player1 = player;
      return Player.addPlayer('Riker');
    })
    .then(player => {
      player2 = player;
      // return Game.start(player1, player2);
    })
    // .then(game => {
    //   testGame = game;
    // })
    .catch(err => console.error(err));
  });

  afterAll(() => resetDb());

  it('should add a new game to the games table with two players', () => {
    return Game.start(player1.username, player2.username)
    .then(game => {
      expect(game.game_id).toExist;
      expect(game.game_id).toEqual(expectedtestGame.game_id)
      expect(game.playerx).toEqual(player1.player_id);
      expect(game.playero).toEqual(player2.player_id);
      expect(game.game_status).toEqual('active');
      expect(game.board).toEqual([null, null, null, null, null, null, null, null, null]);
      expect(game.winner).toEqual(null);
    });
  });

  it('should update a game\'s board when a player selects a move', () => {
    return Game.move(['X', null, null, null, null, null, null, null, null], 1)
    .then(game => {
      expect(game.board).toEqual(expectedTestGameBoardAfterMove);
    });
  });

  it('should declare playerx as winner if so', () => {
    return Game.declarePlayerXWinner(1)
    .then(game => {
      expect(game.game_status).toEqual('inactive');
      expect(game.winner).toEqual(1);
    });
  });

  it('should declare playero as winner if so', () => {
    return Game.start(player1.username, player2.username)
    .then(() => Game.move(['X', 'O', null, null, 'X', null, 'O', null, 'X'], 2))
    .then(game => Game.declarePlayerOWinner(2))
    .then(game => {
      expect(game.winner).toEqual(2);
    });
  });

  it('should declare draw game if so', () => {
    return Game.start(player1.username, player2.username)
    .then(() => Game.move(['X', 'X', 'O', 'O', 'X', 'X', 'X', 'O', 'O'], 3))
    .then(game => Game.declareDraw(3))
    .then(game => {
      expect(game.game_status).toEqual('inactive');
      expect(game.winner).toEqual(null);
    });
  });
});