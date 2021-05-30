import React from 'react';
import styled from 'styled-components';
import RegisterContainer from '../containers/auth/RegisterContainer';

const Wrapper = styled.div`

`

const RegisterPage = () => {
    return (
        <Wrapper>
            <RegisterContainer/>
        </Wrapper>
    )
}

export default RegisterPage;