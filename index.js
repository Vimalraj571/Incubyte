const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./queries");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const { body, check } = require("express-validator");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 15, // 15 requests,
});

const postLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1,
});

if (!process.env.NODE_ENV === "dev") {
  app.use(limiter);
}

const isProduction = process.env.NODE_ENV === "production";
const origin = {
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(origin));

app.get("/", (req, res) => {
  res.send("TEST");
});

app.get("/words", db.getWords);
app.post(
  "/word",
  [check("word").not().isEmpty().isLength({ min: 5, max: 255 }).trim()],
  postLimiter,
  db.postWord
);
app.get("/word/:id", db.getWord);
app.put("/word/:id", db.editWord);
app.delete("/word/:id", db.deleteWord);

// Start server
app.listen(process.env.PORT || 3003, () => {
  console.log(`Server listening`);
});
