const Task = require('../models/taskModel')
const mongoose = require('mongoose')


// GET all tasks
const getTasks = async (req, res) => {
    const tasks = await Task.find({}).sort({priority: 1})

    const TaskObject = {
        tasks: {},
        columns: {
            'c1' : { _id : "c1", title : "To Do", taskIds: []},
            'c2' : { _id : "c2", title : "In Progress", taskIds: []},
            'c3' : { _id : "c3", title : "Completed", taskIds: []},
        },
        columnOrder : ["c1", "c2", "c3"]
    }

    tasks.map(task => {
        TaskObject.tasks[task._id] = task
        if(task.column === "To Do") {
            TaskObject.columns['c1'].taskIds.push(task._id)
        } else if (task.column == "In Progress") {
            TaskObject.columns['c2'].taskIds.push(task._id)
        } else if (task.column == "Completed") {
            TaskObject.columns['c3'].taskIds.push(task._id)
        }
    })

    res.status(200).json(TaskObject)
}

// DELETE a task
const deleteTask = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: `Task with id ${id} does not exist`})
    }

    const task = await Task.findOneAndDelete({_id: id})

    if(!task) {
        return res.status(400).json({error: `Task with id ${id} does not exist`})
    }

    res.status(200).json(task)
}

// POST a task
const createTask = async (req, res) => {
    const { content, category, priority, column } = req.body

    try {
        const task = await Task.create({ content, category, priority, column})
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// PATCH a task
const updateTask = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: `Task with id ${id} does not exist`})
    }

    const task = await Task.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!task) {
        return res.status(400).json({error: `Task with id ${id} does not exist`})
    }

    res.status(200).json(task)
}

module.exports = { getTasks, deleteTask, createTask, updateTask }