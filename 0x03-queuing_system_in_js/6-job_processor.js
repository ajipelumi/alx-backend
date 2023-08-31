import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

// Handle the sendNotification job
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process the sendNotification job
queue.process('push_notification_code', (job, done) => {
    // Destructure the job data
    const { phoneNumber, message } = job.data;
    // Call the sendNotification function
    sendNotification(phoneNumber, message);
    // Call the done callback
    done();
});
