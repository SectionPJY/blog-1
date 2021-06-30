import React from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';

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
const HashtagInputWrapper = styled.div`
    height: 3rem;
    line-height: 3rem;
    input {
        outline: none;
        border: none;
        border-bottom: 1px solid black;
    }
`

const HashtagWrapper = styled.div`
    width: 100%;
    padding-bottom: 10px;
    margin-bottom: 10px;
    display : flex;
    flex-wrap : wrap;
    font-family: 'KoHo', sans-serif;
`

const Hashtag = styled.span`
    cursor: pointer;
    padding: 0 1rem;
`


const PostWrite = ({ onSubmit, title, content, hashtag, hashtags, onChange, onHashtagKeyPress, onHashtagClick }) => {
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
                value={content}
                modules={modules}
                formats={formats}
                onChange={(v)=>onChange('content', v)}
            />
            <div>
                <HashtagInputWrapper>
                    hashtag : <input type="text" value={hashtag} 
                        onChange={(e) => onChange('hashtag', e.target.value)} 
                        onKeyPress={onHashtagKeyPress}
                    />
                </HashtagInputWrapper>
                <HashtagWrapper>
                    {hashtags.map( (h, idx) => (
                        <Hashtag key={idx} onClick={() => onHashtagClick(idx)}>#{h} </Hashtag>
                    ))}
                </HashtagWrapper>
            </div>
            <div className="buttons">
                <button onClick={() => onChange(content, '')}>취소</button>
                <button onClick={(e) => onSubmit(e)}>완료</button>
            </div>
        </Wrapper>
    )
}

export default PostWrite;