export default class Service {
    static async getData(){
        return await req("http://mobile-dev.oblakogroup.ru/candidate/olegefimov/list", "GET");
    }
    static async addList(title: string){
        return await req("http://mobile-dev.oblakogroup.ru/candidate/olegefimov/list", "POST", {title})
    }
    static async deleteList(id: number | string){
        return await req(`http://mobile-dev.oblakogroup.ru/candidate/olegefimov/list/${id}`, "DELETE")
    }
    static async editList(title: string, id: number | string){
        return await req(`http://mobile-dev.oblakogroup.ru/candidate/olegefimov/list/${id}`, "PATCH", {title})
    }
    static async addTodo(text: string, id: number | string, checked: boolean){
        return await req(`http://mobile-dev.oblakogroup.ru/candidate/olegefimov/list/${id}/todo`,
            "POST", {text, checked})
    }
    static async deleteTodo(listId: number, todoId: number){
        return await req(`http://mobile-dev.oblakogroup.ru/candidate/olegefimov/list/${listId}/todo/${todoId}`, "DELETE")
    }
    static async updateTodo(text: string, listId: number | string, todoId: number, checked: boolean) {
        return await req(`http://mobile-dev.oblakogroup.ru/candidate/olegefimov/list/${listId}/todo/${todoId}`,
            "PATCH", {text, checked});
    }
}


async function req(url: string, method: string, data?: object) {
    const config: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json"
        }
    }
    if(data) config.body = JSON.stringify(data);

    const res = await fetch(url, config);

    if(res.status !== 200) throw new Error()
    if(method === "POST" || method === "GET") return await res.json();
}