const express = require('express');
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()
router.use(requireAuth)
const { getTasks, createTask, deleteTask, updateTask } = require('../controllers/taskController')

router.get('/', getTasks)

router.delete('/:id', deleteTask)

router.post('/', createTask)

router.patch('/:id', updateTask)

module.exports = router