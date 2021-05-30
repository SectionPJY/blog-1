import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Logo, Input, Button} from './common/Form';
import Responsive from './common/Responsive';

const Wrapper = styled(Responsive)`
    width: 320px;
    font-family: 'Cute Font', cursive;
    font-size: 1.5rem;
    text-align: center;
`

const Register = ({username, password, passwordCheck, onChange, onSubmit}) => {
    return (
        <Wrapper>
            <Logo>
                Blog
            </Logo>
            <form onSubmit={onSubmit}>
                <Input type="text" placeholder="아이디를 입력해주세요." 
                    name="username" value={username}
                    onChange={onChange}/>
                <Input type="password" placeholder="비밀번호를 입력해주세요." 
                    name="password" value={password}
                    onChange={onChange}/>
                <Input type="password" placeholder="비밀번호를 다시 입력해주세요." 
                    name="passwordCheck" value={passwordCheck}
                    onChange={onChange}/>
                <Button>회원가입</Button>
            </form>
            <div style={{"textAlign" : "right"}}>
                <Link to="/find"><strong>아이디/비밀번호 찾기 </strong></Link>
                <strong> | </strong>
                <Link to="/login"><strong>로그인</strong></Link>
            </div>
        </Wrapper>
    )
}

export default Register;