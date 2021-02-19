import { createReducer } from "typesafe-actions";
import {
    ADD_COUNTRY, DELETE_COUNTRY,
    GET_COUNTRIES,
    GET_COUNTRIES_FAILURE,
    GET_COUNTRIES_SUCCESS, TOGGLE_BUTTON,
} from "./actions";
import { CountriesState, CountriesActions, toggleType } from "./types";

const initialState : CountriesState = {
    type : "DESC",
    countries : [],
    error : null
}

const countries = createReducer<CountriesState, CountriesActions>(initialState, {
    [GET_COUNTRIES] : (state) => ({
        ...state,
    }),
    [GET_COUNTRIES_SUCCESS] : (state, { payload }) => {
        return {
            ...state,
            countries : payload,
            error : null
        }
    },
    [GET_COUNTRIES_FAILURE] : (state, { payload }) => ({
        ...state,
        error : payload.message
    }),
    [ADD_COUNTRY] : (state, { payload }) => ({
        ...state,
        countries : state.countries.concat(payload)
    }),
    [TOGGLE_BUTTON] : (state ) => {
        let newType : toggleType;
        if (state.type === "DESC") newType = "ASC";
        else newType = "DESC";

        return {
            ...state,
            type : newType,
        }
    },
    [DELETE_COUNTRY] : (state, { payload }) => ({
        ...state,
        countries : state.countries.filter(country => country.name !== payload.name)
    }),

})

export default countries;
