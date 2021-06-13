import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import {BiImageAdd, BiBold, BiItalic, BiVideo, BiAlignLeft, BiAlignRight, BiAlignMiddle} from 'react-icons/bi';

const Wrapper = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    .titleWrapper {
        height: 3rem;
        border: 1px solid #D9D5D4;
        input {
            width: 100%;
            height: 100%;
            border: none;
            box-sizing: border-box;
            font-size: 1.5rem;
            line-height: 3rem;
            padding-left: 1rem;
        }
    }

    .iconWrapper {
        display: flex;
        justify-content : space-around;
        font-size: 1.5rem;
        padding-top: .5rem;
        padding-bottom: .5rem;
        border-left: 1px solid #D9D5D4;
        border-right: 1px solid #D9D5D4;
        & > div > span {
            cursor: pointer;
        }
        .right{
            input[type=file] {
                display: none;
            }
        }
    }

    .contentWrapper {
        border: 1px solid #D9D5D4;
        .content {
            cursor: "pointer";
            padding: 1rem;
            width: 100%;
            height: 30rem;
            overflow-y: scroll;
            border: none;
            box-sizing: border-box;
            font-size: 1.3rem;
            
            img, video {
                width: 100%;
            }
        }
    }

    .buttonWrapper {
        float: right;
        margin-top: .5rem;
        button {
            border: none;
            width: 5rem;
            height: 3rem;
            color: #8FD3D7;
            margin-left: 1rem;  
            font-size: 1.4rem;
            font-family: 'Cute Font', cursive;
            box-shadow: 0 -1px 6px -2px gray;  
            background-color: rgba( 255, 255, 255, 1);
        }
    }
    
`

const PostWrite = () => {
    const inputRef = useRef();
    const [text, setText] = useState('');
    const [style, setStyle] = useState('left');
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [paragraph, setParagraph] = useState([]);

    const onChange = (e) => {
        setText(e.key);
    }

    const onSelect = (e, index) => {
        let sel = window.getSelection();
        let firstOffset, lastOffset;
        if(sel.anchorOffset < sel.focusOffset) {
            firstOffset = sel.anchorOffset;
            lastOffset = sel.focusOffset;
        } else {
            firstOffset = sel.focusOffset;
            lastOffset = sel.anchorOffset;
        }

        paragraph.map((p, idx) => {
            if(idx === index) {
                let first = p.text.substring(0, firstOffset);
                let second = p.text.substring(firstOffset, lastOffset);
                let third = p.text.substring(lastOffset, p.text.length);
                return {
                    ...p,
                    text : [
                        first,
                        {
                            tag : 'strong',
                            text : second
                        },
                        third,
                    ]
                }
            }
        });
    }

    const loadImage = (e) => {
        for(let image of e.target.files) {
            let imageURL = URL.createObjectURL(image);
            setParagraph(paragraph => paragraph.concat({
                src : imageURL,
                type : 'image',
            }))
        }        
    }

    const loadVideo = (e) => {
        for(let video of e.target.files) {
            let videoURL = URL.createObjectURL(video);
            setParagraph(paragraph => paragraph.concat({
                src : videoURL,
                type : 'video',
            }))
        }
    }

    return (
        <Wrapper>
            <div className="titleWrapper">
                <input className="title" />
            </div>
            <div className="iconWrapper">
                <div className="left">
                    <span onClick={() => setBold(true)}><BiBold /></span>
                    <span onClick={() => setItalic(true)}><BiItalic /></span>
                </div>
                <div>
                    <span onClick={() => setStyle('left')}><BiAlignLeft/></span>
                    <span onClick={() => setStyle('center')}><BiAlignMiddle/></span>
                    <span onClick={() => setStyle('right')}><BiAlignRight/></span>
                </div>
                <div className="right">
                    <span>
                        <label for="image"><BiImageAdd/></label>rch
                        <input type="file" id="image" name="image" accept=".jpg, .jpeg, .png" multiple 
                            onChange={loadImage}
                        />
                    </span>
                    <span>
                        <label for="video">
                            <BiVideo />
                        </label>
                        <input type="file" id="video" name="video" accept="video/*" multiple
                            onChange={loadVideo}/>
                    </span>
                </div>
            </div>
            <div className="contentWrapper">
                <textarea id="content" value={text} className="content" onChange={onChange} />
            </div>
            <div className="buttonWrapper">
                <button>취소</button>
                <button>완료</button>
            </div>
        </Wrapper>
    )
}

export default PostWrite;