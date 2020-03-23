const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

const quizSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    puntuation: {
        type: Number,
    },
    questions: [{
        type: ObjectId,
        ref: 'Question'
    }],
    },{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;