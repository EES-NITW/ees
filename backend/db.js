import {Client } from "pg"; 
const pgclient=new Client('postgresql://neondb_owner:npg_fFPMQtr9vV1y@ep-bitter-shadow-ahhf37mu-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'); 

async function connectDB(){ 
    await pgclient.connect(); 
}
connectDB(); 
export default pgclient;