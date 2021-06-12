import React from 'react';
import styled from 'styled-components';
import HeaderContainer from '../containers/common/HeaderContainer';
import Responsive from '../components/common/Responsive';
import PostEditContainer from '../containers/post/PostEditContainer';

const Wrapper = styled(Responsive)`
    
`

const EditPage = () => {    
    return (
        <Wrapper>
           <HeaderContainer />
           <PostEditContainer />
        </Wrapper>
    )
}

export default EditPage;