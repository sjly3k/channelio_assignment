// 초기상태를 정의해준다.

import {LoadingAction, LoadingState} from "./types";
import {createReducer} from "typesafe-actions";
import {FINISH_LOADING, START_LOADING} from "./actions";

const initialState : LoadingState = {};

const loading = createReducer<LoadingState, LoadingAction>(initialState, {
    [START_LOADING] : (state, { payload }) => ({
        ...state,
        [payload] : true
    }),
    [FINISH_LOADING] : (state, {payload}) => ({
        ...state,
        [payload] : false
    })
})

export default loading;