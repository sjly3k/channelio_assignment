import * as actions from "./actions";
import {ActionType} from "typesafe-actions";

export type LoadingAction = ActionType<typeof actions>

export type LoadingState = {
    [key : string] : boolean;
}
