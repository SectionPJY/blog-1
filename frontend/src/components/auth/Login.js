import React, {useEffect} from 'react';
import Responsive from '../common/Responsive';
import {Logo, Input, Button} from '../common/Form';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Wrapper = styled(Responsive)`
    width: 320px;
    font-family: 'Cute Font', cursive;
    font-size: 1.5rem;
`

const Login = ({id, password, onChange, onSubmit}) => {
    return (
        <Wrapper>
            <Logo>
                Blog
            </Logo>
            <form onSubmit={onSubmit}>
                <div>
                    <Input type="text" placeholder="아이디" 
                        name="id" value={id}
                        onChange={onChange} required/>
                </div>
                <div>
                    <Input type="password" placeholder="비밀번호" 
                        name="password" value={password} 
                        onChange={onChange} required/>
                </div>
                <Button>
                    로그인
                </Button>
            </form>
            <div style={{"textAlign" : "right"}}>
                <Link to="/find"><strong>아이디/비밀번호 찾기</strong></Link>
                <strong> | </strong>
                <Link to="/register"><strong>회원가입</strong></Link>
            </div>
        </Wrapper>
    );
}

export default Login;