const express=require('express'); 

const admin_router=express.Router(); 

admin_router.get("/first",(req,res)=>{ 
    res.send("This is admin first route");  
})
module.exports=admin_router; 