const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");
const dotenv =require("dotenv");

dotenv.config();

const app =express();

app.use(cors());

app.use(express.json);

let rayala = mongodb.MongoClient;

app.post("/login",(req,res)=>{
    rayala.connect(process.env.CONNECTION_URL,(err,connection)=>{
        if(err) throw err;
        else{
            const db=connection.db("Rayala@369");
            db.collection("User_details").find({"uname":req.body.uname,
                                                "upwd":req.body.upwd}).toArray((err,array)=>{
                                                    if(err) throw err;
                                                    else{
                                                        if(array.length>0){
                                                            res.send({"login":"succes"});
                                                                            }
                                                        else{
                                                            res.send({"login":"faill"})
                                                            }
                                                    }
                                                })
        }
    })
})

let port = process.env.PORT || 1234;

app.listen(port,()=>{
    console.log("server started")
})