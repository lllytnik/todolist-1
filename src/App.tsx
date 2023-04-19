import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './components/todolist/Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all"  | "active" | "сompleted";

function App() {

    let [tasks, setTasks] = useState([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'React', isDone: false },
        { id: v1(), title: 'Redux', isDone: false }
    ]);
    let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTasks(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }
    function addTask(title:string){
        let newTask = {
            id: v1(),
            title: title,
            isDone: false }
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }
    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let taskForTodolist = tasks;
    if (filter === "сompleted") {
        taskForTodolist = tasks.filter(t => t.isDone === true);
    }
    if (filter === "active") {
        taskForTodolist = tasks.filter(t => t.isDone === false);
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'} addTask={addTask} tasks={taskForTodolist} removeTasks={removeTasks} changeFilter={changeFilter} />
        </div>
    );
}


export default App;
