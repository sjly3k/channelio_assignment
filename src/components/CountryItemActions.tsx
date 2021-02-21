import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import AddCountryForm from "./AddCountryForm";
import {useCountryItemActions} from "../hooks/useCountryItemActions";
import {toast} from "react-toastify";
import {Country} from "../modules/countries";
import _ from "lodash";

const CountryItemActions = () => {

    const { onToggleFilter, onAddCountry, onChangeSearchTerm, firstFilter, secondFilter, search, countries } = useCountryItemActions();
    const [searchTerm, setSearchTerm] = useState("");

    const updateCountries = () => {
        onChangeSearchTerm(searchTerm);
    }

    const delayedQueryCall = useCallback(
        _.debounce(updateCountries, 1000), [searchTerm])

    const handleInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
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
            const findCountry = countries.find((country : Country) => country.name === newCountry.name)
            if (findCountry) toast.error("같은 이름을 가진 국가가 있습니다.")
            else onAddCountry(newCountry);
        }
    }

    const handleOnToggleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        onToggleFilter(e.target.name, e.target.value);
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
                <div className={"firstFilter"}>
                    <div className={"title"}>첫 번째 필터링</div>
                    <div className={"filter"}>
                        <input type={"radio"}
                               name={"firstFilter"}
                               onChange={(event) => handleOnToggleFilter(event)}
                               value={"name"}
                               checked={firstFilter === "name"}
                        />
                        <span className={"text"}>이름순 정렬</span>
                    </div>
                    <div className={"filter"}>
                        <input
                            type={"radio"}
                            name={"firstFilter"}
                            onChange={(event) => handleOnToggleFilter(event)}
                            value={"alpha2Code"}
                            checked={firstFilter === "alpha2Code"}
                        />
                        <span className={"text"}>국가코드순 정렬</span>
                    </div>
                    <div className={"filter"}>
                        <input type={"radio"}
                               name={"firstFilter"}
                               onChange={(event) => handleOnToggleFilter(event)}
                               value={"callingCodes"}
                               checked={firstFilter === "callingCodes"}
                        />
                        <span className={"text"}>지역번호순 정렬</span>
                    </div>
                    <div className={"filter"}>
                        <input type={"radio"}
                               name={"firstFilter"}
                               onChange={(event) => handleOnToggleFilter(event)}
                               value={"capital"}
                               checked={firstFilter === "capital"}
                        />
                        <span className={"text"}>수도순 정렬</span>
                    </div>
                    <div className={"filter"}>
                        <input type={"radio"}
                               name={"firstFilter"}
                               onChange={(event) => handleOnToggleFilter(event)}
                               value={"region"}
                               checked={firstFilter === "region"}
                        />
                        <span className={"text"}>지역순 정렬</span>
                    </div>
                </div>
                <div className={"secondFilter"}>
                    <div className={"title"}>두 번째 필터링</div>
                    <div className={"filter"}>
                        <input type={"radio"}
                               name={"secondFilter"}
                               onChange={(event) => handleOnToggleFilter(event)}
                               value={"ASC"}
                               checked={secondFilter === "ASC"}
                        />
                        <span className={"text"}>내림차순</span>
                    </div>
                    <div className={"filter"}>
                        <input
                            type={"radio"}
                            name={"secondFilter"}
                            onChange={(event) => handleOnToggleFilter(event)}
                            value={"DESC"}
                            checked={secondFilter === "DESC"}
                        />
                        <span className={"text"}>오름차순</span>
                    </div>
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
    line-height: 25px;
  }
  span.text {
    margin-left: 4px;
  }
  
  .firstFilter {
    margin-right: 20px;
  }
  
  .title {
    text-align: center;
    margin-bottom: 10px;
    font-weight: bold;
  }
`

export default CountryItemActions;
