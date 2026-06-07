const express = require('express');
const profileRoutes = require("./routes/profileRoutes");
const app=express();
app.use(express.json());
app.get('/',(req,res)=>{
    res.json({message: 'github profile analyser backend is running'});
});
app.use("/api/profiles", profileRoutes);
module.exports=app; 