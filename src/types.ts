import {CategoryClass} from "./classTransformer/classes";


export interface State {
    loading: boolean,
    error: boolean,
    data: CategoryClass[] | []
}
export interface Action {
    type: string,
    payload?: any
}