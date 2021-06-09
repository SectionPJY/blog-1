import React, {useEffect, useState} from 'react';
import Login from '../../components/auth/Login';
import { withRouter } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
const LoginContainer = ({history}) => {
    const [isClicked, setIsClicked] = useState(false);
    const dispatch = useDispatch();
    const { form, authError} = useSelector( ({auth}) => ({
        form: auth.login,
        authError: auth.authError,
    }));

    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value : value,
            })
        )
    }

    const onSubmit = e => {
        e.preventDefault();
        const { id, password } = form;

        if(id === '' && password === '') {
            return alert('아이디와 비밀번호를 입력해주세요.');
        }

        let formData = new FormData();
        formData.append('id', id);
        formData.append('password', password);

        dispatch(login(formData));
        setIsClicked(true);
    }

    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    // 로그인이 성공하였는가? 실패하였는가?
    useEffect(() => {
        // 처음상태일때 로그인 알람을 무시한다.
        if(isClicked === true) {
            if(authError.message === 'Request failed with status code 401') {
                alert('로그인을 실패하였습니다.');
                dispatch(initializeForm('Login'));
            } else {
                alert('로그인을 성공하였습니다.');
                history.push('/');
            }
        }
    }, [authError, dispatch, history, isClicked])

    return (
        <Login
            id={form.id}
            password={form.password}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    )
}

export default withRouter(LoginContainer);