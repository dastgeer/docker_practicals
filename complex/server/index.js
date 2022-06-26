const keys = require('./keys');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 

const expressServer = express();
expressServer.use(cors());
expressServer.use(bodyParser.json());

//get the pool object for connection
const {Pool}= require('pg');

//create connection pool and act as client whic will give connection thread object
console.log("printing keys-->",keys);
const pgClient =new Pool({
    user: keys.pgUser,
    password: keys.pgPass,
    host:keys.pgHost,
    port:keys.pgPort,
    database:keys.pgDatabase
});
pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => console.error(err));
});

//redis cleint setups
const redis =require('redis');
const redisClient = redis.createClient({
    host:keys.redisHost,
    port:keys.redisPort,
    retry_strategy: ()=>1000
})

//duplicate client of redisPort
const redisPublisher= redisClient.duplicate();

//express server api
//to test the server working fine
expressServer.get('/',(req,resp)=>{
    resp.send("hello bro");
})

//get value from database
expressServer.get('/values/all',async (req,resp)=>{
      const values =  await pgClient.query('SELECT * FROM values')
      resp.send(values.rows);
})

//get value from redis
expressServer.get('/values/current',async (req,resp)=>{
    await redisClient.hgetall('values',(err,valuesData)=>{
        resp.send(valuesData);
     });
});

//get value as post
// expressServer.post('/values', async (req,resp)=>{
//     const indexData = req.body.index; // rcieve key in post body and its value in it as json fomrat.
//     if(parseInt(indexData)>40){
//         return resp.status(422).send('index value is too high');
//     }
//     redisClient.hset('values',index,'nothing yet!');
//     redisPublisher.publish('insert',index);
//     pgclient.query('INSERT INTO values(number) VALUES($1)',[index]);
//     resp.send({working:true});
// })
expressServer.post("/values", async (req, res) => {
    const index = req.body.index;
  
    if (parseInt(index) > 40) {
      return res.status(422).send("Index too high");
    }
  
    redisClient.hset("values", index, "Nothing yet!");
    redisPublisher.publish("insert", index);
    pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);
  
    res.send({ working: true });
  });


expressServer.listen('9000',()=>{
    console.log("started server at 9000 express server");
})

