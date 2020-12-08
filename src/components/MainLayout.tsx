import React, {FC, useState} from "react";
import TaskScreen from "../screens/TaskScreen";
import MainScreen from "../screens/MainScreen";

const MainLayout: FC = () => {
    const [taskId, setTaskId] = useState<null | number>(1);

    if(taskId) return <TaskScreen/>

    return <MainScreen/>

}

export default MainLayout;