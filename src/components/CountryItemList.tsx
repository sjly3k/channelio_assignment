import React, {useEffect, useState} from 'react';
import { useCountryItemList } from '../hooks/useCountryItemList';
import CountryItem from "./CountryItem";
import styled from 'styled-components';
import { Country } from 'src/modules/countries';
import _ from "lodash"

const CountryItemList = () => {

    const {countries : {
        firstFilter, secondFilter, countries
    },
        search : {searchTerm}, loading, onGetCountries, onDeleteCountry
    } = useCountryItemList();
    const [searchedCountries, setSearchedCountries] = useState([] as Country[]);
    const [currentLength, setCurrentLength] = useState(30);


    useEffect(() => {
        onGetCountries();
    }, [])

    useEffect(() => {
        let searching = [] as any;
        for (const str of ["name", "alpha2Code", "region", "callingCodes", "capital"]) {
            // @ts-ignore
            if (str === "callingCodes") {
                const filtering = countries.filter((country : Country) => {
                    const findCode = country.callingCodes.filter(code => {
                        return code.indexOf(searchTerm) > 0 || code === searchTerm;
                    })
                    return findCode.length > 0
                })
                searching = searching.concat(filtering)
            } else {
                // @ts-ignore
                const filtering = countries.filter((country : Country) => country[str].toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0)
                searching = searching.concat(filtering)
            }
        }
        searching = _.uniq(searching);
        setSearchedCountries(searching)
    }, [searchTerm])

    useEffect(() => {
        function infiniteScroll() {
            let scrollHeight = document.documentElement.scrollHeight;
            let scrollTop = document.documentElement.scrollTop;
            let clientHeight = document.documentElement.clientHeight;

            if (scrollTop + clientHeight >= scrollHeight  && currentLength <= countries.length) {
                setCurrentLength(currentLength + 30);
            }
        }

        window.addEventListener("scroll", infiniteScroll);
        return () => {
            window.removeEventListener("scroll", infiniteScroll)
        }
    })

    const sortCountries = (countries : Country[]) => {
        if (secondFilter === "DESC")
            return ( countries.sort((a, b) => {
                if (firstFilter === "callingCodes" && !(isNaN(Number(a["callingCodes"][0])) || isNaN(Number(b["callingCodes"][0])))) {
                    // @ts-ignore
                    return a["callingCodes"][0] - b["callingCodes"][0]
                } else {
                    if (a[firstFilter] > b[firstFilter]) return 1
                    else if (a[firstFilter] === b[firstFilter]) return 0
                    else return -1;
                }
            }))
        else
            return ( countries.sort((a, b) => {
                if (firstFilter === "callingCodes" && !(isNaN(Number(a["callingCodes"][0])) || isNaN(Number(b["callingCodes"][0])))) {
                    // @ts-ignore
                    return b["callingCodes"][0] - a["callingCodes"][0]
                } else {
                    if (a[firstFilter] > b[firstFilter]) return -1
                    else if (a[firstFilter] === b[firstFilter]) return 0
                    else return 1;
                }
        }))
    }

    return (
        <CountryListBlock>
            {!loading && countries.length === 0 ?
                (
                <EmptyBlock>
                    나라가 로딩중입니다.
                </EmptyBlock>
            ) : searchTerm.length > 0 ?
                    (
                    sortCountries(searchedCountries).map((country : Country) => <CountryItem key={country.name} country={country} deleteCountry={onDeleteCountry}/>)
                )
            : (
                    sortCountries(countries).slice(0, currentLength).map((country : Country) => <CountryItem key={country.name} country={country} deleteCountry={onDeleteCountry}/>)
                )
            }
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
