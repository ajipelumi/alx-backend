import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Connect to Redis
client.on('connect', () => {
    console.log('Redis client connected to the server');
});

// Handle errors
client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
});

// Subscribe to channel
const channel = 'holberton school channel';
client.subscribe(channel);

// Handle message
client.on('message', (channel, message) => {
    console.log(message);
    if (message === 'KILL_SERVER') {
        client.unsubscribe(channel);
        client.quit();
    }
});
