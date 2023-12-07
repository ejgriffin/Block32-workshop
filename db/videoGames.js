const client = require("./client");
const util = require("./util");

const REPLACE_ME = "HELP REPLACE ME!!!!";

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
  try {
    // get all videogames from database
    const { rows: videoGames } = await client.query(
      `SELECT * FROM videogames;`
    );
    return videoGames;
  } catch (error) {
    throw new Error("Make sure you have replaced the REPLACE_ME placeholder.");
  }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
            SELECT * FROM videoGames
            WHERE id = $1;
        `,
      [id]
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
  try {
    const {
      rows: [videogame],
    } = await client.query(
      `INSERT INTO videogames(name, description, price)
        VALUES($1, $2, $3)
        RETURNING *;
        `,
      [body.name, body.description, body.price]
    );
    return videogame;
  } catch (err) {
    throw err;
  }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
  try {
    const updateFields = util.dbFields(fields);
    const {
      rows: [videogame],
    } = await client.query(
      `
UPDATE videogames
SET ${updateFields.insert}
WHERE id=${id}
RETURNING *;
`,
      updateFields.vals
    );
  } catch (err) {
    throw err;
  }
}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
  try {
    const {
      rows: [videogame],
    } = await client.query(
      `DELETE FROM videogames
    WHERE id=$1
    RETURNING *;`,
      [id]
    );
    return videogame;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAllVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
};
