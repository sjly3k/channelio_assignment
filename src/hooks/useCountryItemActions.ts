import { useCallback } from "react";
import {useDispatch, useSelector} from "react-redux";

import {
  toggleButtonAction, addCountryAction
} from "../modules/countries/actions";
import {Country, firstFilterType, secondFilterType} from "../modules/countries/types";

import { toast } from "react-toastify";
import {RootState} from "../modules";
import {changeSearchTermAction} from "../modules/search";

export function useCountryItemActions() {
  const dispatch = useDispatch();
  const { countries : {firstFilter, secondFilter, countries}, search } = useSelector((state : RootState) => state);
  const onToggleFilter = useCallback((filterName : string, filterValue : firstFilterType | secondFilterType) => {
    return dispatch(toggleButtonAction(filterName, filterValue));
  }, [dispatch]);

  const onAddCountry = useCallback((country : Country) => {
    dispatch(addCountryAction(country));
    toast.info("국가를 추가했습니다.");
  }, [dispatch]);

  const onChangeSearchTerm = useCallback((searchTerm : string) => {
    return dispatch(changeSearchTermAction(searchTerm));
  }, [dispatch]);

  return {
    countries,
    firstFilter,
    secondFilter,
    search,
    onToggleFilter,
    onAddCountry,
    onChangeSearchTerm
  };
}
