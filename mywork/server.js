const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");
const dotenv = require("dotenv");

//config() config function use to call the .env file
dotenv.config();

//app object used to develop the restfull webservices
const app = express();

// enable b/w the ports
app.use(cors());

//comunication b/w all languages

app.use(express.json());

//Create the reference variable to connect to mongodb database
 
    let prasadIT=mongodb.MongoClient;

//resving the data from react

app.post("/login",(req,res)=>{

    //calling the mongodb server link using variable name

    prasadIT.connect(process.env.CONNECTION_URL,(err,connection)=>{
        if(err) throw err;
        else{
            //database reference

            const db = connection.db("rayala-6pm");
            db.connection("user-details").find({"uname":req.body.uname,
                                                "upwd":req.body.upwd}).toArray((err,array)=>{
                                                    if(err) throw err;
                                                    else{
                                                        if(array.length>0){
                                                            res.send({"login":"success"});
                                                        }
                                                        else{
                                                            res.send({"login":"faill"});
                                                        }
                                                    }
                                                })
        }
    });
});

let port=process.env.PORT || 1234;

app.listen(port,()=>{
    console.log("server started")
});

