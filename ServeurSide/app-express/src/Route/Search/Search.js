const express = require("express");
const routerSearch = express.Router();

const { checkToken, verifyToken } = require("../../Middleware/AuthToken");

routerSearch.get("/", (req, res) => {
    return res.status(200).json({
        message: "route search non terminée.",
    });
});

module.exports = routerSearch;