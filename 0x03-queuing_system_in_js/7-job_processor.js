import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

// Create array of blacklisted phone numbers
const blacklistedPhoneNumbers = ['4153518780', '4153518781'];

// Handle sending a notification
function sendNotification(phoneNumber, message, job, done) {
    const total = 100;
    job.progress(0, total);
    if (blacklistedPhoneNumbers.includes(phoneNumber)) {
        return done(Error(`Phone number ${phoneNumber} is blacklisted`));
    }
    job.progress(50, total);
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    done();
}

// Process jobs
queue.process('push_notification_code_2', 2, (job, done) => {
    const { phoneNumber, message } = job.data;
    sendNotification(phoneNumber, message, job, done);
});
