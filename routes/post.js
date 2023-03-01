const express = require("express");
const router = express.Router();

const postsController = require("../controllers/users_post");

router.get("/posts", postsController.posts);
