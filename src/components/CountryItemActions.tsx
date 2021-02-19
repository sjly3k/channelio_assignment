import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import AddCountryForm from "./AddCountryForm";
import {useCountryItemActions} from "../hooks/useCountryItemActions";
import {toast} from "react-toastify";
import {Country} from "../modules/countries";
import _ from "lodash";

const CountryItemActions = () => {

    const { onToggleFilter, onAddCountry, onChangeSearchTerm, type, search } = useCountryItemActions();
    const [searchTerm, setSearchTerm] = useState("");

    const updateCountries = () => {
        onChangeSearchTerm(searchTerm);
    }

    const delayedQueryCall = useCallback(
        _.debounce(updateCountries, 1000), [searchTerm])

    const handleInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchTerm(value)
    }

    useEffect(() => {
        // deps 배열 비어 있으면 componentDidMount
        // deps 배열 차 있으면 렌더링 시마다 변경된 state 중 deps에 들어가 있는 것이 있는지 확인
        delayedQueryCall();
        // 이전 debounce 호출을 취소 (componentWillUnmount)
        return delayedQueryCall.cancel;
    }, [delayedQueryCall])

    const handleOnSubmit = (formData : any) => {
        if(!formData.name || !formData.alpha2Code || !formData.callingCodes || !formData.capital || !formData.region) {
            toast.info("모든 칸에 입력해주세요.")
        } else {
            const newCountry : Country = {
                name : formData.name,
                alpha2Code : formData.alpha2Code,
                callingCodes : formData.callingCodes.split(",").map((code : string) => code.replace(" ", "")),
                capital : formData.capital,
                region : formData.region
            }
            onAddCountry(newCountry);
        }
    }

    const handleOnToggleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onToggleFilter(value);
    }

    return (
        <CountryItemActionsBlock>
            <SearchAction>
                <input
                    className={"search"}
                    value={searchTerm}
                    onChange={(e) => handleInput(e)}
                    placeholder={"국가명으로 검색해보세요."}
                />
            </SearchAction>
            <FilterAction>
                <div className={"filter"}>
                    <input type={"radio"}
                           name={"filter"}
                           onChange={(event) => handleOnToggleFilter(event)}
                           value={"ASC"}
                           checked={type === "ASC"}
                    />
                    <span className={"text"}>내림차순</span>
                </div>
                <div className={"filter"}>
                    <input
                        type={"radio"}
                        name={"filter"}
                        onChange={(event) => handleOnToggleFilter(event)}
                        value={"DESC"}
                        checked={type === "DESC"}
                    />
                    <span className={"text"}>오름차순</span>
                </div>
            </FilterAction>
            <AddCountryForm onSubmit={handleOnSubmit}/>
        </CountryItemActionsBlock>
    );
};

const CountryItemActionsBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  align-items: center;
  .scrap-text {
    margin-left: 6px;
  }
`;
const SearchAction = styled.div`
  display: flex;
  padding : 15px;
  border-bottom: 2px solid gray;
  width: 100%;
  justify-content: center;
  
  input.search {
    width: 100%;
  }
`

const FilterAction = styled(SearchAction)`
  .filter {
    :first-child {
      margin-right: 16px;
    }
  }
  span.text {
    margin-left: 4px;
  }
`

export default CountryItemActions;
