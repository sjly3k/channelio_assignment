import {createAction} from "typesafe-actions";

export const START_LOADING = 'loading/START_LOADING' as const;
export const FINISH_LOADING = 'loading/FINISH_LOADING' as const;

export const startLoadingAction = createAction(START_LOADING)<string>();
export const finishLoadingAction = createAction(FINISH_LOADING)<string>();

