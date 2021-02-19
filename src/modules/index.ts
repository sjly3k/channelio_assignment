import {combineReducers} from "redux";
import search from "./search";
import countries from "./countries";
import loading from "./loading";
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    search,
    countries,
    loading,
    form : formReducer
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
