import * as actions from "./actions";
import {ActionType} from "typesafe-actions";

// 액션들을 모아주고, store에 저장할 값에 대한 내부 타입을 지정해준다.

export type LoadingAction = ActionType<typeof actions>

export type LoadingState = {
    [key : string] : boolean;
}