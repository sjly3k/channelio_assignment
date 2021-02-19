import {ThunkAction} from "redux-thunk";
import { toast } from "react-toastify";
import {finishLoadingAction, startLoadingAction} from "../loading";
import { getCountries } from "src/libs/apis";
import {GET_COUNTRIES, getCountriesActions} from "./actions";

export function getCountriesActionsThunk() : ThunkAction<any, any, any, any> {
    return async dispatch => {
        const { request, success, failure } = getCountriesActions;
        dispatch(startLoadingAction(GET_COUNTRIES));
        dispatch(request())
        try {
            const data = await getCountries();
            dispatch(success(data))
            toast.success("나라 정보를 가져오는데 성공하였습니다.")
        } catch (e) {
            dispatch(failure(e))
            toast.error("나라 정보를 가져오는데 실패하였습니다")
        }
        dispatch(finishLoadingAction(GET_COUNTRIES));
    }
}
