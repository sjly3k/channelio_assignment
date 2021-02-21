import React from 'react';
import {Country} from "../modules/countries";
import styled from 'styled-components';

interface IProps {
    country : Country,
    deleteCountry : any;
}

const CountryItem = ({ country, deleteCountry } : IProps) => {

    const { name, alpha2Code, callingCodes, capital, region } = country;
    const key = name + capital + region
    return (
        <CountryItemBlock key={key}>
            <div className="country-list">
                <div className="name"><strong>국가명</strong> : {name}</div>
                <div className="name"><strong>국가코드</strong> : {
                    alpha2Code ? (<span> {alpha2Code}</span>) : (<span> 없음</span>)
                }
                </div>
                <div className="name"><strong>수도</strong> : {
                    capital ? (<span> {capital}</span>) : (<span> 없음</span>)
                }
                </div>
                <div className="name"><strong>지역</strong> : {
                    region ? (<span> {region}</span>) : (<span> 없음</span>)
                }
                </div>
                <div className={"name"}><strong>지역코드</strong> :
                    {
                        callingCodes.map(code => {
                            if (!code) {
                                return <span key={`${name}-${code}`}> 없음</span>
                            } else return (<span key={`${name}-${code}`}> '{code}' </span>)
                        })
                    }
                </div>
            </div>
            <div className={"country-btn"} onClick={() => deleteCountry(country)}>
                <div className={"btn-delete"}>국가 삭제</div>
            </div>
        </CountryItemBlock>
    );
};


const CountryItemBlock = styled.div`
  flex: 0 0 22%;
  cursor: pointer;
  padding : 10px;

  @media (max-width: 768px) {
    flex: 0 0 44%;
  }
  
  @media (max-width: 375px) {
    flex: 0 0 95%;
  }
  
  margin-bottom: 10px;
  border: 1px solid gray;
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
    strong {
      font-weight: bold;
    }
  }

  .country-btn {
    display: flex;
    justify-content: space-evenly;
    padding : 10px;
    background-color: lightsalmon;
    color : white;
    font-weight: bold;
  }
`;

export default CountryItem;
