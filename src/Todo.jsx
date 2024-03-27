import React, { useEffect, useRef, useState } from 'react'
import './Todo.css';
const Todo = () => {
    const [task, setTask] = useState([])
    const data = useRef()
    const sendingData = () => {
        const time = new Date().toLocaleTimeString()
        const date = new Date().toLocaleDateString()
        const taskData = {
            task: data.current.value,
            time: time,
            date: date
        }

        fetch("http://localhost:8001/task"
            , {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
            })
        alert("Task Added")
    }
    useEffect(() => {
        fetch("http://localhost:8001/task")
            .then(res => res.json()
                .then(x => { setTask(x) }))
    }, [task])
    const handleFinish = (id, task) => {
        fetch(`http://localhost:8001/task/${id}`
            , {
                method: 'DELETE'
            })
        alert(`Confirm To Delete ${task}`)
    }
    const handleDuplicate = (duplitask) => {
        const time = new Date().toLocaleTimeString()
        const date = new Date().toLocaleDateString()
        const dupliData = {
            task: duplitask,
            time: time,
            date: date
        }
        fetch("http://localhost:8001/task"
            , {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dupliData)
            })
        alert(`Confirm To Do Duplicate of ${duplitask}`)
    }
    return (
        <div className='t'>
            <div className='task'>
                <h1>TodoList</h1>
                <div className="task1">
                    <input type="text" ref={data} placeholder='Write Todo' />
                    <button onClick={sendingData}>Add</button>
                </div>
                <div className="task2">
                    <h2>All-Task</h2>
                    <div>

                        <table cellSpacing={"17px"} >
                            {task.map((data) =>
                                <>
                                    <tr><th colSpan={4}>{data.task}</th></tr>
                                    <tr>
                                        <td>{data.date}</td>
                                        <td>{data.time}</td>
                                        <td><button onClick={() => handleFinish(data.id, data.task)}>Finish</button></td>
                                        <td><button onClick={() => handleDuplicate(data.task)}>Duplicate</button></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4}><div className="line"></div></td>
                                    </tr>
                                </>
                            )}
                        </table>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Todo
