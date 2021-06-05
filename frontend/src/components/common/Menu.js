import React, {useState} from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import {Link} from 'react-router-dom';

const Wrapper = styled(Responsive)`
    display: flex;
    height: 1000px;
    font-family: 'KoHo', sans-serif;
    border-top: 1px solid #DCDCDC;
`
const Left = styled.div`
    width: 20%;
    height: 100%;
    background-color: rgba(211,211,211,.5);
`

const Right = styled.div`
    width: 80%;
    background-color: white;
    
    & > ul > li{
        border-bottom: 1px solid gray;
    }
    li {
        font-size: 2rem;
        line-height: 4rem;
    }
    strong {
        cursor: pointer;
    }
`

const Menu = () => {
    const [web, setWeb] = useState(false);
    const [database, setDatabase] = useState(false);
    const [os, setOs] = useState(false);

    return (
        <Wrapper>
            <Left />
            <Right>
                <ul>
                    <li>
                        <strong onClick={() => setWeb(!web)}>WEB</strong>
                        { web && 
                                <ul>
                                    <li><Link to="/web/html">HTML</Link></li>
                                    <li><Link to="/web/stylesheet">CSS&SASS</Link></li>
                                    <li>
                                        <Link to="/web/javascript">JAVASCRIPT</Link>
                                        <ul>
                                            <li><Link to="/web/javascript/vue">VUE</Link></li>
                                            <li><Link to="/web/javascript/react">REACT</Link></li>
                                            <li><Link to="/web/javascript/nodejs">NODE.JS</Link></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link to="/web/php">PHP</Link>
                                    </li>
                                </ul>
                        }
                    </li>
                    <li>
                        <strong onClick={() => setDatabase(!database)}>DATABASE</strong>
                        { database &&
                            <ul>
                                <li>
                                    <Link to="/database/mysql">MYSQL</Link>
                                </li>
                                <li>
                                    <Link to="/database/mongodb">MONGODB</Link>
                                </li>
                            </ul>
                        }
                    </li>
                    <li>
                        <strong onClick={() => setOs(!os)}>OS</strong>
                        { os && 
                            <ul>
                                <li>
                                    <Link to="/os/linux">LINUX</Link>
                                </li>
                                <li>
                                    <Link to="/os/windows">WINDOWS</Link>
                                </li>
                            </ul>
                        }
                    </li>
                </ul>
                
            </Right>
        </Wrapper>
    )
}

export default Menu;