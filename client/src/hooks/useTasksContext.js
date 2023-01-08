import { TaskContext } from "../taskContext"
import { useContext } from "react"

export const useTasksContext = () => {
    const context = useContext(TaskContext)

    if(!context) {
        throw Error("useTaskContext must be used inside an TaskContextProvider")
    }

    return context
}