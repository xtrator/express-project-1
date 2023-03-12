require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT;

//http://expressjs.com/en/api.html#express.json
app.use(express.json());
//http://expressjs.com/en/5x/api.html#express.urlencoded
app.use(express.urlencoded({ extended: false }));

const postRouter = require("./routes/posts");

app.use("/posts", postRouter);
app.get("/", (req, res, next) => {
  res.send("Welcome to app.");
});

app.listen(PORT, () => {
  console.info(`App listening on port http://localhost:${PORT}`);
});
