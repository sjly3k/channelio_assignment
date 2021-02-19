import React from 'react';
import styled from "styled-components";
import Responsive from "../components/Responsive";
import CountryItemList from "../components/CountryItemList";

const CountryListPageBlock = styled(Responsive)`

`

const CountryListItemPage = () => {
    return (
        <CountryListPageBlock>
            <CountryItemList/>
        </CountryListPageBlock>
    );
};

export default CountryListItemPage;
