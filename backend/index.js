const express = require("express");
const app=express(); 
const cors=require("cors"); 
app.use(express.json()); 
app.use(cors()); 


const admin_router  = require('./routes/admin');
const events_router = require('./routes/events');

app.use("/api/v1/admin",admin_router); 
app.use("/api/v1/events",events_router); 

app.listen(3000); 