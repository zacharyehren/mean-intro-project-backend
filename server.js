// node.js express server

import express from 'express';

const app = express();

// default route
app.get('/', (req, res) => res.send("Hello World!"));
// creates a port at 4000
app.listen(4000, () => console.log("Express server running on port 4000"));