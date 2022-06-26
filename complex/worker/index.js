const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

const duplicateRedisClient = redisClient.duplicate();

function fibancci(num){
    if(num<2){
        return 1;
    }
    return fibancci(num-1)+fibancci(num-2);
}

duplicateRedisClient.on('message', (channel,message)=>{
    redisClient.hset('values',message,fibancci(parseInt(message)))
});
// when ever the redis client try to insert it will call above function on
//redis client on event andit will calculate the fibancci
duplicateRedisClient.subscribe('insert');