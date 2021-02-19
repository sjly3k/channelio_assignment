import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import {useCallback} from "react";
import {
    Country,
    deleteCountryAction, GET_COUNTRIES,
    getCountriesActionsThunk,
} from "../modules/countries";
import { toast } from "react-toastify";

export function useCountryItemList() {
    const dispatch = useDispatch();
    const { countries, search, loading } = useSelector((state : RootState) => ({
        ...state,
        loading : state.loading[GET_COUNTRIES]
    }));

    const onGetCountries = useCallback(() => {
        return dispatch(getCountriesActionsThunk())
    }, [dispatch])

    const onDeleteCountry = useCallback((country : Country) => {
        dispatch(deleteCountryAction(country))
        toast.info("국가를 삭제했습니다.")
    }, [dispatch])

    return {
        countries,
        search,
        loading,
        onGetCountries,
        onDeleteCountry,
    }
};
