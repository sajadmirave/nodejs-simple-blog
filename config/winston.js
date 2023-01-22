const winston = require("winston");
const appRoot = require("app-root-path");
const debug = require("debug")("http")
//option for logger
let option = {
  File: {
    level: "info",
    filename: `${appRoot}/logs/app.log`,
    // save error
    handleException: true,
    // save like json
    format: winston.format.json(),
    maxsize: 5000000, //5MG
    maxFile: 5, //bishtar as 5 file nashe
  },
  console: {
    level: "debug",
    handleException: true,
    format: winston.format.combine(
      // with combine we can pass more option
      winston.format.colorize(), //color logger
      winston.format.simple() //simpe log for read better
    ),
  },
};

// create logger
const logger = new winston.createLogger({
  //option
  transports: [
    //create new file for saving log
    new winston.transports.File(option.File),
    new winston.transports.Console(option.console),
  ],
  //   stop winston when app is crashed
  exitOnError: false,
});

//in here we just stream morgan for loging
logger.stream = {
  write: function (message) {
    logger.info(message);
    debug("stream worker...")
    debug("logs saved...")
  },
};
module.exports = logger;
