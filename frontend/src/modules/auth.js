import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER');
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('auth/CHECK');
const LOGOUT = 'auth/LOGOUT';
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';


export const changeField = createAction(
    CHANGE_FIELD,
    ({ form, key, value }) => ({
        form, key, value
    })
)

export const initializeForm = createAction(
    INITIALIZE_FORM,
    form => form,
)

export const login = createAction(
    LOGIN,
    (formData) => (formData)
)

export const register = createAction(
    REGISTER,
    (formData) => (formData)
);

export const logout = createAction(LOGOUT);

export const check = createAction(CHECK, (formData) => (formData))

const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const logoutSaga = createRequestSaga(LOGOUT, authAPI.logout);
const checkSaga = createRequestSaga(CHECK, authAPI.check);

export function* authSaga() {
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGOUT, logoutSaga);
    yield takeLatest(CHECK, checkSaga);
}

const initialState = {
    login : {
        id : '',
        password : '',
    },
    register : {
        id : '',
        password : '',
        passwordCheck : '',
        name : '',
        tel : '',
        gender : 'male',
        birth : '',
    },
    auth : null,
    authError: null,
};

const auth = handleActions(
    {
        [CHANGE_FIELD] : (state, { payload : {form, key, value} }) => produce(state, draft => {
            draft[form][key] = value;
        }),
        [INITIALIZE_FORM] : (state, {payload: form}) => ({
            ...state,
            [form]: initialState[form],
        }),
        [LOGIN_SUCCESS]: (state, {payload : auth}) => ({
            ...state,
            auth,
            authError: null
        }),
        [LOGIN_FAILURE] : (state, {payload: error}) => ({
            ...state,
            auth : null,
            authError: error,
        }),
        [REGISTER_SUCCESS] : (state, {payload : auth}) => ({
            ...state,
            auth,
            authError: null,
        }),
        [REGISTER_FAILURE] : (state, {payload: error}) => ({
            ...state,
            auth : null,
            authError: error,
        }),
        [LOGOUT] : (state, payload) => ({
            ...state,
            auth: null,
        }),
        [CHECK_SUCCESS] : (state, payload) => ({
            ...state,
            auth : localStorage.getItem('jwt'),
        }),
        [CHECK_FAILURE] : (state, {payload : error}) => ({
            ...state,
            auth: null,
            authError: error,
        })
    },
    initialState,
)

export default auth;

