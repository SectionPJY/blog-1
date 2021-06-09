import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER');
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
    ({id, password, name, tel, gender, birth}) => ({id, password, name, tel, gender, birth})
);

const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
export function* authSaga() {
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(REGISTER, registerSaga);
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
    authError: !null,
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
            authError: null,
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
    },
    initialState,
)

export default auth;