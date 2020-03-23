const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    posibles: {
        type: Array,
        required: true
    },
    haveFormation: {
        type: String,
        enum: ['countrys', 'teams', 'none']
    },
    formation: String,
    },{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;