import React from 'react';
import styled from 'styled-components';
import Responsive from '../components/common/Responsive';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostWriteContainer from '../containers/post/PostWriteContainer';

const Wrapper = styled(Responsive)`
    
`

const PostWritePage = () => {
    return (
        <Wrapper>
            <HeaderContainer />
            <PostWriteContainer />
        </Wrapper>
    )
}

export default PostWritePage;