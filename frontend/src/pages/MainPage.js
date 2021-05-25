import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Responsive from '../components/common/Responsive';

const Wrapper = styled(Responsive)`
    width: 100%;
`

const MainPage = () => {
    return (
        <Wrapper>
           <Header />
        </Wrapper>
    )
}

export default MainPage;