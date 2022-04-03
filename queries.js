const { pool } = require("./config");
const msg = require('./messages');

const getWords = (request, response) => {
  pool.query("SELECT * FROM word_schema.words", (error, results) => {
    if (error) {
      throw error;
    }
    msg.successWords.data = results.rows;
    response.send(msg.successWords);
  });
};
module.exports = {
    getWords,
    // postWord,
    // getWord,
    // editWord,
    // deleteWord,
};
