import React, { useState } from "react";
import NavbarComp from "../components/navbar.js";
import Column from "../components/tasks.js";
import { DragDropContext } from "@hello-pangea/dnd";
import TaskManagerData from "../taskData";
import "../styles/tasks.css"

// Add Dragdrop context here, either in a div, the reaminader of the body, or the entier page comp.
export default function Tasks() {
    const [state, setState] = useState(TaskManagerData);

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if(!destination) {
            return;
        }

        if ( source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        const startColumn = state.columns[source.droppableId];
        const endColumn = state.columns[destination.droppableId];

        if (startColumn === endColumn) {
            const newTaskIds = Array.from(startColumn.taskIds); //This doesnt mutate the existing state, but makes a new object, 
            //I probs want to update the state, and set the newstate as the state, and post the new state to the db.
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
    
            const newColumn = {
                ...startColumn,
                taskIds: newTaskIds
            };
    
            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn
                }
            }
    
            setState(newState);
            return;
            //Update the server here, do a post with the JSON, update the DB. Do a get request of the JSON everytime the page loads.
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
            ...state,
            columns: {
                ...state.columns,
                [newStartColumn.id]: newStartColumn,
                [newEndColumn.id] : newEndColumn
            }
        }

        setState(newState);
        return;
    }

    return(
        <>
        <div className="tasks">
            <NavbarComp />
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="Page_Container">
                    {state.columnOrder.map(columnId => {
                        const column = state.columns[columnId];
                        const tasks = column.taskIds.map(taskId => state.tasks[taskId]);
                        return <Column key={column.id} column={column} tasks={tasks} />
                    })}
                </div>
            </DragDropContext>
        </div>
        </>
    )
}