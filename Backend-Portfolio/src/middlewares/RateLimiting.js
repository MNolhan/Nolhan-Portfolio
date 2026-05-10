import redisClient from "../infra/RedisClient.js";

const rateLimiter = async (req, res, next) => {
    try {
        const ip = req.ip;
        const key = `rate:${req.originalUrl}:${ip}`;
        const requests = await redisClient.incr(key);

        if (requests === 1) {
            await redisClient.expire(key, 900); 
        }

        const LIMIT = 20;

        if (requests > LIMIT) {
            return res.status(429).json({
                message: "Trop de requêtes, veuillez réessayer plus tard",
            });
        }

        return next();
    } catch (err) {
        return next();
    }
};

export default rateLimiter;
