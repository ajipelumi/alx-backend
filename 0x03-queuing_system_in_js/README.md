## Queuing System in JS

This repository contains the code and resources for learning about queuing systems in JavaScript.

### Topics Covered

- **Node Redis** - We learnt about Node Redis and how to use it to implement a queuing system in JavaScript.

- **Kue** - We learnt about Kue and how to use it to implement a queuing system in JavaScript.

- **Bull** - We learnt about Bull and how to use it to implement a queuing system in JavaScript.

### Code Snippets
```javascript
const redis = require('redis');
const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});
```

### Resources

- [Node Redis Documentation](https://github.com/redis/node-redis)
- [Kue Documentation](https://github.com/Automattic/kue)