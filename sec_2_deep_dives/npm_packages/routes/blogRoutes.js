const express = require("express"),
	router = express.Router(),
	blogController = require("../controllers/blogController");

router.get("/", blogController.blog_index);

router.post("/", blogController.blog_create_post);

// this route handler must be placed above the one below as "create" can also be categorized as an id
router.get("/create", blogController.blog_create_get);

router.get("/:id", blogController.blog_details);

router.delete("/:id", blogController.blog_delete);

module.exports = router;
