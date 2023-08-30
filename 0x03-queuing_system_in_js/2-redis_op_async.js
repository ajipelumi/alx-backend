import redis from 'redis';
import { promisify } from 'util';

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
async function displaySchoolValue(schoolName) {
    // Promisify the client.get function
    const getAsync = promisify(client.get).bind(client);
    // Get the value of schoolName key
    const value = await getAsync(schoolName);
    console.log(value);
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
