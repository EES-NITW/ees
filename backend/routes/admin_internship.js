const express = require('express');
const app=express();
const cors=require('cors');
app.use(express.json());
app.use(cors());

const admin_internship_router = express.Router(); 
admin_internship_router.post("/add_internship",(req,res)=>{ 
   /// This endpoint is used to add internship exp details of a person 
}) 
admin_internship_router.get("/get_all_internships",(req,res)=>{ 
    ///This endpoint should return all the companies that come for internships 
}) 
admin_internship_router.get("/get_company_internships",(req,res)=>{ 
   /// This endpoint should return all the internships offers of a particular company
}) 

admin_internship_router.delete("/delete_internship",(req,res)=>{
   /// This endpoint is used to delete an internship entry
}) 


module.exports=admin_internship_router;