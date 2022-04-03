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
    (!process.env.NODE_ENV === "dev" && !request.header("apiKey")) ||
    request.header("apiKey") !== process.env.API_KEY
  ) {
    return response
      .status(401)
      .json({ status: "error", message: "Unauthorized." });
  } else {
    if (!process.env.NODE_ENV === "dev") {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
      }
    }
    const word = request.body.word;
    pool.query(
      "INSERT INTO word_schema.words (word) VALUES ($1)",
      [word],
      (error, results) => {
        if (error) {
          throw error;
        } else {
          response.status(200).json("Added");
        }
      }
    );
  }
};

const getWord = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT COUNT(*) AS C FROM word_schema.words WHERE id = $1",
    [id],
    (error, resultFound) => {
      if (error) {
        throw error;
      } else {
        if (resultFound.rows[0].c == 0) {
          res.send(msg.failureGetWord);
        } else {
          pool.query(
            "SELECT * FROM word_schema.words WHERE id = ($1)",
            [id],
            (error, results) => {
              if (error) {
                throw error;
              } else {
                msg.successGetWord.word = result.rows[0];
                response.send(msg.successGetWord);
              }
            }
          );
        }
      }
    }
  );
};

const editWord = (request, response) => {
  const id = parseInt(request.params.id);
  const newWord = request.body.word;
  pool.query(
    "SELECT COUNT(*) AS C FROM word_schema.words WHERE id = $1",
    [id],
    (error, resultFound) => {
      if (error) {
        throw error;
      } else {
        if (resultFound.rows[0].c == 0) {
          res.send(msg.failureGetWord);
        } else {
          pool.query(
            "UPDATE word_schema.words SET word = $1 WHERE id = $2",
            [newWord, id],
            (error, results) => {
              if (error) {
                throw error;
              } else {
                response.send(msg.successEditWord);
              }
            }
          );
        }
      }
    }
  );
};

const deleteWord = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT COUNT(*) AS C FROM word_schema.words WHERE id = $1",
    [id],
    (error, resultFound) => {
      if (error) {
        throw error;
      } else {
        if (resultFound.rows[0].c == 0) {
          res.send(msg.failureGetWord);
        } else {
          pool.query(
            "DELETE FROM word_schema.words WHERE id = $1",
            [id],
            (error, results) => {
              if (error) {
                throw error;
              } else {
                response.send(msg.successDeleteWord);
              }
            }
          );
        }
      }
    }
  );
};

module.exports = {
  getWords,
  postWord,
  getWord,
  editWord,
  deleteWord,
};
