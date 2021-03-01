import {createAction, createReducer} from "typesafe-actions";

export const CHANGE_SEARCH_TERM = 'search/CHANGE_SEARCH_TERM' as const;

export const changeSearchTermAction = createAction(
  CHANGE_SEARCH_TERM
)<string>();

export interface SearchState {
    searchTerm : string,
}

type SearchAction = ReturnType<typeof changeSearchTermAction>

const initialState = {
  searchTerm : ""
};

const search = createReducer<SearchState, SearchAction>(initialState, {
  [CHANGE_SEARCH_TERM] : (state, { payload }) => ({
    ...state,
    searchTerm: payload
  })
});

export default search;
