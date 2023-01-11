import React, { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd"
import "../styles/tasks.css"
import addButton from "../assets/addButton.png"
import deleteButton from "../assets/delete.png"
import closeIcon from "../assets/close.png"
import Alert from 'react-bootstrap/Alert';
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

function Category(props) {
    if(props.Category === "Home") {
        return (
           <div className="homeCategory">Home</div>
        )   
    } else if (props.Category === "Work") {
        return (
            <div className="workCategory">Work</div>
        )
    } else if (props.Category === "Health") {
        return (
            <div className="healthCategory">Health</div>
        )
    } else if (props.Category === "Personal") {
        return (
            <div className="personalCategory">Personal</div>
        )
    }
}

function Task(props) {
    const { dispatch } = useTasksContext()
    const {user} = useAuthContext()

    const DeleteTask = async (taskId) => {

        if(!user) {
            return
        }

        const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
            headers: { 'Authorization': `Bearer ${user.token}`},
            method: "DELETE"
        })

        const json = await response.json()

        if (!response.ok) {
            console.log(json.error)
        }
        if (response.ok) {
            fetch('http://localhost:8080/tasks', {
                headers: { 'Authorization': `Bearer ${user.token}`}
            })
            .then(res => res.json())
            .then(json => {dispatch({type:'GET_TASKS', payload: json})})
        }
    }

    return (
        <Draggable draggableId={props.task._id} index={props.index}>
            {(provided, snapshot) => (
                <div className="Task_Container" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <span className="custom_taskContent">{props.task.content}</span>
                    <div className="category-delete">
                        <Category Category={props.task.category} />
                        <input  type="image" src={deleteButton} width="23" onClick={() => {DeleteTask(props.task._id)}} alt="Add Task Button" className="deleteTaskButton"></input>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default function Column(props) {
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('Home')
    const [priority, setPriority] = useState(1)
    const [column, setColumn] = useState('To Do')
    const [modal, setModal] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const { dispatch } = useTasksContext()
    const { user } = useAuthContext()

    const toggleModal = () => {
        setModal(!modal)
        setSuccess(null)
        setError(null)
    }

    const addTaskFormSubmit = async (e) => {
        e.preventDefault();

        if(!user) {
            setError('You must be logged in')
            return
        }

        const task = {content, category, priority, column}

        const response = await fetch('http://localhost:8080/tasks', {
            method: "POST",
            headers: {"Content-Type": "application/json", 'Authorization': `Bearer ${user.token}`},
            body: JSON.stringify(task)
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setSuccess(null)
        }
        if (response.ok) {
            setContent('')
            setCategory('Home')
            setPriority(1)
            setColumn('To Do')
            setError(null)
            setSuccess("New Task Added!")
            setTimeout(toggleModal, 500)
            fetch('http://localhost:8080/tasks', {
                headers: { 'Authorization': `Bearer ${user.token}`}
            })
            .then(res => res.json())
            .then(json => {dispatch({type:'GET_TASKS', payload: json})})
        }
    }

    return (
        <>
        <div className="full-page"></div>
        {modal && (
                <div className="form-modal">
                    <div className="modal-header">
                        <h3>Add a New Task</h3>
                        <input  type="image" src={closeIcon} width="25" onClick={toggleModal} alt="Close Modal" className="custom_cancel"></input>
                    </div>
                    <form className="taskForm" onSubmit={addTaskFormSubmit} id="addTaskForm">
                    <label className="form-label">Content (Max 110 chars)</label>
                    <input className="content-input" maxLength="110" type="text" onChange={(e) => setContent(e.target.value)} value={content} required/>
                    <label className="form-label">Category</label>
                    <select name="category" onChange={(e) => setCategory(e.target.value)} value={category} required>
                        <option value="Home">Home</option>
                        <option value="Health">Health</option>
                        <option value="Personal">Personal</option>
                        <option value="Work">Work</option>
                    </select>
                    <label className="form-label">Priority</label>
                    <select name="priority" onChange={(e) => setPriority(e.target.value)} value={priority} required>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <label className="form-label">Column</label>
                    <select name="column" onChange={(e) => setColumn(e.target.value)} value={column} required>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <div className="button_div">
                    <button type="submit" className="custom_add">Add Task</button>
                    </div>
                    {error && <Alert variant="danger"><div>{error}</div></Alert>}
                    {success && <Alert variant="success"><div>{success}</div></Alert>}
                </form>
            </div>
            )}
        <div className="Column_Container">
            <div className="Column_Title">
                <h3 className="Column_Header">{props.column.title}</h3>
                <input  type="image" src={addButton} width="30" onClick={toggleModal} alt="Add Task Button" className="addTaskButton"></input>
            </div>
            <Droppable droppableId={props.column._id}>
                {(provided, snapshot) => (
                    <div className="TaskList" ref={provided.innerRef} {...provided.droppableProps}>
                        {props.tasks.map((task, index) => <Task key={task._id} task={task} index={index}/>)}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
        </>
    )
}