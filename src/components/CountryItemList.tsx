import React, {useEffect, useRef, useState} from 'react';
import { useCountryItemList } from '../hooks/useCountryItemList';
import CountryItem from "./CountryItem";
import styled from 'styled-components';
import { Country } from 'src/modules/countries';
import uniq from "lodash/uniq"
import useInfiniteScroll from "../hooks/useIntersectionObserver";

const CountryItemList = () => {

    const {countries : {
        firstFilter, secondFilter, countries, currentLength, isLastPage
    },
        search : {searchTerm}, loading, onGetCountries, onDeleteCountry
    } = useCountryItemList();
    const [searchedCountries, setSearchedCountries] = useState([] as Country[]);

    const targetRef = useRef(null);


    useEffect(() => {
        onGetCountries(currentLength);
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
        searching = uniq(searching);
        setSearchedCountries(searching)
    }, [searchTerm])

    useInfiniteScroll({
        target : targetRef.current,
        threshold : 0.5,
        // @ts-ignore
        onIntersect: ([{ isIntersecting }]) => {
            if (isIntersecting && !loading && !isLastPage) {
                onGetCountries(currentLength);
            }
        }
    });


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
                    sortCountries(countries).map((country : Country) => <CountryItem key={country.name} country={country} deleteCountry={onDeleteCountry}/>)
                )
            }
            {/* 페이지 끝을 감시하기 위한 빈 div */}
            <div className={"empty-div"} ref={targetRef} />
        </CountryListBlock>
    );
};

const CountryListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  
  .empty-div {
    width: 100%;
    height : 10px;
  }
`;

const EmptyBlock = styled.div`
  width: 100%;
  text-align: center;
  padding: 80px 0;
  line-height: 2;
`;

export default CountryItemList;
