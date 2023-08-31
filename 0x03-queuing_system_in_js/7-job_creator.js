import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

// Create jobs
const jobs = [
    {
      phoneNumber: '4153518780',
      message: 'This is the code 1234 to verify your account'
    },
    {
      phoneNumber: '4153518781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4153518743',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4153538781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4153118782',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4153718781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4159518782',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4158718781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4153818782',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4154318781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4151218782',
      message: 'This is the code 4321 to verify your account'
    }
];

// Iterate over each job data
for (const jobData of jobs) {
    // Create a new job with the object
    const job = queue.create('push_notification_code_2', jobData);
    // If the job is created successfully, log the id
    job.on('enqueue', () => console.log(`Notification job created: ${job.id}`));
    // If the job is completed, log the completion message
    job.on('complete', () => console.log(`Notification job ${job.id} completed`));
    // If the job fails, log the error message
    job.on('failed', (err) => console.log(`Notification job ${job.id} failed: ${err}`));
    // If the job is progressing, log the progress
    job.on('progress', (progress) => console.log(`Notification job ${job.id} ${progress}% complete`));
    // Save the job
    job.save();
}
