import React, {useEffect, useState} from 'react';
import Responsive from '../../components/common/Responsive';
import Post from '../../components/post/Post';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import { list } from '../../modules/post';

const Wrapper = styled(Responsive)`
    border-bottom: 1px solid #DADADA;
`

const PostListContainer = () => {
    const dispatch = useDispatch();
    const {posts} = useSelector(({post}) => ({
        posts : post.posts
    }))

    useEffect(() => {
        let formData = new FormData();
        formData.append('page', 1);

        dispatch(list(formData));
    }, [dispatch])

    return (
        <Wrapper>
            {
                posts !== [] && posts.map( (post, index) => (
                    <Post key={index} post={post} />
            ))
            }
        </Wrapper>
    )
}

export default PostListContainer;