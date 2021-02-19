import { useCallback } from "react"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import {
    GET_COUNTRIES, toggleButtonAction, addCountryAction
} from "../modules/countries/actions";
import {Country} from "../modules/countries/types";

import { toast } from "react-toastify";

export function useCountryItemActions() {
    const dispatch = useDispatch();

    const onToggleFilter = useCallback(() => {
        return dispatch(toggleButtonAction())
    }, [dispatch])

    const onAddCountry = useCallback((country : Country) => {
        dispatch(addCountryAction(country))
        toast.info("국가를 추가했습니다.")
    }, [dispatch])

    return {
        onToggleFilter,
        onAddCountry,
    }
};
