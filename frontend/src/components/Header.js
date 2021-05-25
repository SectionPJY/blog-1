import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Responsive from './common/Responsive';
import {GrInstagram, GrFacebook} from 'react-icons/gr';
import {RiKakaoTalkFill} from 'react-icons/ri';

const Wrapper = styled(Responsive)`
    width: 100%;
    height: 8rem;
    border-bottom: 1px solid gray;
    display: flex;
    justify-content: space-around;
    & > div {
        line-height: 8rem;
    }
`;

const Left = styled.div`
    top: -10px;
    position: relative;
    font-size: 3rem;
    padding-bottom: 1rem;
    font-family: 'KoHo', sans-serif;
`

const Middle = styled.div`
    @media screen and (max-width: 767px) {
        display: none;
    }

    font-size: 2rem;
    & > span {
        padding: 1rem;
    }
`

const Right = styled.div`
    & > span {
        padding: 1rem;
    }
`

const Header = ({match, location, history}) => {
    return (
        <Wrapper>
            <Left>
                <span>Blog</span>
            </Left>
            <Middle>
                <span>
                    <a target="_blank" href="https://www.instagram.com">
                        <GrInstagram />
                    </a>
                </span>
                <span>
                    <a target="_blank" href="https://facebook.com">
                        <GrFacebook />
                    </a>
                </span>
                <span>
                    <a target="_blank" href="https://www.kakaocorp.com/">
                        <RiKakaoTalkFill />
                    </a>
                </span>
            </Middle>
            <Right>
                <span>
                    <Link to="/login">로그인</Link>
                </span>
                <span>
                    <Link to="/register">회원가입</Link>
                </span>
                <span>메뉴</span>
            </Right>
        </Wrapper>
    )
}

export default Header;