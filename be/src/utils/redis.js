const { createClient } = require("redis");
const logger = require("./src/logger/logger");

const redisURI = process.env.REDIS_URI || "localhost";
const redisPort = process.env.REDIS_PORT || 6379;

const redisClient = createClient({
  url: `redis://${redisURI}:${redisPort}`,
});

redisClient.on("connect", () => {
  logger.info(`Connected to Redis at redis://${redisURI}:${redisPort}`);
});

redisClient.on("error", (err) => {
  logger.error("Redis error:", err);
});

(async () => {
  try {
    await redisClient.connect();
    logger.info("Redis connection established successfully.");
  } catch (error) {
    logger.error("Failed to connect to Redis:", error);
  }
})();

const RedisUtils = {
  /**
   * @param {string} key 
   * @returns {Promise<string|null>} 
   */
  get: async (key) => {
    try {
      const value = await redisClient.get(key);
      if (value) {
        logger.info(`Successfully retrieved value for key: ${key}`);
      } else {
        logger.warn(`Key "${key}" does not exist in Redis.`);
      }
      return value;
    } catch (error) {
      logger.error(`Error getting key "${key}" from Redis:`, error);
      throw error;
    }
  },

  /**
   * @param {string} key 
   * @param {string} value 
   * @param {number} [ttl] 
   * @returns {Promise<void>}
   */
  set: async (key, value, ttl) => {
    try {
      if (ttl) {
        await redisClient.set(key, value, { EX: ttl });
      } else {
        await redisClient.set(key, value);
      }
      logger.info(`Successfully set key "${key}" in Redis.`);
    } catch (error) {
      logger.error(`Error setting key "${key}" in Redis:`, error);
      throw error;
    }
  },

  /**
   * @param {string} key 
   * @returns {Promise<void>}
   */
  delete: async (key) => {
    try {
      const result = await redisClient.del(key);
      if (result) {
        logger.info(`Successfully deleted key "${key}" from Redis.`);
      } else {
        logger.warn(`Key "${key}" not found in Redis, nothing to delete.`);
      }
    } catch (error) {
      logger.error(`Error deleting key "${key}" from Redis:`, error);
      throw error;
    }
  },
};

module.exports = { redisClient, RedisUtils };
