import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { write, changeField } from '../../modules/post';
import { withRouter } from 'react-router-dom';
import PostWrite from '../../components/post/PostWrite';


const PostWriteContainer = ({history}) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const dispatch = useDispatch();
    const { title, content, hashtag, hashtags, postError } = useSelector( ({post}) => ({
        title : post.title,
        content : post.content,
        hashtag : post.hashtag,
        hashtags : post.hashtags,
        postError : post.postError,
    }))

    const onSubmit = (e) => {
        e.preventDefault();
        const [blobs, changedText] = ChangeMediaText(content);

        let formData = new FormData();
        formData.append('title', title);
        formData.append('content', changedText);
        for(let i in blobs) {
            formData.append(i, blobs[i], `image${i}`);
        }
        formData.append('hashtags', JSON.stringify(hashtags));
        formData.append('jwt', localStorage.getItem('jwt'));
        
        dispatch(write(formData));
        setIsSubmit(true);
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
                replacedText = replacedText.replace(m, '<img src="');
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
            if(hashtags.length < 5 && hashtag !== '') {
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
    

    useEffect(() => {
        if(isSubmit && postError === null) {
            alert('글쓰기가 완료되었습니다.');
            history.push('/');
            setIsSubmit(false);
        } 
        else if(postError !== null) {
            alert('글쓰기를 실패하였습니다.');
            setIsSubmit(false);
        }
    }, [isSubmit, postError, history])
    return (
        <div>
            <PostWrite onSubmit={onSubmit} title={title} content={content} onChange={onChange} 
                hashtag={hashtag} hashtags={hashtags} 
                onHashtagKeyPress={onHashtagKeyPress} onHashtagClick={onHashtagClick}
            />
        </div>
    )
}

export default withRouter(PostWriteContainer);