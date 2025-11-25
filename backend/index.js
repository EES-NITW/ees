const express = require("express");

const app=express(); 
app.use(express.json()); 
// const cors=require("cors"); 
const admin_router  = require('./routes/admin');

// app.use(cors()); 
app.use("/api/v1/admin",admin_router); 
 

app.listen(3000); 