const express= require('express');
const redis = require('redis');

const app = express();
/**so here host is redi server that is the name of redis container whichis runing with use of docker compose file before node server running
 * port is psecified default port of redis not container port ,we dont have to specify host port ,just refrence name of container.
 * by default when we are using docker compose by default all container will be run in same network and can indefinitely will connect to
 * each other and can communicate with other as it is in same network.
 */


 const client = redis.createClient({
     host: 'redis-server',
     port: 6379
 })

//Set initial visits
client.set('visits', 0);

//defining the root endpoint
app.get('/', (req, res) => {
    client.get('visits', (err, visits) => {
        res.send('Number of visits is: ' + visits)
        client.set('visits', parseInt(visits) + 1)
    })
})

//specifying the listening port
app.listen(8081, ()=>{
    console.log('Listening on port 8081')
})