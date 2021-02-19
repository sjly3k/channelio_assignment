import React from 'react';
import styled from 'styled-components';
import AddCountryForm from "./AddCountryForm";
import {useCountryItemActions} from "../hooks/useCountryItemActions";
import {toast} from "react-toastify";
import {Country} from "../modules/countries";

const CountryItemActions = () => {

    const { onToggleFilter, onAddCountry } = useCountryItemActions();

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

    return (
        <CountryItemActionsBlock>
            <AddCountryForm onSubmit={handleOnSubmit}/>
        </CountryItemActionsBlock>
    );
};

const CountryItemActionsBlock = styled.div`
  display: flex;
  padding: 30px 0;
  align-items: center;
  .scrap-text {
    margin-left: 6px;
  }
`;

export default CountryItemActions;
