// export const를 이용해 Action Type을 생성한다.
// ex) export const GET_CARDS = 'cards/GET_CARDS' as const;

import {createAction} from "typesafe-actions";

export const START_LOADING = 'loading/START_LOADING' as const;
export const FINISH_LOADING = 'loading/FINISH_LOADING' as const;

// createAction을 사용해 Action 실행 함수를 생성한다.
// createAction({Action Type}, {payload})<{return하는 type}>

export const startLoadingAction = createAction(START_LOADING)<string>();
export const finishLoadingAction = createAction(FINISH_LOADING)<string>();

