import React, {useState, useEffect} from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import {write} from '../../modules/post';
import {useDispatch} from 'react-redux';

const Wrapper = styled.div`
    .ql-container {
        height: 30rem;
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
        button {
            width: 6rem;
            height: 2rem;
            line-height: 2rem;
            margin-left: 1.5rem;
            background-color: rgba(255,255,255,1);
            border: none;
            box-shadow: 5px 4px 4px -2px gray;
        }
    }
`

const Title = styled.input`
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    font-size: 1.5rem;
    padding: 1rem;
    box-sizing: border-box;
    margin-bottom: 1rem;
    border: 1px solid #D3D7D7;
`
const HashtagWrapper = styled.div`
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    overflow: hidden;
    display : flex;
    margin-top: 1rem;
    margin-bottom: 1rem;
    input {
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid gray;
        outline: none;
    }
`

const Hashtag = styled.span`
    cursor: pointer;
    padding: 0 1rem;
`


const PostWrite = ({ onSubmit, title, text, hashtag, hashtags, onChange, onHashtagKeyDown, onHashtagClick }) => {
    const modules = {
        toolbar : [
                [{'header' : [1 , 2, false]}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [
                    {'list' : 'ordered'},
                    {'list' : 'bullet'},
                    {'indent' : '-1'},
                    {'indent' : '+1'}
                ],
                ['image', 'video'],
                ['clean']
        ]
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'image', 'video'
    ]
    return (
        <Wrapper>
            <Title value={title} onChange={(e) => onChange('title', e.target.value)}/>
            <ReactQuill
                value={text}
                modules={modules}
                formats={formats}
                onChange={(v)=>onChange('text', v)}
            />
            <div>
                <HashtagWrapper>
                    해쉬태그 : <input type="text" value={hashtag} 
                        onChange={(e) => onChange('hashtag', e.target.value)} 
                        onKeyDown={onHashtagKeyDown}
                    />
                    {hashtags.map( (h, idx) => (
                        <Hashtag onClick={() => onHashtagClick(idx)}>#{h} </Hashtag>
                    ))}
                </HashtagWrapper>
            </div>
            <div className="buttons">
                <button onClick={() => onChange(text, '')}>취소</button>
                <button onClick={(e) => onSubmit(e)}>완료</button>
            </div>
        </Wrapper>
    )
}

export default PostWrite;