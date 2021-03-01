import {createAction, createAsyncAction} from "typesafe-actions";
import {AxiosError} from "axios";
import {Country, firstFilterType, secondFilterType} from "../countries";

export const GET_COUNTRIES = 'countries/GET_COUNTRIES' as const;
export const GET_COUNTRIES_SUCCESS ='countries/GET_COUNTRIES_SUCCESS' as const;
export const GET_COUNTRIES_FAILURE ='countries/GET_COUNTRIES_FAILURE' as const;

export const ADD_COUNTRY = 'countries/ADD_COUNTRY' as const;
export const DELETE_COUNTRY = 'countries/DELETE_COUNTRY' as const;
export const TOGGLE_BUTTON = 'countries/TOGGLE_BUTTON' as const;

export const getCountriesActions = createAsyncAction(
  GET_COUNTRIES,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_FAILURE,
)<undefined, Country[], AxiosError>();

export const toggleButtonAction = createAction(
  TOGGLE_BUTTON
)<string, firstFilterType | secondFilterType>();

export const addCountryAction = createAction(
  ADD_COUNTRY
)<Country>();

export const deleteCountryAction = createAction(
  DELETE_COUNTRY
)<Country>();
