import {combineReducers} from "redux";
import search from "./search";
import countries from "./countries";
import loading from "./loading";

const rootReducer = combineReducers({
    search,
    countries,
    loading
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
