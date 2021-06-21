import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { write, changeField } from '../../modules/post';
import PostWrite from '../../components/post/PostWrite';

const PostWriteContainer = () => {
    const dispatch = useDispatch();
    const { title, text, hashtag, hashtags } = useSelector( ({post}) => ({
        title : post.title,
        text : post.text,
        hashtag : post.hashtag,
        hashtags : post.hashtags,
    }))

    const onSubmit = (e) => {
        e.preventDefault();
        const [blobs, changedText] = ChangeMediaText(text)

        let formData = new FormData();
        formData.append('title', title);
        formData.append('text', changedText);
        for(let i in blobs) {
            console.log(`image${i}`)
            formData.append(`image${i}`, blobs[i], `image${i}`)
        }
        formData.append('hashtags', JSON.stringify(hashtags));
        
        dispatch(write(formData));
    }

    const ChangeMediaText = (text) => {
        let blobs = [];
        let regex = /<img src=".[^"]+/g;
        let typeRegex = /\/[^;]+/;
        let match = text.match(regex);
        
        let type, replacedText=text;
        if(match != null) {
            // 확장자를 추출해낸다.
            match.forEach(m => {
                // data type
                type = m.match(typeRegex)[0].split('/')[1];
                //blob data
                let data = m.split(',')[1];

                let buffer = Buffer.from(data, 'base64');
                let blob = new Blob([buffer], {type});
                blobs.push(blob);
                // 순수 html 파일
                replacedText = replacedText.replace(m, "");
            });
        }
        return [blobs, replacedText]
    }

    const onChange = useCallback(((key, value) => {
        if(key === 'hashtag' && value.length > 5) {
            return;
        }
     
        dispatch(changeField({key, value}));
    }), [dispatch]);

    const onHashtagKeyPress = (e) => {
        if(e.key === 'Enter') {
            if(hashtags.length < 5) {
                dispatch(changeField({
                    key : "hashtags", 
                    value : hashtags.concat(hashtag)
                }))   
            }
            dispatch(changeField({
                key : "hashtag",
                value : ''
            }))
        }
    }

    const onHashtagClick = useCallback((idx) => {
        dispatch(changeField({
            key : "hashtags", 
            value : hashtags.filter( (h, _idx) => idx !== _idx)
        }))}
    , [dispatch, hashtags]);

    return (
        <div>
            <PostWrite onSubmit={onSubmit} title={title} text={text} onChange={onChange} 
                hashtag={hashtag} hashtags={hashtags} 
                onHashtagKeyPress={onHashtagKeyPress} onHashtagClick={onHashtagClick}
            />
        </div>
    )
}

export default PostWriteContainer;