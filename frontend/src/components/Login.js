import React from 'react';
import Responsive from './common/Responsive';
import styled from 'styled-components';

const Wrapper = styled(Responsive)`
    .login {
        border: 1px solid black;
    }
`

const Logo = styled.div`
    color : #4EE1D7;
    height: 200px;
    font-family: 'KoHo', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 6rem;
`

const LoginForm = styled.form`
    text-align: center;
    div {
        width: 80%;
        margin: 0.5rem auto;
    }
    button {
        width: 80%;
        border: none;
        margin : 0 auto;
        color: white;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #4EE1D7;
    }
    input {
        width: 100%;
        height: 3rem;
        box-sizing: border-box;
    }
`

const Login = () => {
    return (
        <Wrapper>
            <Logo>
                Blog
            </Logo>
            <LoginForm onSubmit={() => {alert(1)}}>
                <div>
                    <input type="text" placeholder="아이디" />
                </div>
                <div>
                    <input type="password" placeholder="비밀번호" />
                </div>
                <button>
                    로그인
                </button>
            </LoginForm>
        </Wrapper>
    );
}

export default Login;