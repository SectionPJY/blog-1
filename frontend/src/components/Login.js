import React from 'react';
import Responsive from './common/Responsive';
import {Logo, Input, Button} from './common/Form';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Wrapper = styled(Responsive)`
    width: 320px;
    form {
        text-align : center;
    }
`

const Login = () => {
    return (
        <Wrapper>
            <Logo>
                Blog
            </Logo>
            <form className='form' onSubmit={() => {alert(1)}}>
                <div>
                    <Input type="text" placeholder="아이디" />
                </div>
                <div>
                    <Input type="password" placeholder="비밀번호" />
                </div>
                <Button>
                    로그인
                </Button>
            </form>
            <div style={{"textAlign" : "right"}}>
                <Link to="/find"><strong>아이디/비밀번호 찾기 </strong></Link>
                <Link to="/register"><strong>회원가입</strong></Link>
            </div>
        </Wrapper>
    );
}

export default Login;