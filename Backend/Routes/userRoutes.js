// const { default: SetAvatar } = require("../../talk/src/Pages/SetAvatar")
const { register, login,setAvatar, alluser } = require("../Controller/userController")

const router = require("express").Router()

router.post("/register",register)
router.post("/login",login)
router.post("/setAvatar/:id",setAvatar)
router.get("/alluser/:id",alluser)
module.exports = router;