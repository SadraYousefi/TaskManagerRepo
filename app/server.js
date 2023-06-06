const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const createHttpError = require("http-errors");
const { AllRoutes } = require("./router");

module.exports = class Application {
  #APP = express();
  #PORT;
  constructor(port) {
    this.#PORT = port
    this.config();
    this.createServer();
    this.initDataBase();
    this.routeHandler();
    this.errorHandler();
  }
  config() {
    this.#APP.use(morgan("dev"));
    this.#APP.use(express.static(path.join(__dirname, "..", "public")));
    this.#APP.use(express.json());
    this.#APP.use(express.urlencoded({ extended: true }));
    this.#APP.use(cors());
  }
  createServer() {
    const http = require("http");
    try {
      http
        .createServer(this.#APP)
        .listen(this.#PORT, () =>
          console.log(`server is listening on port: ${this.#PORT}`)
        );
    } catch (error) {
      console.log(error);
    }
  }
  initDataBase() {}
  errorHandler() {
    this.#APP.use((req, res, next) => {
      next(createHttpError.NotFound("Page not found"));
    });
    this.#APP.use((error, req, res, next) => {
      const serverError = createHttpError.InternalServerError();
      const statusCode = error.status || serverError.statusCode;
      const msg = error.message || serverError.message;
      return res.status(statusCode).json({
        statusCode,
        errros: {
          msg,
        },
      });
    });
  }
  routeHandler() {
    this.#APP.use("/" , AllRoutes)
  }
};
