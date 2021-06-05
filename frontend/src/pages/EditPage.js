import React from 'react';
import styled from 'styled-components';
import HeaderContainer from '../containers/common/HeaderContainer';
import Responsive from '../components/common/Responsive';
import EditContainer from '../containers/EditContainer';

const Wrapper = styled(Responsive)`
    
`

const EditPage = () => {    
    return (
        <Wrapper>
           <HeaderContainer />
           <EditContainer />
        </Wrapper>
    )
}

export default EditPage;