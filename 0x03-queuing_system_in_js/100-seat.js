import express from 'express';
import redis from 'redis';
import { promisify } from 'util';
import kue from 'kue';

// Create an express application
const app = express();

// Create a new redis client
const client = redis.createClient();

// Create a new queue
const queue = kue.createQueue();

// Function to reserve seat
function reserveSeat(number) {
    // Set the key in Redis
    client.set('available_seats', number);
}

// Function to get the current available seats
async function getCurrentAvailableSeats() {
    // Promisify the client.get function
    const getAsync = promisify(client.get).bind(client);
    // Get the available seats
    const availableSeats = await getAsync('available_seats');
    // Return the available seats
    return Number(availableSeats) || 0;
}

// Set the number of available seats to 50
reserveSeat(50);

// Initialize the boolean to be true
let reservationEnabled = true;

// Route to get the current available seats
app.get('/available_seats', async (req, res) => {
    // Get the current available seats
    const availableSeats = await getCurrentAvailableSeats();
    // Return the response
    res.json({ numberOfAvailableSeats: availableSeats });
});

// Route to reserve a seat
app.get('/reserve_seat', async (req, res) => {
    // Check if reservation is enabled
    if (!reservationEnabled) {
        // Return the response
        res.json({ status: 'Reservation are blocked' });
    } else {
        // Create a new job
        const job = queue.create('reserve_seat', {});
        // Save the job and return
        job.save((err) => {
            // If there is an error, return the response
            if (err) res.json({ status: 'Reservation failed' });
            // Return the response
            res.json({ status: 'Reservation in process' });
        });
        // If the job is completed, log the completion message
        job.on('complete', () => console.log(`Seat reservation job ${job.id} completed`));
        // If the job fails, log the error message
        job.on('failed', (err) => console.log(`Seat reservation job ${job.id} failed: ${err}`));
    }        
});

// Route to process the seat reservation
app.get('/process', async (req, res) => {
    // Send the response
    res.json({ status: 'Queue processing' });
    // Process the queue
    queue.process('reserve_seat', async (job, done) => {
        // Get the current available seats
        const availableSeats = await getCurrentAvailableSeats();
        // Get the new number of available seats
        const newAvailableSeats = availableSeats - 1;
        // If the new number of available seats is equal to 0
        if (newAvailableSeats === 0) {
            // Set the reservationEnabled boolean to false
            reservationEnabled = false;
        }
        // If the new number of available seats is more or equal than 0
        if (newAvailableSeats >= 0) {
            // Reserve the seat
            reserveSeat(newAvailableSeats);
            // Call the done function
            done();
        } else {
            // Call the done function with an error
            done(Error('Not enough seats available'));
        }
    });
});

// Listen on port 1245
app.listen(1245);
