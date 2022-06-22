const express= require('express');

const app = express();

app.get("/",(req,resp)=>{
    resp.send("hi hello i am there");
});

app.listen(8080,()=>{
    console.log("i am starting");
});