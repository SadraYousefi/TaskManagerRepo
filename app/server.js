const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const createHttpError = require("http-errors");
const { AllRoutes } = require("./router");
const expressEjsLayouts = require("express-ejs-layouts");
const session = require("express-session")
const cookieParser = require("cookie-parser")

module.exports = class Application {
  #APP = express();
  #PORT;
  constructor(port) {
    this.#PORT = port
    this.config();
    this.createServer();
    this.initTemplateEngine();
    this.initClientSession();
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
  initTemplateEngine(){
    this.#APP.use(expressEjsLayouts)
    this.#APP.set("view engine" , "ejs")
    this.#APP.set("views" , path.join(__dirname , ".." , 'views'))
    this.#APP.set("layout" , "layout/main")
    this.#APP.set("layout extractStyles" , true)
    this.#APP.set("layout extractScripts" , true)
  }
  initClientSession(){
    this.#APP.use(cookieParser("dsajdskandasjk!123iosandas"))
    this.#APP.use(session({
      secret: "dsajdskandasjk!123iosandas" ,
      resave: true ,
      saveUninitialized: true ,
      cookie: {
        secure: true
      }
    }))
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
        errors: {
          msg,
        },
      });
    });
  }
  routeHandler() {
    this.#APP.use("/" , AllRoutes)
  }
};
