const express=require('express'); 

const events_router=express.Router(); 
events_router.post("/add_event",(req,res)=>{ 
   /// This endpoint is used to add event details
})  
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