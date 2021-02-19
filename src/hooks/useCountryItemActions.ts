import { useCallback } from "react"
import {useDispatch, useSelector} from "react-redux";

import {
    toggleButtonAction, addCountryAction, GET_COUNTRIES
} from "../modules/countries/actions";
import {Country, toggleType} from "../modules/countries/types";

import { toast } from "react-toastify";
import {RootState} from "../modules";

export function useCountryItemActions() {
    const dispatch = useDispatch();
    const { countries : {type}, search } = useSelector((state : RootState) => state);
    const onToggleFilter = useCallback((type : string) => {
        return dispatch(toggleButtonAction(type))
    }, [dispatch])

    const onAddCountry = useCallback((country : Country) => {
        dispatch(addCountryAction(country))
        toast.info("국가를 추가했습니다.")
    }, [dispatch])

    return {
        type,
        search,
        onToggleFilter,
        onAddCountry,
    }
};
