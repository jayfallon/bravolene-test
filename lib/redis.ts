import Redis from 'ioredis';

console.log('Redis environment variables:', {
  REDIS_URL: process.env.REDIS_URL,
  REDIS_PUBLIC_URL: process.env.REDIS_PUBLIC_URL,
  REDISHOST: process.env.REDISHOST,
  REDISPORT: process.env.REDISPORT,
});

const redis = new Redis(process.env.REDIS_URL || '');

export default redis;
