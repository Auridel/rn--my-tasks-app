export interface Todo {
    id: number,
    text: string,
    list_id: number,
    checked: boolean,
    created_at: Date,
    updated_at: Date
}

export interface Data {
    id: number,
    title: string,
    candidate_id: number,
    created_at: Date,
    updated_at: Date,
    todos: Todo[]
}