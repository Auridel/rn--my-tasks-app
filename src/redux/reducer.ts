import {Data} from "../types";

interface State {
    loading: boolean,
    error: boolean,
    data: Data | null
}
interface Action {
    type: string
}

const initialState: State = {
    loading: true,
    error: false,
    data: null
}

const reducer = (state = initialState, action: Action): State => {
    return state;
}

export default reducer;