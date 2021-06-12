import React from 'react';
import styled from 'styled-components';
import HeaderContainer from '../containers/common/HeaderContainer';
import Responsive from '../components/common/Responsive';
import PostListContainer from '../containers/post/PostListContainer';

const Wrapper = styled(Responsive)`
    
`

const MainPage = () => {    
    return (
        <Wrapper>
           <HeaderContainer />
           <PostListContainer />
        </Wrapper>
    )
}

export default MainPage;