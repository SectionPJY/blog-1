import React from 'react';
import styled from 'styled-components';
import HeaderContainer from '../containers/HeaderContainer';
import Responsive from '../components/common/Responsive';

const Wrapper = styled(Responsive)`
    
`

const MainPage = () => {    
    return (
        <Wrapper>
           <HeaderContainer />
        </Wrapper>
    )
}

export default MainPage;