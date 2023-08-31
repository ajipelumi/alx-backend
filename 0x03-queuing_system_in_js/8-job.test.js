import { expect } from "chai";
import kue from "kue";
import createPushNotificationsJobs from "./8-job";

// Create queue
const queue = kue.createQueue();

describe("createPushNotificationsJobs", () => {
    // Before the tests, enter the test mode
    before(() => {
        queue.testMode.enter();
    });

    // After each test, clear the queue
    afterEach(() => {
        queue.testMode.clear();
    });

    // After the tests, exit the test mode
    after(() => {
        queue.testMode.exit();
    });


    it("display a error message if jobs is not an array", () => {
        // Initialize a (string) non-array
        const list = "hello";
        // Expect the function to throw an error
        expect(() => createPushNotificationsJobs(list, queue)).to.throw("Jobs is not an array");
    });
    
    it("create two new jobs to the queue", () => {
        const list = [
            {
                phoneNumber: "4153518780",
                message: "This is the code 1234 to verify your account",
            },
            {
                phoneNumber: "4153518781",
                message: "This is the code 4562 to verify your account",
            },
        ];
        // Call the function
        createPushNotificationsJobs(list, queue);
        // Expect the queue to have two jobs
        expect(queue.testMode.jobs.length).to.equal(2);
        // Get the type and data of the first job
        const firstJob = queue.testMode.jobs[0];
        // Expect the type to be push_notification_code_3
        expect(firstJob.type).to.equal("push_notification_code_3");
        // Expect the data to be the first element of the list
        expect(firstJob.data).to.eql(list[0]);
        // Get the type and data of the second job
        const secondJob = queue.testMode.jobs[1];
        // Expect the type to be push_notification_code_3
        expect(secondJob.type).to.equal("push_notification_code_3");
        // Expect the data to be the second element of the list
        expect(secondJob.data).to.eql(list[1]);
    });
});
