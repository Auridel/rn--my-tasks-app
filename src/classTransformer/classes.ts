import {Exclude, Expose, Type} from "class-transformer";
import 'reflect-metadata';

export class Todos {
    id: number;

    text: string;

    @Expose({name: "list_id"})
    @Type(() => Number)
    listId: number

    checked: boolean;

    @Exclude
    created_at: string;

    @Exclude
    updated_at: string;

}

export class CategoryClass {
    id: number;
    title: string;

    @Exclude
    created_at: string;

    @Exclude
    updated_at: string;

    @Exclude
    candidate_id: number;

    @Type(() => Todos)
    todos: Todos[];

}