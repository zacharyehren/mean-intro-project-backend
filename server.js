// node.js express server
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

// connects to the mongodb database instance
mongoose.connect('');

const connection = mongoose.connection;

// an event listener on the opening of the connection to the db
connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});

// connects the default URL to the router
app.use('/', router);

// creates a port at 4000
app.listen(4000, () => console.log("Express server running on port 4000"));