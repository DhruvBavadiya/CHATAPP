// const { default: SetAvatar } = require("../../talk/src/Pages/SetAvatar")
const {Addmessage,getAllmessage } = require("../Controller/messageController")

const router = require("express").Router()

router.post("/addmsg/",Addmessage)
router.post("/getmsg/",getAllmessage)
module.exports = router;