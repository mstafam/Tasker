const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Task schema
const taskSchema = new Schema({
    content: {
        type: String,
        required: true,
        maxLength: 110
    },
    category: {
        type: String,
        required: true,
        select: ["Home", "Work", "Personal", "Health"]
    },
    priority: {
        type: Number,
        required: true,
        select: [1, 2, 3]
    },
    column: {
        type: String,
        required: true,
        select: ["To Do", "In Progress", "Completed"]
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Task', taskSchema)