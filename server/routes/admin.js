const { db } = require("../db-config");
const { insertMovie } = require("../admin/insertMovie");
const { deleteCard } = require("../admin/deleteCard");
const { updateCard } = require("../admin/updateCard");
const { adminStatus } = require("../admin/adminStatus");
const { adminLogin } = require("../admin/adminLogin");
const { adminLogout } = require("../admin/adminLogout");
const { getAdminData } = require("../admin/getAdminData");

const express = require("express");
const adminRouter = express.Router();

insertMovie(adminRouter, db);
deleteCard(adminRouter, db);
updateCard(adminRouter, db);
adminStatus(adminRouter, db);
adminLogin(adminRouter, db);
adminLogout(adminRouter, db);
getAdminData(adminRouter, db);

exports.adminRouter = adminRouter;