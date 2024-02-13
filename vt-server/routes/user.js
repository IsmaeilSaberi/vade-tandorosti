const express = require("express");
const router = express();

const UserCtrl = require("../controllers/user.js");

router.get("/", UserCtrl.getUsers);
router.post("/signin", UserCtrl.signin);
router.post("/signup", UserCtrl.signup);
router.delete("/:id", UserCtrl.deleteUser);

module.exports = router;
