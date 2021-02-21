import {ActionType} from "typesafe-actions";
import * as actions from "./actions";

export interface Country {
    name : string,
    alpha2Code: string,
    callingCodes: string[],
    capital : string,
    region : string
}

export type firstFilterType = "name" | "alpha2Code" | "callingCodes" | "capital" | "region"
export type secondFilterType = "DESC" | "ASC"
export type CountriesActions = ActionType<typeof actions>

export interface CountriesState {
    firstFilter : firstFilterType,
    secondFilter : secondFilterType,
    countries : Country[],
    error : string | null
}
