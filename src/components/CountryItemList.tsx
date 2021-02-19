import React, {useEffect} from 'react';
import { useCountryItemList } from '../hooks/useCountryItemList';
import CountryItem from "./CountryItem";
import styled from 'styled-components';
import { Country } from 'src/modules/countries';

const CountryItemList = () => {

    const {countries : { type, countries, error }, search, loading, onGetCountries, onDeleteCountry } = useCountryItemList();

    useEffect(() => {
        onGetCountries();
    }, [])

    return (
        <CountryListBlock>
            {!loading && countries.length === 0 ? (
                <EmptyBlock>
                    나라가 로딩중입니다.
                </EmptyBlock>
            ) : (
                countries.map((country : Country) => <CountryItem key={country.name} country={country} deleteCountry={onDeleteCountry}/>)
            )}
        </CountryListBlock>
    );
};

const CountryListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
`;

const EmptyBlock = styled.div`
  width: 100%;
  text-align: center;
  padding: 80px 0;
  line-height: 2;
`;

export default CountryItemList;
