import {ThunkAction} from "redux-thunk";
import {finishLoadingAction, startLoadingAction} from "../loading";
import { getCountries } from "../../libs/apis";
import {GET_COUNTRIES, getCountriesActions} from "./actions";

export function getCountriesActionsThunk() : ThunkAction<any, any, any, any> {

  return async dispatch => {
    const { request, success, failure } = getCountriesActions;
    dispatch(startLoadingAction(GET_COUNTRIES));
    dispatch(request());
    try {
      const { data } = await getCountries();
      dispatch(success(data));
    } catch (e) {
      dispatch(failure(e));
    }
    dispatch(finishLoadingAction(GET_COUNTRIES));
  };
}
