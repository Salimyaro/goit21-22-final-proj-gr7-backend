const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
// const path = require("path");
// const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./demo-routes/api/users");
const { HttpCode, Status } = require("./demo-helpers/constants");
require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(express.static(process.env.PUBLIC_DIR));
// const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;
// app.use(express.static(path.join(__dirname, AVATARS_OF_USERS)));

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (_req, res, _next) => {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: Status.ERROR,
      code: HttpCode.BAD_REQUEST,
      data: "Bad request",
      message: "Too many requests, please try again later.",
    });
  },
});

app.use("/", apiLimiter);
app.use("/users", usersRouter);
// app.use("/api/contacts", contactsRouter);

app.use((_req, res) => {
  res.status(HttpCode.NOT_FOUND).json({ message: "Not found" });
});

app.use((err, _req, res, _next) => {
  res
    .status(err.status || HttpCode.INTERNAL_SERVER_ERROR)
    .json({ message: err.message });
});

module.exports = app;
