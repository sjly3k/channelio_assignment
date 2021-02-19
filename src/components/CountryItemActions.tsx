import React from 'react';
import styled from 'styled-components';
import AddCountryForm from "./AddCountryForm";
import {useCountryItemActions} from "../hooks/useCountryItemActions";
import {toast} from "react-toastify";
import {Country} from "../modules/countries";

const CountryItemActions = () => {

    const { onToggleFilter, onAddCountry, type, search } = useCountryItemActions();

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
        console.log(formData)
    }

    const handleOnToggleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onToggleFilter(value);
    }

    return (
        <CountryItemActionsBlock>
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

const FilterAction = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding : 15px;
  border-bottom: 2px solid gray;
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
