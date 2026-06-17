
const express = require("express");
const {loginUSer,getHomeData, signUp,getUserPosts,savePostOfUser,saveNotificationToken} = require("../controllers/controller")
const {upload} = require("../Multer/Multer")
//const {savePostOfUser} = require("../controllers/MediaController")

const router = express.Router();

router.post("/login",loginUSer);
router.get("/getHomeData",getHomeData);
router.post("/signUp",signUp);
router.post("/getUserPosts",getUserPosts);
router.post("/saveNotificationToken",saveNotificationToken);
router.post("/saverUserPost",upload.single("userPost"),savePostOfUser);


module.exports = router