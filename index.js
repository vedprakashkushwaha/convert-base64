const redis = require("redis");
const redisClient = redis.createClient(
    {
        socket: {
            port: 6379,
            host: "127.0.0.1",
        }
    }
);

(async () => {
	await redisClient.connect();
})();

console.log("Connecting to the Redis");

redisClient.on("ready", () => {
	console.log("Connected!");
});

redisClient.on("error", (err) => {
	console.log("Error in the Connection");
});


async function setData(key, value) {
    await redisClient.set(key, value, (err, reply) => {
        logger.info('Data set into cache: ', key, reply);
    });
}


setData('test-key-ved', "this is a test key");