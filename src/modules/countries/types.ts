import {ActionType} from "typesafe-actions";
import * as actions from "./actions";

export interface Country {
    name : string,
    alpha2Code: string,
    callingCodes: string[],
    capital : string,
    region : string
}

export type toggleType = "DESC" | "ASC"

export type CountriesActions = ActionType<typeof actions>

export interface CountriesState {
    type : toggleType,
    countries : Country[],
    error : string | null
}
