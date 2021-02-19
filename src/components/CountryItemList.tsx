import React, {useEffect, useState} from 'react';
import { useCountryItemList } from '../hooks/useCountryItemList';
import CountryItem from "./CountryItem";
import styled from 'styled-components';
import { Country } from 'src/modules/countries';

const CountryItemList = () => {

    const {countries : { type, countries, error }, search : {searchTerm}, loading, onGetCountries, onDeleteCountry } = useCountryItemList();
    const [searchedCountries, setSearchedCountries] = useState([] as Country[]);

    useEffect(() => {
        onGetCountries();
    }, [])

    useEffect(() => {
        const searching = countries.filter((country : Country) => country.name.indexOf(searchTerm) > 0)
        setSearchedCountries(searching)
    }, [searchTerm])

    const sortCountries = (countries : Country[]) => {
        if (type === "DESC")
            return ( countries.sort((a, b) => {
                if (a.name > b.name) return 1
                else if (a.name === b.name) return 0
                else return -1;
            }))
        else
            return ( countries.sort((a, b) => {
            if (a.name > b.name) return -1
            else if (a.name === b.name) return 0
            else return 1;
        }))
    }

    // @ts-ignore
    return (
        <CountryListBlock>
            {!loading && countries.length === 0 ?
                (
                <EmptyBlock>
                    나라가 로딩중입니다.
                </EmptyBlock>
            ) : (
                searchTerm.length > 0 ? (sortCountries(searchedCountries).map((country : Country) => <CountryItem key={country.name} country={country} deleteCountry={onDeleteCountry}/>))
            : (
                    sortCountries(countries).map((country : Country) => <CountryItem key={country.name} country={country} deleteCountry={onDeleteCountry}/>)
                )
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
