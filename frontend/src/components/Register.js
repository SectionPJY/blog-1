import React from 'react';
import styled from 'styled-components';
import {Logo, Input, Button} from './common/Form';
import Responsive from './common/Responsive';

const Wrapper = styled(Responsive)`
    width: 320px;
    text-align: center;
`

const Register = () => {
    return (
        <Wrapper>
            <Logo>
                Blog
            </Logo>
            <form>
                <Input type="text" placeholder="아이디를 입력해주세요."/>
                <Input type="password" placeholder="비밀번호를 입력해주세요."/>
                <Input type="password" placeholder="비밀번호를 다시 입력해주세요."/>
                <Button>회원가입</Button>
            </form>
        </Wrapper>
    )
}

export default Register;