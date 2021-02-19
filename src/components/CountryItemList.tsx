import React, {useEffect} from 'react';
import { useCountryListSearch } from '../hooks/useCountryListSearch';

const CountryItemList = () => {

    const { countries, search, onGetCountries, onAddCountry, onDeleteCountry, onToggleFilter } = useCountryListSearch();

    useEffect(() => {
        onGetCountries();
    }, [])

    return (
        <div>
            CountryItemList
        </div>
    );
};

export default CountryItemList;
