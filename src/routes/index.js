const express = require("express");
const apiRouter = express.Router();

const { addNumber } = require("../controller/addNumber");
const { showAllNumbers } = require("../controller/showAllNumbers");

apiRouter.get("/api/v1/addNumbers/:num", addNumber);
apiRouter.get("/api/v1/showAllNumbers", showAllNumbers);

module.exports = apiRouter;
