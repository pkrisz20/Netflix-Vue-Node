const { db } = require("../db-config");
const { getCards } = require("../movies/getCards");
const { insertMovie } = require("../movies/insertMovie");
const { deleteCard } = require("../movies/deleteCard");
const { updateCard } = require("../movies/updateCard");
const { getCategories } = require("../movies/getCategories");
const { getMovieDetails } = require("../movies/getMovieDetails");

const express = require("express");
const moviesRouter = express.Router();

getCards(moviesRouter, db);
insertMovie(moviesRouter, db);
deleteCard(moviesRouter, db);
updateCard(moviesRouter, db);
getCategories(moviesRouter, db);
getMovieDetails(moviesRouter, db);

exports.moviesRouter = moviesRouter;
