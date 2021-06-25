import React, {useEffect, useState} from 'react';
import Register from '../../components/auth/Register';
import { withRouter } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';

const RegisterContainer = ({history}) => {
    const [isClicked, setIsClicked] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { form, auth, authError} = useSelector( ({auth}) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
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
        formData.append('birth', birth);
        dispatch(register(formData));
        
        setIsClicked(true);
    }

    useEffect(() => {
        if(isClicked === true) {
            if(authError !== null) {
                if(authError.message === "Request failed with status code 401") {
                    setError('중복된 아이디가 존재합니다.');
                } else {
                    setError('회원가입에 실패하였습니다.');
                }
                dispatch(initializeForm('register'));
            } 
            if (auth !== ' ') {
                localStorage.setItem('jwt', auth);
                setError('');
                history.push('/');
            }
        }  
    }, [isClicked, auth, authError, dispatch, history])

    return (
        <Register
            id={form.id}
            password={form.password}
            passwordCheck={form.passwordCheck}
            name={form.name}
            tel={form.tel}
            gender={form.gender}
            birth={form.birth}
            error={error} 
            onChange={onChange}
            onSubmit={onSubmit}
        />
    )
}

export default withRouter(RegisterContainer);