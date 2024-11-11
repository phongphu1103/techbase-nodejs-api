import redis from 'redis';
import bluebird from 'bluebird';

import RedisConfig from '../configs/RedisConfig';

bluebird.promisifyAll(redis);
const RedisClient = redis.createClient({
    host: RedisConfig.RD_HOST,
    port: RedisConfig.RD_PORT,
    password: RedisConfig.RD_PASS,
    retry_strategy: (options) => {
        if (options.error && (options.error.code === 'ECONNREFUSED' || options.error.code === 'NR_CLOSED')) {
            // End reconnecting on a specific error and flush all commands with an individual error
            return new Error('The server refused the connection')
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands with an individual error
            return new Error('Retry time exhausted')
        }
        if (options.attempt > 1) {
            // End reconnecting with built in error
            return undefined
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000)
    }
});

let isConnectionEstablished = false

RedisClient.on('error', (err) => {
    isConnectionEstablished = true
    console.log('Could not establish a connection with redis. ' + err)
})

RedisClient.on('connect', (err) => {
    isConnectionEstablished = false
    console.log('Connected to redis successfully')
});

const isRedisAvailable = () => isConnectionEstablished

export default RedisClient;
export { isRedisAvailable };