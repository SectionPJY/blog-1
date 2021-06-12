import React, {useState, useCallback} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Responsive from './Responsive';
import {GrInstagram, GrFacebook} from 'react-icons/gr';
import {RiKakaoTalkFill} from 'react-icons/ri';

const Wrapper = styled(Responsive)`
    width: 100%;
    height: 130px;
    box-shadow: 0 4px 2px -2px gray;
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
`;

const Left = styled.div`
    top: -10px;
    position: relative;
    font-size: 3rem;
    padding-bottom: 1rem;
    font-family: 'KoHo', sans-serif;
    color : #4EE1D7;
    display: flex;
    align-self: center;
`

const Middle = styled.div`
    display: flex;
    align-self: center;
    @media screen and (max-width: 767px) {
        display: none;
    }

    font-size: 2rem;
    & > span {
        padding: 1rem;
    }
`

const Right = styled.div`
    display: flex;
    font-size: 1.5rem;
    font-family: 'Cute Font', cursive;
    & > div {
        padding: 1rem;
        span {
            padding: 1rem;
        }
    }
    display: flex;
    align-self: center;
`

const ProfileWrapper = styled.div`
    position: relative;
    ul {
        top: 50px;
        left: 16px;
        margin: 0;
        padding: 16px;
        min-width: 7rem;
        border: 1px solid black;
        position: absolute;
        text-align: center;
        background-color: white;
        li {
            height: 3rem;
            line-height: 3rem;
        }
    }
`

const Username = styled.div`
    width: 9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-bottom: 1px solid gray;
    text-align: center;
    cursor : pointer;
`

const Header = ({id, username, toggleMenu, logout}) => {
    const [profile, showProfile] = useState(false);
    const ToggleProfile = useCallback(() => {
        showProfile(!profile);
    }, [profile]);

    return (
        <Wrapper>
            <Left>
                <span>Blog</span>
            </Left>
            <Middle>
                <span>
                    <a rel="noreferrer" target="_blank" href="https://www.instagram.com">
                        <GrInstagram />
                    </a>
                </span>
                <span>
                    <a rel="noreferrer" target="_blank" href="https://facebook.com">
                        <GrFacebook />
                    </a>
                </span>
                <span>
                    <a rel="noreferrer" target="_blank" href="https://www.kakaocorp.com/">
                        <RiKakaoTalkFill />
                    </a>
                </span>
            </Middle>
            <Right>
                {username ? 
                    <ProfileWrapper>
                        <Username onClick={ToggleProfile}>
                            {username}
                        </Username>
                        {profile && 
                            <ul>
                                <li>
                                    <Link to={`/${id}`}>마이페이지</Link>
                                </li>
                                <li>
                                    <Link to="manage">관리페이지</Link>
                                </li>
                                <li style={{"cursor" : "pointer"}} onClick={logout}>
                                            로그아웃
                                </li>
                            </ul>
                            }
                    </ProfileWrapper>
                    :
                    <div>
                        <span>
                            <Link to="/login">로그인 </Link>
                        </span>
                        <span>
                            <Link to="/register">회원가입</Link>
                        </span>
                    </div>   
                }
                
                <div 
                    onClick={toggleMenu}
                    style={{"cursor" : "pointer"}}>
                        메뉴
                </div>
            </Right>
        </Wrapper>
    )
}

export default Header;