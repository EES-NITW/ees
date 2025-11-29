const express=require('express'); 
const { default: pgclient } = require('../db');

const events_router=express.Router(); 
events_router.get("/first_test", (req,res)=>{ 
   res.status(200).json({message:"Events router is working fine"}); 
});
events_router.post("/add_event",async (req,res)=>{ 
   // This endpoint is used to add event details 
   const {title,description,date,status,venue}=req.body;  
   console.log("came into api");
   const query=`Insert into events (title,description,date,status,venue) values($1,$2,$3,$4,$5) RETURNING *`;
   const response=await pgclient.query(query,[title,description,date,status,venue]);
   res.status(200).json({message:"Event added successfully",event:response.rows[0]}); 
});  
events_router.post("/add_event_photos",(req,res)=>{ 
 /// This endpoint is used to add event photos provided event id 
})
events_router.delete("/delete_event",(req,res)=>{ 
/// This endpoint is used to delete an event entry
}) 
events_router.get("/get_all_completed",(req,res)=>{ 
/// This endpoint should return all the completed events 
  
})
events_router.get("/get_all_upcoming",(req,res)=>{ 
/// This endpoint should return all the upcoming events
})

module.exports=events_router;