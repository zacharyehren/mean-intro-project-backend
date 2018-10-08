// node.js express server
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Issue from './models/Issue';

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

// endpoint to receive issues in json format
router.route('/issues').get((req, res) => {
    // utilizes Issue model
    Issue.find((err, issues) => {
        if (err) 
            console.log(err);
        else 
            res.json(issues);
    });
});

// endpoint to find specific issue identified by :id 
router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err) 
            console.log(err);
        else 
            res.json(issue);
    });
});

// endpoint to create a new issue
router.route('/issues/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added Successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

// endpoint to update an issue
router.route('/issues/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (!issue)
            return next(new Error('Could not load document'));
        else {
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;

            issue.save().then(issue => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

// endpoint to delete an issue
router.route('/issues/delete/:id').get((req, res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if (err)
            res.json(err);
        else 
            res.json('Removed successfully');
    })
})


// connects the default URL to the router
app.use('/', router);

// creates a port at 4000
app.listen(4000, () => console.log("Express server running on port 4000"));