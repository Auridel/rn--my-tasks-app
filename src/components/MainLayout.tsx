import React, {FC, useState} from "react";
import TaskScreen from "../screens/TaskScreen";
import MainScreen from "../screens/MainScreen";
import {Todos} from "../classTransformer/classes";


const MainLayout: FC = () => {
    const [task, setTask] = useState<null | Todos>(null);
    const [openEdit, setOpenEdit] = useState(false);

    const openTask = (todo: Todos | null): void => {
        setTask(todo);
    }

    if(task || openEdit) return <TaskScreen openTask={openTask} todo={task} openEdit={setOpenEdit}/>

    return <MainScreen openTask={openTask} openEdit={setOpenEdit}/>

}

export default MainLayout;