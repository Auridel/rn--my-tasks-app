import {CategoryClass} from "./classTransformer/classes";

export interface Todo {
    id: number,
    text: string,
    list_id: number,
    checked: boolean,
    created_at: string,
    updated_at: string
}

export interface Data {
    id: number,
    title: string,
    candidate_id: number,
    created_at: string,
    updated_at: string,
    todos: Todo[]
}

export interface State {
    loading: boolean,
    error: boolean,
    data: CategoryClass[] | []
}
export interface Action {
    type: string,
    payload?: any
}