const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
var requireAuth = require("../middleware/middleware");
const multer = require("multer");
const upload = multer({ storage: multer.diskStorage({}) });

// GET request
router.get("/home", requireAuth, userController.user_index_get);
router.get("/user/add.html", requireAuth, userController.user_add_get);
router.get("/view/:id", requireAuth, userController.user_view_get);
router.get("/edit/:id", requireAuth, userController.user_edit_get);

// POST request 
router.post("/user/add.html", userController.user_add_post);
router.post("/search", userController.user_search_post);
router.post("/profile-update",upload.single("avatar"),userController.user_profilePicture_post);

// DELETE request

router.delete("/edit/delete/:id", userController.user_edit_delete);
router.delete("/index/action/del/:id", userController.user_index_delete);

// PUT request ==  Update Data

router.put("/edit/update/:id", userController.user_update);

module.exports = router;
