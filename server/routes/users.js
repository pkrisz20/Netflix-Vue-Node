const { db } = require("../db-config");
const { Registration } = require("../users/Registration");
const { Login } = require("../users/Login");
const { Logout } = require("../users/Logout");
const { getUserData } = require("../users/getUserData");
const { changeProfile } = require("../users/changeProfile");
const { changeMail } = require("../users/changeMail");
const { changeUsername } = require("../users/changeUsername");
const { changePassword } = require("../users/changePassword");
const { loginStatus } = require("../users/loginStatus");

const express = require("express");
const usersRouter = express.Router();

Registration(usersRouter, db);
Login(usersRouter, db);
Logout(usersRouter);
getUserData(usersRouter, db);
changeProfile(usersRouter, db);
changeMail(usersRouter, db);
changeUsername(usersRouter, db);
changePassword(usersRouter, db);
loginStatus(usersRouter);

exports.usersRouter = usersRouter;