const express = require('express');
const router=express.Router();
const {
  analyzeProfile,
  fetchAllProfiles,
  fetchSingleProfile
} = require("../controllers/profileControllers");

router.get('/profile/:username',analyzeProfile);
router.get("/analyze/:username", analyzeProfile);
router.get("/", fetchAllProfiles);
router.get("/:username", fetchSingleProfile);


router.get("/test", (req, res) => {
  res.send("Router working");
});   
module.exports=router;