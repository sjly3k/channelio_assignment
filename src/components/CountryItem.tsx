import React from 'react';
import {Country} from "../modules/countries";
import styled from 'styled-components';

interface IProps {
    country : Country,
    deleteCountry : any;
}

const CountryItem = ({ country, deleteCountry } : IProps) => {

    const { name, alpha2Code, callingCodes, capital, region } = country;
    return (
        <CountryItemBlock>
            <div className="country-list">
                <div className="name">국가명 : {name}</div>
                <div className="name">국가코드 : {alpha2Code}</div>
                <div className="name">수도 : {capital}</div>
                <div className="name">지역 : {region}</div>
                <div className={"name"}>지역코드 :
                    {
                        callingCodes.map(code => <span>{code}</span>)
                    }
                </div>
            </div>
            <div className={"country-btn"} onClick={() => deleteCountry(country)}>
                <div className={"btn-delete"}>삭제</div>
            </div>
        </CountryItemBlock>
    );
};


const CountryItemBlock = styled.div`
  flex: 0 0 22%;
  cursor: pointer;
  padding : 10px;
  
  @media (max-width: 768px) {
    flex: 0 0 50%;
  }
  margin-bottom: 10px;
  border: 1px solid red;
  border-radius: 5px;
  .country-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;
    margin-bottom: 8px;
    line-height: 20px;
    div {
      text-align: center;
    }
  }
  
  .country-btn {
    display: flex;
    justify-content: space-evenly;
    padding : 5px 10px;
    background-color: aquamarine;
    color : gray;
  }
`;

export default CountryItem;
