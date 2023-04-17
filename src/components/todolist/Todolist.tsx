export type TasksType = {
    id: number
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTasks: Function
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
                        props.tasks.map((t) => <li><input type="checkbox" checked={t.isDone} />
                            <span>{t.title}</span>
                            <button onClick={() => { props.removeTasks(t.id) }}>x</button>
                        </li>
                        )
                    }

                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    )
}