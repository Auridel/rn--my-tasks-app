import {CategoryClass, Todos} from "./classTransformer/classes";

export const findTodo = (listId: number, todoId: number, data: CategoryClass[]): Todos | undefined => {
    const list = data.find(el => el.id.toString() === listId.toString());
    if(list) {
        const todo = list.todos.find(todo => todo.id.toString() === todoId.toString());
        return todo;
    }
}