const express = require('express')
const jwt = require('jsonwebtoken')

const app = express();

app.post('/login',(req,res)=>{
    const user ={
        username:"cvr",
        password:"cse"
    }
    jwt.sign({user:user},"secret key",(err,token)=>{
        res.json({token})
    })
})
app.listen(3000, () => console.log("Server Started . . ..  "))          

function accessToken(req,res,next){
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== "undefined"){
        const bearerToken = bearerHeader.split(" ")[1];
        console.log(bearerHeader)
        req.token = bearerToken;
        next();
    }
    else{
        res.json({
            message:"No header exist"
        })
    }
   
}
app.post('/profile',accessToken,(req,res) => {
    jwt.verify(req.token,"secret key",(err,data)=>{
        if(!err){
            res.json({
                message:"Welcome",
                data
            })
        }
        else{
            res.json({
                message : "Invalid token",
       
            })
        }
    })
   
   
})