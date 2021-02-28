import React, { Suspense } from 'react';
import styled from "styled-components";
import Responsive from "../components/Responsive";

const CountryListPageBlock = styled(Responsive)``

const CountryItemListLazy = React.lazy(() => import('../components/CountryItemList'))
const CountryItemActionsLazy = React.lazy(() => import('../components/CountryItemActions'))

const CountryListItemPage = () => {
    return (
        <Suspense fallback={<div>Loading</div>}>
            <CountryListPageBlock>
                <CountryItemActionsLazy/>
                <CountryItemListLazy/>
            </CountryListPageBlock>
        </Suspense>
    );
};

export default CountryListItemPage;
