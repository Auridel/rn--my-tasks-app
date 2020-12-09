import {Dispatch} from "redux";
import Service from "../Service";
import {plainToClass} from "class-transformer";
import {CategoryClass, Todos} from "../classTransformer/classes";

interface Check {
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

const ADD_TODO = (text: string, category: string, checked: false) => {
    return async (dispatch: Dispatch) => {
        try {
            const res = await Service.addTodo(text, category, checked);
            const item = plainToClass(Todos, res);

            dispatch({
                type: "ADD_TODO",
                payload: item
            })
        }catch (e) {
            console.log(e)
        }
    }
}

const CHECK_TODO = ({item, checked}: Check) => {
    return async (dispatch: Dispatch) => {
        try {
            await Service.updateTodo(item.text, item.listId, item.id, checked);

            dispatch({
                type: "CHECK_TODO",
                payload: {item, checked}
            })
        }catch (e) {
           console.log(e);
        }
    }
}

const UPDATE_TODO = (text: string, listId: string, todo: Todos) => {
    return async (dispatch: Dispatch) => {
        try {
            if(todo.listId.toString() !== listId){
                await Service.deleteTodo(todo.listId, todo.id);
                const res = await Service.addTodo(text, listId, false);
                const item = plainToClass(Todos, res);
                dispatch({
                    type: "ADD_TODO",
                    payload: item
                })
                dispatch({
                    type: "REMOVE_TODO",
                    payload: {item: todo}
                })
            }else {
                await Service.updateTodo(text, listId, todo.id, todo.checked);
                dispatch({
                    type: "EDIT_TODO",
                    payload: {...todo, text}
                })
            }
        }catch (e) {
            console.log(e);
        }
    }
}
const DELETE_TODO = (todo: Todos) => {
    return async (dispatch: Dispatch) => {
        try {
            await Service.deleteTodo(todo.listId, todo.id);
            dispatch({
                type: "REMOVE_TODO",
                payload: {item: todo}
            })
        }catch (e) {
            console.log(e);
        }
    }
}

const ADD_LIST = (title: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const res = await Service.addList(title);
            const list = plainToClass(CategoryClass, res);
            dispatch({
                type: "ADD_LIST",
                payload: list
            })
        }catch (e) {
            console.log(e);
        }
    }
}

const DELETE_LIST = (id: number | string) => {
    return async (dispatch: Dispatch) => {
        try {
            await Service.deleteList(id);

            dispatch({
                type: "DELETE_LIST",
                payload: id
            })
        }catch (e) {
            console.log(e);
        }
    }
}

const EDIT_LIST = (title: string, id: string | number) => {
    return async (dispatch: Dispatch) => {
        try {
            await Service.editList(title, id);

            dispatch({
                type: "EDIT_LIST",
                payload: {id, title}
            })
        }catch (e) {
            console.log(e);
        }
    }
}







export {
    GET_DATA,
    ADD_TODO,
    CHECK_TODO,
    UPDATE_TODO,
    DELETE_TODO,
    ADD_LIST,
    DELETE_LIST,
    EDIT_LIST
}