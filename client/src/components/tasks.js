import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd"
import "../styles/tasks.css"
import addButton from "../assets/addButton.png"
import deleteButton from "../assets/delete.png"

//To DO
//Add a plus to create a modal, then choose task content, and group, then create task.
//Delete icon on task, deletes task.
//Later
//Change task name by double clicking it.
// Need to use state

function addTask() {
    console.log("added task to: ")
}

function DeleteTask() {
    console.log("deleted task")
}

function Task(props) {
    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {(provided, snapshot) => (
                <div className="Task_Container" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <span className="custom_taskContent">{props.task.content}</span>
                    <input  type="image" src={deleteButton} width="20" onClick={DeleteTask} alt="Add Task Button" className="deleteTaskButton"></input>
                </div>
            )}
        </Draggable>
    )
}

export default function Column(props) {
    return (
        <div className="Column_Container">
            <div className="Column_Title">
                <h3>{props.column.title}</h3>
                <input  type="image" src={addButton} width="30" onClick={addTask} alt="Add Task Button" className="addTaskButton"></input>
            </div>
            <Droppable droppableId={props.column.id}>
                {(provided, snapshot) => (
                    <div className="TaskList" ref={provided.innerRef} {...provided.droppableProps}>
                        {props.tasks.map((task, index) => <Task key={task.id} task={task} index={index}/>)}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}
