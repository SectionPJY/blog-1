import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Logo, Input, Button, Select} from '../common/Form';
import Responsive from '../common/Responsive';

const Wrapper = styled(Responsive)`
    width: 320px;
    font-family: 'Cute Font', cursive;
    font-size: 1.5rem;
    text-align: center;
`

const Register = ({username, password, passwordCheck, tel, gender, birth, onChange, onSubmit}) => {
    return (
        <Wrapper>
            <Logo>
                Blog
            </Logo>
            <form onSubmit={onSubmit}>
                <Input type="text" placeholder="아이디를 입력해주세요." 
                    name="username" value={username}
                    onChange={onChange} required/>
                <Input type="password" placeholder="비밀번호를 입력해주세요." 
                    name="password" value={password}
                    onChange={onChange} required/>
                <Input type="password" placeholder="비밀번호를 다시 입력해주세요." 
                    name="passwordCheck" value={passwordCheck}
                    onChange={onChange} required/>
                <Input type="tel" placeholder="핸드폰 번호를 입력해주세요." 
                    name="tel" value={tel}
                    onChange={onChange} required/>
                <Select name='gender' onChange={onChange}>
                    <option value="male">남자</option>
                    <option value="female">여자</option>
                    <option value="other">그 외</option>
                </Select>
                <Input type="date"  
                    name="birth" value={birth}
                    onChange={onChange} required/>
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