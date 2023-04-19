import { FilterValuesType } from "../../App"
import {ChangeEvent, useState, KeyboardEvent} from "react";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title:string)=> void
    changeTaskStatus: (taskId: string, isDone:boolean) => void
}
export function Todolist(props: PropsType) {
    let [title, setTitle]= useState("")
    const addTask = ()=>{
        if (title.trim() === ""){
            return;
        }
        props.addTask(title);
        setTitle("");
    }
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const onNewTitleChangeHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>)=>{
        if (e.ctrlKey && e.charCode === 13){
            props.addTask(newTaskTitle)
            setNewTaskTitle("");
        }
    }

    const onAllClickHandler = ()=> props.changeFilter("all");
    const onActiveClickHandler = ()=> props.changeFilter("active");
    const onCompletedClickHandler = ()=> props.changeFilter("сompleted");


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
                <ul>
                    {
                        props.tasks.map(t => {
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked);
                            }
                            const onRemoveHandler= () => {
                                props.removeTasks(t.id)
                            }
                            return <li key={t.id}><input type="checkbox"
                                                         onChange={onChangeHandler}
                                                         checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        })
                    }

                </ul>
                <div>
                    <button onClick={onAllClickHandler}>All</button>
                    <button onClick={onActiveClickHandler}>Active</button>
                    <button onClick={onCompletedClickHandler}>Completed</button>
                </div>
            </div>
        </div>
    )
}
