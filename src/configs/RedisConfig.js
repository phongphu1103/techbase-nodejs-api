import './environments/LoadEnv';

const RedisConfig = {
	RD_HOST         : process.env.RD_HOST || "127.0.0.1",
    RD_PORT         : process.env.RD_PORT || 6379,
    RD_USER         : process.env.RD_USER,
    RD_PASS         : process.env.RD_PASS,
    RD_NAME         : process.env.RD_NAME
}

export default RedisConfig;