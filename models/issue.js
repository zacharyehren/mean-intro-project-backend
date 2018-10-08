// stores issue data in the db

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Issue = new Schema({
    title: {
        type: String
    },
    responsible: {
        type: String
    },
    description: {
        type: String
    },
    severity: {
        type: String
    },
    status: {
        type: String,
        default: 'Open'
    }
});

// creates model out of schema, names model Issue and assigns it to the Issue schema
export default mongoose.model('Issue', Issue);