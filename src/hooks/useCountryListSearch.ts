import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import {useCallback} from "react";
import {
    addCountryAction,
    Country,
    deleteCountryAction,
    getCountriesActionsThunk,
    toggleButtonAction,
} from "../modules/countries";
import { toast } from "react-toastify";

export function useCountryListSearch() {
    const dispatch = useDispatch();
    const { countries, search } = useSelector((state : RootState) => state);

    const onGetCountries = useCallback(() => {
        return dispatch(getCountriesActionsThunk())
    }, [dispatch])

    const onToggleFilter = useCallback(() => {
        return dispatch(toggleButtonAction())
    }, [dispatch])

    const onDeleteCountry = useCallback((country : Country) => {
        dispatch(deleteCountryAction(country))
        toast.info("국가를 삭제했습니다.")
    }, [dispatch])

    const onAddCountry = useCallback((country : Country) => {
        dispatch(addCountryAction(country))
        toast.info("국가를 추가했습니다.")
    }, [dispatch])

    return {
        countries,
        search,
        onGetCountries,
        onToggleFilter,
        onDeleteCountry,
        onAddCountry,
    }
};
