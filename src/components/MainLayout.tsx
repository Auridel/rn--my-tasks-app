import React, {FC, useState} from "react";
import TaskScreen from "../screens/TaskScreen";
import MainScreen from "../screens/MainScreen";
import {Todos} from "../classTransformer/classes";


const MainLayout: FC = () => {
    const [task, setTask] = useState<null | Todos>(null);

    const openTask = (todo: Todos | null): void => {
        setTask(todo);
    }

    if(task) return <TaskScreen openTask={openTask} todo={task}/>

    return <MainScreen openTask={openTask}/>

}

export default MainLayout;