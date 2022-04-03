const successWords = {
  code: 200,
  status: "OK",
  data: [],
};

const failure = {
  code: 404,
  status: "network-error",
  data: {
    message: "Sorry Network Error",
  },
};

const successGetWord = {
  code: 200,
  status: "OK",
  word: {},
};

const successEditWord = {
  code: 200,
  status: "OK",
  message: "Word Edited Successfully",
};

const successDeleteWord = {
  code: 200,
  status: "OK",
  word: "Word Deleted Successfully",
};

const failureGetWord = {
  code: 404,
  status: "no-word-found",
  word: "No Words Found in the given Id",
};

module.exports = {
  successWords,
  successGetWord,
  successEditWord,
  successDeleteWord,
  failureGetWord,
  failure,
};
