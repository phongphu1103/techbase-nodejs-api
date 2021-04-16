import redis from 'redis';

import RedisConfig from '../configs/RedisConfig';

const RedisClient = redis.createClient({
    host: RedisConfig.RD_HOST,
    port: RedisConfig.RD_PORT,
    password: RedisConfig.RD_PASS,
    retry_strategy: (options) => {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with a individual error
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands with a individual error
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
            // End reconnecting with built in error
            return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    }
});

RedisClient.on('error', (err) => {
    console.log('Could not establish a connection with redis. ' + err);
});

RedisClient.on('connect', (err) => {
    console.log('Connected to redis successfully');
});

export default RedisClient;