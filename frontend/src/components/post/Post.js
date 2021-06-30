import React, {useRef, useEffect} from 'react';
import Responsive from '../common/Responsive';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Wrapper = styled(Responsive)`
    border-bottom: 1px solid #DADADA;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
    font-family: 'Cute Font', cursive;
    padding-top: 1rem;
    padding-bottom: 1rem;

    .left {
        width: 60%;
        line-height: 2rem;
    }

    .right {
        width: 40%;
    }
`
const Content = styled.div`
    margin-bottom: 1rem;
    line-height: 1.5rem;
    font-family: 'Noto Sans KR', sans-serif;
    height: 6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;

`

const Post = ({post}) => {
    return (
        <Wrapper>
            <Link to={"/post/"+post.id}>
                <Header>
                    <div className='left'>
                         {post.title}
                    </div>
                    <div className='right'>
                        글쓴이 : {post.author} <br /> 
                        글쓴 시간 : {post.create_time}
                    </div>
                </Header>
                <Content dangerouslySetInnerHTML={{__html : post.content}} />
            </Link>    
        </Wrapper>
    )
}

export default Post;