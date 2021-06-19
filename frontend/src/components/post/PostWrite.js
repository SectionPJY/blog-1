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



const PostWrite = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [blobs, setBlobs] = useState([]);
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

    const onSubmit = (e) => {
        e.preventDefault();
        makeImageBlob(text)

        let formData = new FormData();
        formData.append('title', title);
        formData.append('text', text);
        for(let i in blobs) {
            formData.append(`image${i}`, blobs[i])
        }
        dispatch(write(formData));
    }

    const makeImageBlob = (text) => {
        let regex = /".[^>]+/g;
        let typeRegex = /\/[^;]+/;
        let match = text.match(regex);
        
        let type, replacedText=text;
        let blobArray = []
        if(match != null) {
            // 확장자를 추출해낸다.
            let i=0
            match.forEach(m => {
                // data type
                type = m.match(typeRegex)[0].split('/')[1];
                //blob data
                let data = m.split(',')[1];
                let buffer = Buffer.from(data, 'base64');
                let blob = new Blob([buffer], {type});
                setBlobs(blobs.concat(blob));
                // 순수 html 파일
                replacedText = replacedText.replace(m, `"image${i}"`);
                i += 1
            });
        }
    }

    return (
        <Wrapper>
            <Title value={title} onChange={(e) => setTitle(e.target.valuee)}/>
            <ReactQuill
                value={text}
                modules={modules}
                formats={formats}
                onChange={setText}
            />
            <div className="buttons">
                <button onClick={() => setText('')}>취소</button>
                <button onClick={(e) => onSubmit(e)}>완료</button>
            </div>
        </Wrapper>
    )
}

export default PostWrite;