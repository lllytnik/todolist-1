import { FilterValuesType } from "../../App"

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTasks: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}
export function Todolist(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>+</button>
                <ul>
                    {
                        props.tasks.map(t => <li><input type="checkbox" checked={t.isDone} />
                            <span>{t.title}</span>
                            <button onClick={() => { props.removeTasks(t.id) }}>x</button>
                        </li>
                        )
                    }

                </ul>
                <div>
                    <button onClick={() => { props.changeFilter("all") }}>All</button>
                    <button onClick={() => { props.changeFilter("active") }}>Active</button>
                    <button onClick={() => { props.changeFilter("сompleted") }}>Completed</button>
                </div>
            </div>
        </div>
    )
}
