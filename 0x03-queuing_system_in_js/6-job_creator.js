import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

// Create an object with the job data
const jobData = {
    phoneNumber: '2348095678685',
    message: 'This is a test message'
};

// Create a new job with the object
const job = queue.create('push_notification_code', jobData);

// If the job is created successfully, log the id
job.on('enqueue', () => console.log(`Notification job created: ${job.id}`));

// If the job fails, log the error message
job.on('failed', (err) => console.log('Notification job failed'));

// If the job is completed, log the completion message
job.on('complete', () => console.log('Notification job completed'));

// Save the job
job.save();
