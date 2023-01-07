const express = require('express');
const router = express.Router()
const { getTasks, createTask, deleteTask, updateTask } = require('../controllers/taskController')

router.get('/', getTasks)

router.delete('/:id', deleteTask)

router.post('/', createTask)

router.patch('/:id', updateTask)

module.exports = router