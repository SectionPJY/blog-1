import React, {useEffect} from 'react';
import Register from '../../components/auth/Register';
import { withRouter } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
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

        const { id, password, passwordCheck, name, tel, gender, birth } = form;
        let formData = new FormData();
        formData.append('id', id);
        formData.append('password', password);
        formData.append('passwordCheck', passwordCheck);
        formData.append('name', name);
        formData.append('tel', tel);
        formData.append('gender', gender);
        formData.append('birth');
        dispatch(register({id, password, tel, gender, birth}));
        
    }

    useEffect(() => {
        if(authError == null) {
            alert('회원가입되셨습니다.');
            history.push('/');
        } 
        else {
            alert('Register Failure');
            dispatch(initializeForm('register'));
        }
    }, [auth, authError, dispatch, history, user])

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