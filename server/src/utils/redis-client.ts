import Redis from 'ioredis'
import { env } from './env';

const redis = new Redis({
    host:env.REDIS_HOST,
    port:env.REDIS_PORT,
    password:env.REDIS_PASSWORD
});

export default redis;