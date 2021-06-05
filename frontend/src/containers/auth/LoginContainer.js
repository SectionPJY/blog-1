import React, {useEffect} from 'react';
import Login from '../../components/auth/Login';
import { withRouter } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import { check } from '../../modules/user';
const LoginContainer = ({history}) => {
    const dispatch = useDispatch();
    const { form, auth, authError, user} = useSelector( ({auth, user}) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
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
        const { username, password } = form;
        dispatch(login({username, password}));
    }

    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    // 로그인이 성공하였는가? 실패하였는가?
    useEffect(() => {
        if(auth != null) {
            dispatch(check());
        } 
        if(authError != null) {
            auth('로그인을 실패하였습니다.');
            dispatch(initializeForm('Login'));
        }
    }, [auth, authError, dispatch])

    // jwt를 가져서 통신할 때 사용할 수 있는가?
    useEffect(() => {
        if (user) {
            try {
                localStorage.setItem('user', JSON.stringify(user));
                history.push('/');
            } catch (e) {
                console.log('localStroage is not working');
            }
        }
    }, [history, user])

    return (
        <Login
            username={form.username}
            password={form.password}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    )
}

export default withRouter(LoginContainer);