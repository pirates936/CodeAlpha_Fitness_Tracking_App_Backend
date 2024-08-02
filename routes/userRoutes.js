const router = require("express").Router();
const UserControllers = require("../controllers/userController"); // user controller


router.post("/register", UserControllers.register); // register route
router.post("/login", UserControllers.login); // login route


module.exports = router; //export router