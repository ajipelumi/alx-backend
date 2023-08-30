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

// Set a value
function setNewSchool(schoolName, value) {
    client.set(schoolName, value, redis.print);
}

// Get a value
function displaySchoolValue(schoolName) {
    client.get(schoolName, (err, res) => {
        console.log(res);
    });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
