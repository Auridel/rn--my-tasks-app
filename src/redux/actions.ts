import {Dispatch} from "redux";
import Service from "../Service";
import {plainToClass} from "class-transformer";
import {CategoryClass, Todos} from "../classTransformer/classes";

interface check {
    item: Todos,
    checked: boolean
}

const GET_DATA = () => {
    return async (dispatch: Dispatch) => {
        try {
            const res = await Service.getData();
            const data = plainToClass(CategoryClass, res);

            dispatch({
                type: "GET_DATA",
                payload: data
            })
        }catch (e) {
            console.log(e)
        }
    }
}

const CHECK_TODO = ({item, checked}: check) => {
    return async (dispatch: Dispatch) => {
        try {
            const res = await Service.updateTodo(item.text, item.listId, item.id, checked);

            dispatch({
                type: "CHECK_TODO",
                payload: {item, checked}
            })
        }catch (e) {
           console.log(e);
        }
    }
}

export {
    GET_DATA,
    CHECK_TODO
}