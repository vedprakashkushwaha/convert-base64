const redis = require("redis");
var request = require('request').defaults({ encoding: null });

const redisClient = redis.createClient(
    {
        socket: {

            port: 6379,
            //`host: "127.0.0.1",
	    host: 'superone-game-royal.jlnwgb.ng.0001.euw2.cache.amazonaws.com'


        }
    }
);

(async () => {
	await redisClient.connect();
})();

const url = 'https://raw.githubusercontent.com/vedprakashkushwaha/convert-base64/main/World_cat.webp'


redisClient.on("ready", () => {
	console.log("Connected!");
});

redisClient.on("error", (err) => {
	console.log("Error in the Connection");
});

async function setData(key, value) {
    try {
        await redisClient.set(key, value, (err, reply) => {
            if (err) {
                console.log("error while setting data: ", err);
            }
            console.log('Data set into cache: ', key, reply);
        });
        console.log('Setting Key ', key);
    } catch (err) {
        console.log("Error while setting: ", err);
    };
}


function convertImageToBase64(url) {
    try {
        return new Promise((resolve, reject) => {
            request.get(url, async function (error, response, body) {
              if (error || response.statusCode !== 200) resolve({ status: response.statusCode, error: error });
              if (!error && response.statusCode == 200) {
                data = Buffer.from(body).toString('base64');
                resolve({ status: response.statusCode, data: data });
              }
            });
          });
    } catch (err) {
        console.log("Error while fetching data: ", err)
    }
    
  }

async function getImageString() {
   const data =  await convertImageToBase64(url);
   await setData('game_image_missing_image_parent_tag_5', data.data);
}

//missing_image_parent_tag_5

getImageString()
// async function convertIntoBase4(url) {
//     const response = await fetch(url);
//     const buffer = await response.buffer();
//     const base64 = buffer.toString('base64');
//     const base4 = base64.replace(/\+/g, '-').replace(/\//g, '_');
//     return await redisClient.get(key);
// }

// setData('test-key-ved', "this is a test key");
