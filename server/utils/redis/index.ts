import Redis from 'ioredis';

const config = useRuntimeConfig();

const redis = new Redis(config.redisUrl);

export default redis;