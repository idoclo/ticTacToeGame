const schema = db => (
  db.query('CREATE TABLE IF NOT EXISTS players(\
    player_id SERIAL PRIMARY KEY,\
    name VARCHAR(50) NOT NULL,\
    email VARCHAR(50) NOT NULL,\
    score INTEGER NOT NULL, \
    created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP\
    );')
  .then(() => {
    db.query('CREATE TABLE IF NOT EXISTS games(\
      game_id SERIAL PRIMARY KEY,\
      player_X INT REFERENCES players ON DELETE CASCADE,\
      player_O INT REFERENCES players ON DELETE CASCADE,\
      game_status VARCHAR(10),\
      board VARCHAR [],\
      winner INT REFERENCES players ON DELETE CASCADE,\
      created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP\
      );')
  })
  .catch(err => {
    console.error('Error creating tables in tic tac toe db: ', err);
  })
);

module.exports = schema;