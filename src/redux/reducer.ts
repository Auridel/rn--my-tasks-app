import {State, Action} from "../types";
import {classToClass} from "class-transformer";

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
        case "CHECK_TODO": {
            const data = classToClass(state.data, {ignoreDecorators: true});
            const {item, checked} = action.payload;
            const list = data.find(el => el.id.toString() === item.listId.toString());
                if(list) {
                    const todo = list.todos.find(todo => todo.id.toString() === item.id.toString());
                    if(todo) todo.checked = checked;
                }
            return {
                ...state,
                data: [...data]
            }
        }
        default: return state;
    }
}

export default reducer;