import React, {FC, useState} from "react";
import TaskScreen from "../screens/TaskScreen";
import MainScreen from "../screens/MainScreen";

const MainLayout: FC = () => {
    const [taskId, setTaskId] = useState<null | number>(null);

    if(taskId) return <TaskScreen/>

    return <MainScreen/>

}

export default MainLayout;