import React, {useEffect} from 'react';
import Register from '../../components/auth/Register';
import { withRouter } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { check } from '../../modules/user';
import { changeField, initializeForm, register } from '../../modules/auth';

const RegisterContainer = ({history}) => {
    const dispatch = useDispatch();
    const { form, auth, authError, user} = useSelector( ({auth, user}) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user : user.user
    }));

    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value : value,
            })
        )
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(form.password !== form.passwordCheck) {
            alert('비밀번호가 맞지 않습니다.')
            dispatch(changeField({
                form: 'register',
                key: 'password',
                value: ''
            }));
            dispatch(changeField({
                form: 'register',
                key: 'passwordCheck',
                value: ''
            }));
            return;
        }

        const { id, password, tel, gender, birth } = form;
        console.log(id, password, tel, gender, birth)
        dispatch(register({id, password, tel, gender, birth}));
        
    }

    useEffect(() => {
        if(auth != null) {
            localStorage.setItem('user', user)
            dispatch(check());
        } 
        if(authError != null) {
            alert('Register Failure');
            dispatch(initializeForm('register'));
        }
    }, [auth, authError, dispatch, history, user])

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
        <Register
            id={form.id}
            password={form.password}
            passwordCheck={form.passwordCheck}
            tel={form.tel}
            gender={form.gender}
            birth={form.birth} 
            onChange={onChange}
            onSubmit={onSubmit}
        />
    )
}

export default withRouter(RegisterContainer);