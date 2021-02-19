import React from 'react';
import styled from "styled-components";
import Responsive from "../components/Responsive";
import CountryItemList from "../components/CountryItemList";
import CountryItemActions from "../components/CountryItemActions";

const CountryListPageBlock = styled(Responsive)`

`

const CountryListItemPage = () => {
    return (
        <CountryListPageBlock>
            <CountryItemActions/>
            <CountryItemList/>
        </CountryListPageBlock>
    );
};

export default CountryListItemPage;
