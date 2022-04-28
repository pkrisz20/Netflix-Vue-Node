const { db } = require("../db-config");
const { insertMovie } = require("../admin/insertMovie");
const { deleteCard } = require("../admin/deleteCard");
const { updateCard } = require("../admin/updateCard");

const express = require("express");
const adminRouter = express.Router();

insertMovie(adminRouter, db);
deleteCard(adminRouter, db);
updateCard(adminRouter, db);

exports.adminRouter = adminRouter;