import React from 'react';
import './App.css';
import { TasksType, Todolist } from './components/todolist/Todolist';

function App() {
    let tasks: Array<TasksType> = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'React', isDone: false },
        { id: 4, title: 'Redux', isDone: false }
    ]
    function removeTasks(id: number) {
        tasks = tasks.filter(t => t.id !== t.id)
    }
    return (
        <div className="App">
            <Todolist title={'What to learn'} removeTasks={removeTasks} tasks={tasks} />
        </div>
    );
}


export default App;
