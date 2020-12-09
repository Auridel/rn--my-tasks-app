import {State, Action} from "../types";
import {classToClass} from "class-transformer";
import {findTodo} from "../utils";

const initialState: State = {
    loading: true,
    error: false,
    data: []
}

const reducer = (state = initialState, action: Action): State => {
    switch (action.type) {
        case "GET_DATA": {
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        }
        case "ADD_TODO": {
            const data = classToClass(state.data, {ignoreDecorators: true});
            const item = action.payload;
            const list = data.find(el => el.id === item.listId);
            if(list) list.todos = [...list.todos, item];
            return {
                ...state,
                data
            }
        }
        case "REMOVE_TODO": {
            const data = classToClass(state.data, {ignoreDecorators: true});
            const {item} = action.payload;
            const list = data.find(el => el.id === item.listId);
            if(list) list.todos = list.todos.filter(todo => todo.id.toString() !== item.id.toString());
            return {
                ...state,
                data
            }
        }
        case "EDIT_TODO": {
            const data = classToClass(state.data, {ignoreDecorators: true});
            const item = action.payload;
            const todo = findTodo(item.listId, item.id, data);
            if(todo) todo.text = item.text;
            return {
                ...state,
                data
            }
        }
        case "CHECK_TODO": {
            const data = classToClass(state.data, {ignoreDecorators: true});
            const {item, checked} = action.payload;
            const todo = findTodo(item.listId, item.id, data);
            if(todo) todo.checked = checked;
            return {
                ...state,
                data
            }
        }

        case "ADD_LIST": {
            const list = action.payload;
            list.todos = [];
            return {
                ...state,
                data: [...state.data, list]
            }
        }
        case "DELETE_LIST": {
            const data = classToClass(state.data, {ignoreDecorators: true});
            const id = action.payload;
            return {
                ...state,
                data: data.filter(el => el.id.toString() !== id.toString())
            }
        }
        case "EDIT_LIST": {
            const data = classToClass(state.data, {ignoreDecorators: true});
            const {id, title} = action.payload;
            const list = data.find(el => el.id.toString() === id.toString());
            if(list) list.title = title;
            return {
                ...state,
                data
            }
        }
        default: return state;
    }

}

export default reducer;