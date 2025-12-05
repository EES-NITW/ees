const express=require('express'); 
const { default: pgclient } = require('../db');
const teams_router=express.Router(); 

teams_router.get("/members",async (req,res)=>{ 
    
    const response=await pgclient.query("SELECT * FROM members"); 
    res.send({ 
        results:response.rows
    }) 
}) 

teams_router.post("/add_member" , async (req,res)=>{ 
    const {name,roll_no,team}=req.body; 
    
    const query=`Insert into members (name,roll_no,team) values ($1,$2,$3) RETURNING *`;

    const response=await pgclient.query(query,[name,roll_no,team]);  
    res.send({ 
        message:"Member added successfully", 
        member:response.rows[0]
    }) 


});

teams_router.delete("/delete_member",async (req,res)=>{ 
    const memberId=req.query.id;
    const query=`DELETE FROM members WHERE id=$1 RETURNING *`;
    const response=await pgclient.query(query,[memberId]);  
    res.send({ 
        message:"Member deleted successfully", 
        member:response.rows[0]
    }) 
});
module.exports=teams_router;