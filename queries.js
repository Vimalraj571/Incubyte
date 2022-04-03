const { pool } = require("./config");
const msg = require("./messages");
const { body, validationResult } = require("express-validator");

const getWords = (request, response) => {
  pool.query("SELECT * FROM word_schema.words", (error, results) => {
    if (error) {
      throw error;
    }
    msg.successWords.data = results.rows;
    response.send(msg.successWords);
  });
};

const postWord = (request, response) => {
  if (
    !request.header("apiKey") ||
    request.header("apiKey") !== process.env.API_KEY
  ) {
    return response
      .status(401)
      .json({ status: "error", message: "Unauthorized." });
  } else {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }
    const word = request.body.word;
    pool.query(
      "INSERT INTO word_schema.words (word) VALUES ($1)",
      [word],
      (request, response) => {
        if (err) {
          throw err;
        } else {
          response.status(200).json("Added");
        }
      }
    );
  }
};

module.exports = {
  getWords,
  postWord,
  // getWord,
  // editWord,
  // deleteWord,
};
