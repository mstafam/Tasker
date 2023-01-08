import React, { useEffect} from "react";
import NavbarComp from "../components/navbar.js";
import Column from "../components/tasks.js";
import { DragDropContext } from "@hello-pangea/dnd";
import "../styles/tasks.css"
import { useTasksContext } from "../hooks/useTasksContext"

export default function Tasks() {
    const {tasks, dispatch} = useTasksContext()

    useEffect(() => {
        const getTasks = async () => {
            const response = await fetch('http://localhost:8080/tasks')
            const json = await response.json()
    
            if(response.ok) {
                dispatch({type:'GET_TASKS', payload: json})
            }
        }
        getTasks()
    }, [dispatch])

    const updateTask = async (_id, column) => {
        const data = { column }
        
        const response = await fetch(`http://localhost:8080/tasks/${_id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })

        const json = await response.json()

        if(!response.ok) {
            console.log(json.error)
        }

        if (response.ok) {
            console.log(json)
        }
    }

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if(!destination) {
            return;
        }

        if ( source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        const startColumn = tasks.columns[source.droppableId];
        const endColumn = tasks.columns[destination.droppableId];

        if (startColumn === endColumn) {
            const newTaskIds = Array.from(startColumn.taskIds); 
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
    
            const newColumn = {
                ...startColumn,
                taskIds: newTaskIds
            };
    
            const newState = {
                ...tasks,
                columns: {
                    ...tasks.columns,
                    [newColumn._id]: newColumn
                }
            }
            // This doesnt get updated on the server, since tasks dont have an index.
            dispatch({type:'GET_TASKS', payload: newState})
            return;
        }

        const startTaskIds = Array.from(startColumn.taskIds);
        startTaskIds.splice(source.index, 1)
        const newStartColumn = {
            ...startColumn,
            taskIds: startTaskIds
        }

        const endTaskIds = Array.from(endColumn.taskIds);
        endTaskIds.splice(destination.index, 0, draggableId)
        const newEndColumn = {
            ...endColumn,
            taskIds: endTaskIds
        }

        const newState = {
            ...tasks,
            columns: {
                ...tasks.columns,
                [newStartColumn._id]: newStartColumn,
                [newEndColumn._id] : newEndColumn
            }
        }

        updateTask(draggableId, endColumn.title)
        dispatch({type:'GET_TASKS', payload: newState})
        return;
    }

    return(
        <>
        <div className="tasks">
            <NavbarComp />
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="Page_Container">
                    {tasks && tasks.columnOrder.map(columnId => {
                        const column = tasks.columns[columnId];
                        const Tasks = column.taskIds.map(taskId => tasks.tasks[taskId]);
                        return <Column key={column._id} column={column} tasks={Tasks} />
                    })}
                </div>
            </DragDropContext>
        </div>
        </>
    )
}