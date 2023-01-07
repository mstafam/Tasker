import moment from "moment";
//This is where we will fetch the data

const TaskManagerData = {
    tasks : {
        't1' : {id: "t1", content: "Make Food", dateCreated: `${moment().format('YYYY-MM-DD')}`, colour: "White", currentColumn: "To Do"},
        't2' : {id: "t2", content: "Brush Teeth", dateCreated: `${moment().format('YYYY-MM-DD')}`, colour: "White", currentColumn: "To Do"},
        't3' : {id: "t3", content: "Go to the gym", dateCreated: `${moment().format('YYYY-MM-DD')}`, colour: "White", currentColumn: "To Do"},
        't4' : {id: "t4", content: "Push Project", dateCreated: `${moment().format('YYYY-MM-DD')}`, colour: "White", currentColumn: "To Do"},
        't5' : {id: "t5", content: "New 1", dateCreated: `${moment().format('YYYY-MM-DD')}`, colour: "White", currentColumn: "To Do"},
        't6' : {id: "t6", content: "new 2", dateCreated: `${moment().format('YYYY-MM-DD')}`, colour: "White", currentColumn: "To Do"},
        't7' : {id: "t7", content: "new 3", dateCreated: `${moment().format('YYYY-MM-DD')}`, colour: "White", currentColumn: "To Do"},
        't8' : {id: "t8", content: "new 4", dateCreated: `${moment().format('YYYY-MM-DD')}`, colour: "White", currentColumn: "To Do"}
    },
    columns : {
        'c1' : { id : "c1", title : "To Do", taskIds: ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8"]},
        'c2' : { id : "c2", title : "In Progress", taskIds: []},
        'c3' : { id : "c3", title : "Completed", taskIds: []},
    },
    columnOrder : ["c1", "c2", "c3"],
};


export default TaskManagerData;