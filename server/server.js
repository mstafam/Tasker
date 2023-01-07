require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
PORT = process.env.PORT
const app = express();

const tasks = require('./routes/tasks')
const userRoute = require('./routes/user')

app.use(cors());
app.use(express.json())
app.use('/user', userRoute)
app.use('/tasks', tasks)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error:"))

app.listen(
    PORT,
    () => console.log(`Connected on port ${PORT}`)
)