function createPushNotificationsJobs(jobs, queue) {
    // Check if jobs is an array
    if (!Array.isArray(jobs)) {
        throw Error('Jobs is not an array');
    }
    // Iterate over jobs
    for (const job of jobs) {
        // Create a queue for each job
        const jobQueue = queue.create('push_notification_code_3', job);
        // Handle created queue
        jobQueue.on('enqueue', () => console.log(`Notification job created: ${jobQueue.id}`));
        // Handle completed queue
        jobQueue.on('complete', () => console.log(`Notification job ${jobQueue.id} completed`));
        // Handle failed queue
        jobQueue.on('failed', (err) => console.log(`Notification job ${jobQueue.id} failed: ${err}`));
        // Handle progress queue
        jobQueue.on('progress', (progress) => console.log(`Notification job ${jobQueue.id} ${progress}% complete`));
        // Save queue
        jobQueue.save();
    }
}

// Export function
export default createPushNotificationsJobs;
