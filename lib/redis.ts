import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDISHOST,
  port: parseInt(process.env.REDISPORT || '6379'),
  password: process.env.REDISPASSWORD,
  username: process.env.REDISUSER,
});

export default redis;
