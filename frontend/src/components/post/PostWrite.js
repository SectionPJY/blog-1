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
            width: 100%;
            border: none;
            box-sizing: border-box;
            
            input {
                width: 100%;
                border: none;
                padding: 0.5rem;
                box-sizing: border-box;
                font-size: 1rem;
            }
            p {
                padding: 0.5rem;
            }
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

    const onChangedInputKeyDown = (e, index) => {
        let key = e.key;
        if(key === "Enter") {
            setParagraph(paragraph.map((p, idx) => ({
                ...p,
                change : false,
            })))
            inputRef.current.focus();
        } else if(key === "Backspace") {
            setParagraph(paragraph.filter((p, idx) => 
                (p.type !== 'text') ||
                (p.type === 'text' && p.text.length > 1)
            ))
        }
    }

    const onKeyPress = (e) => {
        let key = e.key;
        
        if(key === "Enter") {
            setParagraph(paragraph.concat({
                text: text,
                change : false,
                type : 'text',
            }));
            setText('');
            inputRef.current.focus();
        }
    }

    const onChangedInputChange = (e, index) => {
        setParagraph(paragraph.map( (p, idx) => {
            if(index === idx) {
                return (
                    {
                        text :  e.target.value,
                        change: p.change,
                        type : 'text', 
                    }
                );
            } else 
                return p;
        }))
        onSelect(index);
    }

    const onChange = (e) => {
        setText(e.target.value);
    }

    const onChangeParagraph = (e, index) => {
        setParagraph(paragraph.map( (p, idx) => {
            if(idx === index) p.change = true;
            return p;
        }))

        onSelect(e, index);
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

    const DoubleClick = (e) => {
        e.target.parentNode.removeChild(e.target);
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

    const onSubmit = () => {
        let formData = new FormData();
        formData.append('data', paragraph);
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
                        <label for="image"><BiImageAdd/></label>
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
                <div id="content" className="content">
                    {paragraph.map((p, index) => {
                        if(p.type === "text") {
                            return (
                                p.change ? <input key={index} value={p.text} onKeyDown={(e) => onChangedInputKeyDown(e, index)} 
                                                    onChange={(e) => onChangedInputChange(e, index)} 
                                        />
                                        : <p key={index} onClick={(event) => onChangeParagraph(event, index)}
                                            style={{"textAlign" : style}}
                                        >
                                            {p.text}
                                        </p>
                            )
                        }
                        else if(p.type === "image") {
                            return (
                                <img key={index} src={p.src} alt="" onDoubleClick={DoubleClick}/>
                            )
                        }

                        else if(p.type === "video") {
                            return (
                                <video key={index} src={p.src} alt="" onDoubleClick={DoubleClick} controls />
                            )
                        }
                    })}
                    <input value={text} onKeyPress={onKeyPress} onChange={onChange} ref={inputRef}/>
                </div>
            </div>
            <div className="buttonWrapper">
                <button>취소</button>
                <button onClick={onSubmit}>완료</button>
            </div>
        </Wrapper>
    )
}

export default PostWrite;