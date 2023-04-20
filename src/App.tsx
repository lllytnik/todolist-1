import React, { useState } from 'react';
import './App.css';
import { Todolist } from './components/todolist/Todolist';
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "сompleted";
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
function App() {

    function removeTasks(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistId] = filteredTasks;
        setTasks({ ...tasksObj });
    }
    function addTask(title: string, todolistId: string) {
        let newTask = { id: v1(), title: title, isDone: false }
        let tasks = tasksObj[todolistId];
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({ ...tasksObj });
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({ ...tasksObj });
        }

    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }
    let todolistId1 = v1();
    let todolistId2 = v1();


    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        { id: todolistId1, title: 'What to learn', filter: "active" },
        { id: todolistId2, title: 'What to boy', filter: "сompleted" }
    ]);

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId);
        setTodolists(filteredTodolist);
        delete tasksObj[todolistId];
        setTasks({ ...tasksObj });
    }

    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'React', isDone: false },
            { id: v1(), title: 'Redux', isDone: false }
        ],
        [todolistId2]: [
            { id: v1(), title: 'Book', isDone: true },
            { id: v1(), title: 'Milk', isDone: true }
        ]
    });

    return (
        <div className="App" >
            {
                todolists.map((tl) => {
                    let taskForTodolist = tasksObj[tl.id];
                    if (tl.filter === "сompleted") {
                        taskForTodolist = taskForTodolist.filter(t => t.isDone === true);
                    }
                    if (tl.filter === "active") {
                        taskForTodolist = taskForTodolist.filter(t => t.isDone === false);
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        addTask={addTask}
                        tasks={taskForTodolist}
                        removeTasks={removeTasks}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }



        </div>
    );
}


export default App;
